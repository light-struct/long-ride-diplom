import os
import secrets
import time

from fastapi import APIRouter, Depends, HTTPException

from app.auth import check_password, get_user, hash_password, issue_token
from app.db import conn
from app.schemas import (
    AuthIn,
    AuthOut,
    ChangePasswordIn,
    ForgotPasswordConfirmIn,
    ForgotPasswordRequestIn,
    MeOut,
)

router = APIRouter(prefix="/auth", tags=["auth"])
RESET_TTL_SECONDS = 900
reset_codes: dict[str, tuple[str, float]] = {}


def is_admin_email(email: str) -> bool:
    admin_email = os.getenv("ADMIN_EMAIL", "").strip().strip("\"'").lower()
    return bool(admin_email) and email.lower().strip() == admin_email


def clear_expired_codes() -> None:
    now = time.time()
    for email, (_, expires_at) in list(reset_codes.items()):
        if expires_at <= now:
            reset_codes.pop(email, None)


def require_admin(user: dict) -> None:
    if not is_admin_email(user["email"]):
        raise HTTPException(403, "Admin only")


@router.post("/register", response_model=AuthOut)
def register(data: AuthIn):
    with conn() as c:
        try:
            user_id = c.execute(
                "INSERT INTO users(email, password_hash) VALUES(%s, %s) RETURNING id",
                (data.email.lower().strip(), hash_password(data.password)),
            ).fetchone()["id"]
        except Exception as e:
            raise HTTPException(400, "Email already exists") from e
    try:
        token = issue_token(user_id)
    except RuntimeError as e:
        raise HTTPException(503, "Auth service temporary unavailable") from e
    return {"token": token}


@router.post("/login", response_model=AuthOut)
def login(data: AuthIn):
    try:
        with conn() as c:
            row = c.execute(
                "SELECT id, password_hash FROM users WHERE email=%s",
                (data.email.lower().strip(),),
            ).fetchone()
    except Exception as e:
        raise HTTPException(503, "Database temporary unavailable") from e
    if not row or not check_password(data.password, row["password_hash"]):
        raise HTTPException(401, "Wrong email/password")
    try:
        token = issue_token(row["id"])
    except RuntimeError as e:
        raise HTTPException(503, "Auth service temporary unavailable") from e
    return {"token": token}


@router.get("/me", response_model=MeOut)
def me(user=Depends(get_user)):
    return {**user, "is_admin": is_admin_email(user["email"])}


@router.post("/change-password")
def change_password(data: ChangePasswordIn, user=Depends(get_user)):
    with conn() as c:
        row = c.execute(
            "SELECT password_hash FROM users WHERE id=%s",
            (user["id"],),
        ).fetchone()
        if not row or not check_password(data.current_password, row["password_hash"]):
            raise HTTPException(400, "Wrong current password")
        c.execute(
            "UPDATE users SET password_hash=%s WHERE id=%s",
            (hash_password(data.new_password), user["id"]),
        )
    return {"ok": True}


@router.post("/forgot-password/request")
def forgot_password_request(data: ForgotPasswordRequestIn):
    email = data.email.lower().strip()
    with conn() as c:
        row = c.execute("SELECT id FROM users WHERE email=%s", (email,)).fetchone()
    if not row:
        return {"ok": True}
    clear_expired_codes()
    code = f"{secrets.randbelow(1000000):06d}"
    reset_codes[email] = (code, time.time() + RESET_TTL_SECONDS)
    return {"ok": True, "code": code}


@router.post("/forgot-password/confirm")
def forgot_password_confirm(data: ForgotPasswordConfirmIn):
    email = data.email.lower().strip()
    clear_expired_codes()
    stored = reset_codes.get(email)
    if not stored:
        raise HTTPException(400, "Code expired")
    code, expires_at = stored
    if expires_at <= time.time() or data.code.strip() != code:
        raise HTTPException(400, "Wrong code")
    with conn() as c:
        row = c.execute("SELECT id FROM users WHERE email=%s", (email,)).fetchone()
        if not row:
            raise HTTPException(404, "User not found")
        c.execute(
            "UPDATE users SET password_hash=%s WHERE id=%s",
            (hash_password(data.new_password), row["id"]),
        )
    reset_codes.pop(email, None)
    return {"ok": True}


@router.get("/admin/users")
def admin_list_users(user=Depends(get_user)):
    require_admin(user)
    with conn() as c:
        rows = c.execute("SELECT id, email FROM users ORDER BY id DESC").fetchall()
    return [{"id": r["id"], "email": r["email"], "is_admin": is_admin_email(r["email"])} for r in rows]


@router.post("/admin/users")
def admin_create_user(data: AuthIn, user=Depends(get_user)):
    require_admin(user)
    with conn() as c:
        try:
            user_id = c.execute(
                "INSERT INTO users(email, password_hash) VALUES(%s, %s) RETURNING id",
                (data.email.lower().strip(), hash_password(data.password)),
            ).fetchone()["id"]
        except Exception as e:
            raise HTTPException(400, "Email already exists") from e
        row = c.execute("SELECT id, email FROM users WHERE id=%s", (user_id,)).fetchone()
    return {"id": row["id"], "email": row["email"], "is_admin": is_admin_email(row["email"])}


@router.patch("/admin/users/{target_user_id}")
def admin_update_user(target_user_id: int, data: AuthIn, user=Depends(get_user)):
    require_admin(user)
    with conn() as c:
        exists = c.execute("SELECT id FROM users WHERE id=%s", (target_user_id,)).fetchone()
        if not exists:
            raise HTTPException(404, "User not found")
        try:
            c.execute(
                "UPDATE users SET email=%s, password_hash=%s WHERE id=%s",
                (data.email.lower().strip(), hash_password(data.password), target_user_id),
            )
        except Exception as e:
            raise HTTPException(400, "Email already exists") from e
        row = c.execute("SELECT id, email FROM users WHERE id=%s", (target_user_id,)).fetchone()
    return {"id": row["id"], "email": row["email"], "is_admin": is_admin_email(row["email"])}


@router.delete("/admin/users/{target_user_id}")
def admin_delete_user(target_user_id: int, user=Depends(get_user)):
    require_admin(user)
    if target_user_id == user["id"]:
        raise HTTPException(400, "Cannot delete current admin")
    with conn() as c:
        cur = c.execute("DELETE FROM users WHERE id=%s", (target_user_id,))
    if cur.rowcount == 0:
        raise HTTPException(404, "User not found")
    return {"ok": True}


@router.get("/admin/users/{target_user_id}/bikes")
def admin_list_user_bikes(target_user_id: int, user=Depends(get_user)):
    require_admin(user)
    with conn() as c:
        rows = c.execute(
            "SELECT id, user_id, name, bike_type, total_mileage_km FROM bikes WHERE user_id=%s ORDER BY id DESC",
            (target_user_id,),
        ).fetchall()
    return [dict(r) for r in rows]


@router.post("/admin/users/{target_user_id}/bikes")
def admin_create_user_bike(target_user_id: int, data: dict, user=Depends(get_user)):
    require_admin(user)
    name = str(data.get("name", "")).strip()
    bike_type = str(data.get("bike_type", "")).strip()
    if not name or not bike_type:
        raise HTTPException(400, "name and bike_type required")
    with conn() as c:
        has_user = c.execute("SELECT id FROM users WHERE id=%s", (target_user_id,)).fetchone()
        if not has_user:
            raise HTTPException(404, "User not found")
        bike_id = c.execute(
            "INSERT INTO bikes(user_id, name, bike_type, total_mileage_km) VALUES(%s, %s, %s, %s) RETURNING id",
            (target_user_id, name, bike_type, float(data.get("total_mileage_km", 0))),
        ).fetchone()["id"]
        row = c.execute(
            "SELECT id, user_id, name, bike_type, total_mileage_km FROM bikes WHERE id=%s",
            (bike_id,),
        ).fetchone()
    return dict(row)


@router.patch("/admin/bikes/{bike_id}")
def admin_update_bike(bike_id: int, data: dict, user=Depends(get_user)):
    require_admin(user)
    with conn() as c:
        old = c.execute("SELECT id, total_mileage_km FROM bikes WHERE id=%s", (bike_id,)).fetchone()
        if not old:
            raise HTTPException(404, "Bike not found")
        name = str(data.get("name", "")).strip()
        bike_type = str(data.get("bike_type", "")).strip()
        total_mileage_km = float(data.get("total_mileage_km", old["total_mileage_km"]))
        if not name or not bike_type:
            raise HTTPException(400, "name and bike_type required")
        c.execute(
            "UPDATE bikes SET name=%s, bike_type=%s, total_mileage_km=%s WHERE id=%s",
            (name, bike_type, total_mileage_km, bike_id),
        )
        delta = total_mileage_km - old["total_mileage_km"]
        if delta != 0:
            c.execute("UPDATE parts SET current_mileage_km = current_mileage_km + %s WHERE bike_id=%s", (delta, bike_id))
        row = c.execute(
            "SELECT id, user_id, name, bike_type, total_mileage_km FROM bikes WHERE id=%s",
            (bike_id,),
        ).fetchone()
    return dict(row)


@router.delete("/admin/bikes/{bike_id}")
def admin_delete_bike(bike_id: int, user=Depends(get_user)):
    require_admin(user)
    with conn() as c:
        cur = c.execute("DELETE FROM bikes WHERE id=%s", (bike_id,))
    if cur.rowcount == 0:
        raise HTTPException(404, "Bike not found")
    return {"ok": True}

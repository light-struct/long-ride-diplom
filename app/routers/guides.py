import os

from fastapi import APIRouter, Depends, HTTPException

from app.auth import get_user
from app.db import conn
from app.schemas import GuideIn, GuideOut

router = APIRouter(prefix="/guides", tags=["guides"])


def is_admin_email(email: str) -> bool:
    admin_email = os.getenv("ADMIN_EMAIL", "").strip().strip("\"'").lower()
    return bool(admin_email) and email.lower().strip() == admin_email


def require_admin(user: dict) -> None:
    if not is_admin_email(user["email"]):
        raise HTTPException(403, "Admin only")


@router.get("", response_model=list[GuideOut])
def list_guides(topic: str | None = None, user=Depends(get_user)):
    with conn() as c:
        if topic:
            rows = c.execute("SELECT * FROM guides WHERE topic=%s ORDER BY id DESC", (topic,)).fetchall()
        else:
            rows = c.execute("SELECT * FROM guides ORDER BY id DESC").fetchall()
    return [dict(r) for r in rows]


@router.post("", response_model=GuideOut)
def create_guide(data: GuideIn, user=Depends(get_user)):
    with conn() as c:
        guide_id = c.execute(
            "INSERT INTO guides(title,topic,content) VALUES(%s,%s,%s) RETURNING id",
            (data.title, data.topic, data.content),
        ).fetchone()["id"]
        row = c.execute("SELECT * FROM guides WHERE id=%s", (guide_id,)).fetchone()
    return dict(row)


@router.get("/admin", response_model=list[GuideOut])
def admin_list_guides(user=Depends(get_user)):
    require_admin(user)
    with conn() as c:
        rows = c.execute("SELECT * FROM guides ORDER BY id DESC").fetchall()
    return [dict(r) for r in rows]


@router.post("/admin", response_model=GuideOut)
def admin_create_guide(data: GuideIn, user=Depends(get_user)):
    require_admin(user)
    with conn() as c:
        guide_id = c.execute(
            "INSERT INTO guides(title,topic,content) VALUES(%s,%s,%s) RETURNING id",
            (data.title, data.topic, data.content),
        ).fetchone()["id"]
        row = c.execute("SELECT * FROM guides WHERE id=%s", (guide_id,)).fetchone()
    return dict(row)


@router.patch("/admin/{guide_id}", response_model=GuideOut)
def admin_update_guide(guide_id: int, data: GuideIn, user=Depends(get_user)):
    require_admin(user)
    with conn() as c:
        exists = c.execute("SELECT id FROM guides WHERE id=%s", (guide_id,)).fetchone()
        if not exists:
            raise HTTPException(404, "Guide not found")
        c.execute(
            "UPDATE guides SET title=%s, topic=%s, content=%s WHERE id=%s",
            (data.title, data.topic, data.content, guide_id),
        )
        row = c.execute("SELECT * FROM guides WHERE id=%s", (guide_id,)).fetchone()
    return dict(row)


@router.delete("/admin/{guide_id}")
def admin_delete_guide(guide_id: int, user=Depends(get_user)):
    require_admin(user)
    with conn() as c:
        cur = c.execute("DELETE FROM guides WHERE id=%s", (guide_id,))
    if cur.rowcount == 0:
        raise HTTPException(404, "Guide not found")
    return {"ok": True}

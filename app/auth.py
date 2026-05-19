import hashlib
import secrets

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.db import conn

security = HTTPBearer()


def hash_password(password: str) -> str:
    salt = secrets.token_hex(8)
    return f"{salt}:{hashlib.sha256(f'{salt}:{password}'.encode()).hexdigest()}"


def check_password(password: str, password_hash: str) -> bool:
    try:
        salt, digest = password_hash.split(":", 1)
    except ValueError:
        return False
    got = hashlib.sha256(f"{salt}:{password}".encode()).hexdigest()
    return secrets.compare_digest(got, digest)


def issue_token(user_id: int) -> str:
    last_error = None
    for _ in range(3):
        token = secrets.token_urlsafe(24)
        try:
            with conn() as c:
                c.execute("INSERT INTO tokens(token, user_id) VALUES(%s, %s)", (token, user_id))
            return token
        except Exception as e:
            last_error = e
    raise RuntimeError("Failed to create session token") from last_error


def get_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    with conn() as c:
        row = c.execute(
            "SELECT u.id, u.email FROM tokens t JOIN users u ON u.id=t.user_id WHERE t.token=%s",
            (credentials.credentials,),
        ).fetchone()
    if not row:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Bad token")
    return {"id": row["id"], "email": row["email"]}

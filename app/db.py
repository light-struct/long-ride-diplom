import os
from contextlib import contextmanager

import psycopg
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

_pool: ConnectionPool | None = None


def get_pool() -> ConnectionPool:
    global _pool
    if _pool is None:
        database_url = os.getenv("DATABASE_URL", "").strip()
        if not database_url:
            raise RuntimeError("DATABASE_URL not set")
        _pool = ConnectionPool(
            database_url,
            min_size=1,
            max_size=5,
            kwargs={"row_factory": dict_row},
            open=True,
        )
    return _pool


@contextmanager
def conn():
    with get_pool().connection() as c:
        yield c


def init_db() -> None:
    with conn() as c:
        with c.cursor() as cur:
            cur.execute(
                """
            CREATE TABLE IF NOT EXISTS users (
                id BIGSERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
            )
            """
            )
            cur.execute(
                """
            CREATE TABLE IF NOT EXISTS tokens (
                token TEXT PRIMARY KEY,
                user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE
            )
            """
            )
            cur.execute(
                """
            CREATE TABLE IF NOT EXISTS bikes (
                id BIGSERIAL PRIMARY KEY,
                user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                bike_type TEXT NOT NULL,
                total_mileage_km DOUBLE PRECISION NOT NULL DEFAULT 0
            )
            """
            )
            cur.execute(
                """
            CREATE TABLE IF NOT EXISTS parts (
                id BIGSERIAL PRIMARY KEY,
                bike_id BIGINT NOT NULL REFERENCES bikes(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                current_mileage_km DOUBLE PRECISION NOT NULL DEFAULT 0,
                resource_km DOUBLE PRECISION NOT NULL DEFAULT 1000
            )
            """
            )
            cur.execute(
                """
            CREATE TABLE IF NOT EXISTS guides (
                id BIGSERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                topic TEXT NOT NULL,
                content TEXT NOT NULL
            )
            """
            )
            has_guides = cur.execute("SELECT COUNT(*) AS cnt FROM guides").fetchone()["cnt"]
            if not has_guides:
                cur.executemany(
                    "INSERT INTO guides(title, topic, content) VALUES(%s,%s,%s)",
                    [
                        ("Clean chain", "repair", "Clean and lube chain every 150-250 km."),
                        ("Tire pressure", "technique", "Check pressure before every ride."),
                    ],
                )

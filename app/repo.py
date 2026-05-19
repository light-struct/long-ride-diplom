from collections.abc import Mapping
from typing import Any

from fastapi import HTTPException


def row_dict(row: Mapping[str, Any]) -> dict:
    return dict(row)


def bike_owned_or_404(c, bike_id: int, user_id: int, columns: str = "*"):
    row = c.execute(
        f"SELECT {columns} FROM bikes WHERE id=%s AND user_id=%s",
        (bike_id, user_id),
    ).fetchone()
    if not row:
        raise HTTPException(404, "Bike not found")
    return row


def part_owned_or_404(c, part_id: int, user_id: int, columns: str = "p.*"):
    row = c.execute(
        f"""
        SELECT {columns}
        FROM parts p
        JOIN bikes b ON b.id = p.bike_id
        WHERE p.id=%s AND b.user_id=%s
        """,
        (part_id, user_id),
    ).fetchone()
    if not row:
        raise HTTPException(404, "Part not found")
    return row

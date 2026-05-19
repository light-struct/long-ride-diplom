from fastapi import APIRouter, Depends, HTTPException

from app.auth import get_user
from app.db import conn
from app.repo import bike_owned_or_404, part_owned_or_404, row_dict
from app.schemas import PartIn, PartOut

router = APIRouter(tags=["parts"])


def part_status(current: float, resource: float) -> str:
    ratio = current / max(resource, 1)
    if ratio >= 1:
        return "replace"
    if ratio >= 0.8:
        return "warning"
    return "ok"


def _to_out(row):
    d = row_dict(row)
    d["status"] = part_status(d["current_mileage_km"], d["resource_km"])
    return d


@router.get("/bikes/{bike_id}/parts", response_model=list[PartOut])
def list_parts(bike_id: int, user=Depends(get_user)):
    with conn() as c:
        bike_owned_or_404(c, bike_id, user["id"], columns="id")
        rows = c.execute("SELECT * FROM parts WHERE bike_id=%s ORDER BY id DESC", (bike_id,)).fetchall()
    return [_to_out(r) for r in rows]


@router.get("/parts/{part_id}", response_model=PartOut)
def get_part(part_id: int, user=Depends(get_user)):
    with conn() as c:
        row = part_owned_or_404(c, part_id, user["id"])
    return _to_out(row)


@router.post("/bikes/{bike_id}/parts", response_model=PartOut)
def create_part(bike_id: int, data: PartIn, user=Depends(get_user)):
    with conn() as c:
        bike_owned_or_404(c, bike_id, user["id"], columns="id")
        part_id = c.execute(
            """
            INSERT INTO parts(bike_id,name,category,current_mileage_km,resource_km)
            VALUES(%s,%s,%s,%s,%s)
            RETURNING id
            """,
            (bike_id, data.name, data.category, data.current_mileage_km, data.resource_km),
        ).fetchone()["id"]
        row = part_owned_or_404(c, part_id, user["id"])
    return _to_out(row)


@router.patch("/parts/{part_id}", response_model=PartOut)
def update_part(part_id: int, data: PartIn, user=Depends(get_user)):
    with conn() as c:
        part_owned_or_404(c, part_id, user["id"], columns="p.id")
        c.execute(
            """
            UPDATE parts
            SET name=%s, category=%s, current_mileage_km=%s, resource_km=%s
            WHERE id=%s
            """,
            (data.name, data.category, data.current_mileage_km, data.resource_km, part_id),
        )
        row = part_owned_or_404(c, part_id, user["id"])
    return _to_out(row)


@router.delete("/parts/{part_id}")
def delete_part(part_id: int, user=Depends(get_user)):
    with conn() as c:
        cur = c.execute(
            """
            DELETE FROM parts
            WHERE id IN (
                SELECT p.id FROM parts p
                JOIN bikes b ON b.id=p.bike_id
                WHERE p.id=%s AND b.user_id=%s
            )
            """,
            (part_id, user["id"]),
        )
    if cur.rowcount == 0:
        raise HTTPException(404, "Part not found")
    return {"ok": True}

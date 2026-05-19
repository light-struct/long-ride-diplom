from fastapi import APIRouter, Depends, HTTPException

from app.auth import get_user
from app.db import conn
from app.repo import bike_owned_or_404, row_dict
from app.schemas import BikeIn, BikeMileageDeltaIn, BikeOut

router = APIRouter(prefix="/bikes", tags=["bikes"])


@router.get("", response_model=list[BikeOut])
def list_bikes(user=Depends(get_user)):
    with conn() as c:
        rows = c.execute("SELECT * FROM bikes WHERE user_id=%s ORDER BY id DESC", (user["id"],)).fetchall()
    return [row_dict(r) for r in rows]


@router.get("/{bike_id}", response_model=BikeOut)
def get_bike(bike_id: int, user=Depends(get_user)):
    with conn() as c:
        row = bike_owned_or_404(c, bike_id, user["id"])
    return row_dict(row)


@router.post("", response_model=BikeOut)
def create_bike(data: BikeIn, user=Depends(get_user)):
    with conn() as c:
        bike_id = c.execute(
            "INSERT INTO bikes(user_id,name,bike_type,total_mileage_km) VALUES(%s,%s,%s,%s) RETURNING id",
            (user["id"], data.name, data.bike_type, data.total_mileage_km),
        ).fetchone()["id"]
        row = bike_owned_or_404(c, bike_id, user["id"])
    return row_dict(row)


@router.patch("/{bike_id}", response_model=BikeOut)
def update_bike(bike_id: int, data: BikeIn, user=Depends(get_user)):
    with conn() as c:
        old = bike_owned_or_404(c, bike_id, user["id"], columns="id, total_mileage_km")
        delta = data.total_mileage_km - old["total_mileage_km"]
        c.execute(
            "UPDATE bikes SET name=%s, bike_type=%s, total_mileage_km=%s WHERE id=%s",
            (data.name, data.bike_type, data.total_mileage_km, bike_id),
        )
        if delta != 0:
            c.execute(
                "UPDATE parts SET current_mileage_km = current_mileage_km + %s WHERE bike_id=%s",
                (delta, bike_id),
            )
        row = bike_owned_or_404(c, bike_id, user["id"])
    return row_dict(row)


@router.post("/{bike_id}/add-mileage", response_model=BikeOut)
def add_mileage(bike_id: int, data: BikeMileageDeltaIn, user=Depends(get_user)):
    with conn() as c:
        bike_owned_or_404(c, bike_id, user["id"], columns="id")
        c.execute(
            "UPDATE bikes SET total_mileage_km = total_mileage_km + %s WHERE id=%s",
            (data.km, bike_id),
        )
        c.execute(
            "UPDATE parts SET current_mileage_km = current_mileage_km + %s WHERE bike_id=%s",
            (data.km, bike_id),
        )
        row = bike_owned_or_404(c, bike_id, user["id"])
    return row_dict(row)


@router.delete("/{bike_id}")
def delete_bike(bike_id: int, user=Depends(get_user)):
    with conn() as c:
        cur = c.execute("DELETE FROM bikes WHERE id=%s AND user_id=%s", (bike_id, user["id"]))
    if cur.rowcount == 0:
        raise HTTPException(404, "Bike not found")
    return {"ok": True}

from fastapi import APIRouter, Depends

from app.auth import get_user
from app.schemas import AskIn, AskOut
from app.services.assistant_service import build_advice

router = APIRouter(prefix="/assistant", tags=["assistant"])


@router.post("/ask", response_model=AskOut)
def ask(data: AskIn, user=Depends(get_user)):
    return build_advice(data.question)

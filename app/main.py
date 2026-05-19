from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

from app.db import init_db
from app.routers import assistant, auth, bikes, guides, parts

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")

app = FastAPI(title="Long Ride", version="0.1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(bikes.router)
app.include_router(parts.router)
app.include_router(guides.router)
app.include_router(assistant.router)

FRONTEND_DIR = BASE_DIR / "frontend"


@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def index():
    return RedirectResponse(url="/frontend/index.html")


app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend")

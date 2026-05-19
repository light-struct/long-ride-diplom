# Long Ride

Minimal FastAPI + PostgreSQL app for bike maintenance tracking with a single-page frontend.

## Stack
- Backend: FastAPI, PostgreSQL (`psycopg` + `psycopg_pool`)
- Frontend: plain HTML/CSS/JS (`frontend/index.html`, `frontend/app.js`)
- AI: Groq-compatible chat completions API

## Run
```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open:
- App: `http://127.0.0.1:8000/frontend/index.html`
- Swagger: `http://127.0.0.1:8000/docs`

## Environment
Create/update `.env` in project root:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
GROQ_API_KEY=...
GROQ_MODEL=llama-3.1-8b-instant
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
```

Notes:
- `DATABASE_URL` is required. Without it app startup fails with `RuntimeError("DATABASE_URL not set")`.
- `long_ride.db` in project root is a legacy file and is not used by current backend.
- If `GROQ_API_KEY` is missing, `/assistant/ask` returns a friendly config message.

## API Overview

Public:
- `POST /auth/register`
- `POST /auth/login`

Protected (Bearer token required):
- `GET /auth/me`
- `GET/POST/PATCH/DELETE /bikes...`
- `GET/POST/PATCH/DELETE /parts...`
- `GET/POST /guides`
- `POST /assistant/ask`

## Project Layout
```text
app/
  main.py
  db.py
  auth.py
  repo.py
  schemas.py
  routers/
  services/
frontend/
  index.html
  app.js
  styles.css
```

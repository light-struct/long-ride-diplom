import json
import os
import urllib.error
import urllib.request


def build_advice(question: str) -> dict:
    q = question.strip()
    if not q:
        return {"answer": "Пустой вопрос. Напиши любой текст."}

    api_key = os.getenv("GROQ_API_KEY", "").strip()
    api_url = os.getenv("GROQ_API_URL", "https://api.groq.com/openai/v1/chat/completions").strip()
    model = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant").strip()
    if not api_key:
        return {"answer": "Не задан GROQ_API_KEY в .env"}

    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": "Отвечай только обычным текстом, без markdown, списков с символами и форматирования. В контексте велосипедов",
            },
            {"role": "user", "content": q},
        ],
    }
    req = urllib.request.Request(
        api_url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Connection": "keep-alive",
            "User-Agent": "LongRide/1.0 (+https://local.long-ride.app)",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        answer = data["choices"][0]["message"]["content"].strip()
        return {"answer": answer}
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="ignore")
        return {"answer": f"Groq HTTP {e.code}: {body[:300]}"}
    except Exception as e:
        return {"answer": f"Ошибка запроса к Groq: {e}"}

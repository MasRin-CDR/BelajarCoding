from __future__ import annotations

from api.data import MODULES_DATA, QUIZ_DATA


def list_modules() -> list[dict]:
    return MODULES_DATA


def get_quiz_payload(module_id: str | None) -> dict:
    if module_id:
        return {module_id: QUIZ_DATA[module_id]}
    return QUIZ_DATA


def list_security_topics() -> list[dict[str, str]]:
    return [
        {"id": "xss", "name": "XSS", "control": "Escape output, CSP, trusted templates."},
        {"id": "sql-injection", "name": "SQL Injection", "control": "Parameterized query dan ORM safe APIs."},
        {"id": "csrf", "name": "CSRF", "control": "CSRF token atau SameSite cookie untuk session-based auth."},
        {"id": "cors", "name": "CORS", "control": "Allowlist origin production, hindari wildcard credentialed requests."},
        {"id": "rate-limit", "name": "Rate Limiting", "control": "Limit request per IP/user dan log abuse pattern."},
        {"id": "secure-deploy", "name": "Secure Deployment", "control": "TLS, env secrets, dependency audit, non-root container."},
    ]

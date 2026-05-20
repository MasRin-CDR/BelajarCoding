from __future__ import annotations

import base64
import hashlib
import hmac
import json
import time
from typing import Any


def _b64url_encode(raw: bytes) -> str:
    return base64.urlsafe_b64encode(raw).rstrip(b"=").decode("ascii")


def _b64url_decode(value: str) -> bytes:
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(value + padding)


def create_signed_token(payload: dict[str, Any], secret: str, expires_in: int = 3600) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    body = {
        **payload,
        "iat": int(time.time()),
        "exp": int(time.time()) + expires_in,
    }
    header_part = _b64url_encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
    body_part = _b64url_encode(json.dumps(body, separators=(",", ":")).encode("utf-8"))
    signature = hmac.new(secret.encode("utf-8"), f"{header_part}.{body_part}".encode("ascii"), hashlib.sha256).digest()
    return f"{header_part}.{body_part}.{_b64url_encode(signature)}"


def verify_signed_token(token: str, secret: str) -> dict[str, Any] | None:
    try:
        header_part, body_part, signature_part = token.split(".")
        expected = hmac.new(secret.encode("utf-8"), f"{header_part}.{body_part}".encode("ascii"), hashlib.sha256).digest()
        actual = _b64url_decode(signature_part)
        if not hmac.compare_digest(expected, actual):
            return None

        payload = json.loads(_b64url_decode(body_part))
        if int(payload.get("exp", 0)) < int(time.time()):
            return None
        return payload
    except (ValueError, json.JSONDecodeError, TypeError):
        return None

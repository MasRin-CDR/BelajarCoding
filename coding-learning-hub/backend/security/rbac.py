from __future__ import annotations

from functools import wraps

from flask import current_app, jsonify, request

from security.token_service import verify_signed_token


def require_role(*allowed_roles: str):
    def decorator(handler):
        @wraps(handler)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get("Authorization", "")
            prefix = "Bearer "
            if not auth_header.startswith(prefix):
                return jsonify({"success": False, "message": "Authorization Bearer token wajib dikirim."}), 401

            token = auth_header.removeprefix(prefix).strip()
            payload = verify_signed_token(token, current_app.config["SECRET_KEY"])
            if payload is None:
                return jsonify({"success": False, "message": "Token tidak valid atau sudah kedaluwarsa."}), 401

            role = payload.get("role", "learner")
            if role not in allowed_roles:
                return jsonify({"success": False, "message": "Role tidak memiliki akses ke resource ini."}), 403
            return handler(*args, **kwargs)

        return wrapper

    return decorator

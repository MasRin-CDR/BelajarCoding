from __future__ import annotations

import os


def get_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


class AppConfig:
    def __init__(self) -> None:
        self.app_env = os.getenv("APP_ENV", "development")
        self.debug = get_bool("FLASK_DEBUG", False)
        self.host = os.getenv("HOST", "127.0.0.1")
        self.port = int(os.getenv("PORT", "5000"))
        self.secret_key = os.getenv("SECRET_KEY", "replace-this-in-production")
        self.rate_limit_requests = int(os.getenv("RATE_LIMIT_REQUESTS", "120"))
        self.rate_limit_window_seconds = int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", "60"))
        raw_origins = os.getenv(
            "CORS_ORIGINS",
            "http://127.0.0.1:5500,http://localhost:5500,http://127.0.0.1:8000,http://localhost:8000",
        )
        self.cors_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

    def to_dict(self) -> dict:
        return {
            "APP_ENV": self.app_env,
            "DEBUG": self.debug,
            "HOST": self.host,
            "PORT": self.port,
            "SECRET_KEY": self.secret_key,
            "RATE_LIMIT_REQUESTS": self.rate_limit_requests,
            "RATE_LIMIT_WINDOW_SECONDS": self.rate_limit_window_seconds,
        }

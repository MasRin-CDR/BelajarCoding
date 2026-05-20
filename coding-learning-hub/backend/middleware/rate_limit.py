from __future__ import annotations

import time
from collections import defaultdict, deque

from flask import Flask, jsonify, request


def register_rate_limiter(app: Flask) -> None:
    buckets: dict[str, deque[float]] = defaultdict(deque)
    limit = int(app.config.get("RATE_LIMIT_REQUESTS", 120))
    window = int(app.config.get("RATE_LIMIT_WINDOW_SECONDS", 60))

    @app.before_request
    def rate_limit():
        if request.path == "/health":
            return None

        client_key = request.headers.get("X-Forwarded-For", request.remote_addr or "unknown").split(",")[0].strip()
        now = time.time()
        bucket = buckets[client_key]

        while bucket and now - bucket[0] > window:
            bucket.popleft()

        if len(bucket) >= limit:
            return jsonify({"success": False, "message": "Terlalu banyak request. Coba lagi sebentar."}), 429

        bucket.append(now)
        return None

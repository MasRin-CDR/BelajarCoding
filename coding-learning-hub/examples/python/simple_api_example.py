from __future__ import annotations

from flask import Flask, jsonify


app = Flask(__name__)

MODULES = [
    {"id": "html", "level": "Beginner"},
    {"id": "css", "level": "Beginner"},
    {"id": "python", "level": "Beginner"},
]


@app.get("/api/modules")
def get_modules():
    return jsonify({"success": True, "data": MODULES})


if __name__ == "__main__":
    app.run(port=5050, debug=False)

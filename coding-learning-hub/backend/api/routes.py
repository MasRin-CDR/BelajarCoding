from __future__ import annotations

import logging
from datetime import datetime, timezone

from flask import Blueprint, jsonify, request

from api.data import MODULES_DATA, QUIZ_DATA
from api.storage import append_progress_entry
from api.validators import ValidationError, validate_module_id, validate_progress_payload


logger = logging.getLogger(__name__)

api_blueprint = Blueprint("api", __name__, url_prefix="/api")


@api_blueprint.get("/modules")
def get_modules():
    return jsonify(
        {
            "success": True,
            "message": "Daftar modul berhasil diambil.",
            "data": MODULES_DATA,
        }
    ), 200


@api_blueprint.get("/quiz")
def get_quiz():
    try:
        module_id = validate_module_id(request.args.get("module"))
    except ValidationError as error:
        return jsonify({"success": False, "message": str(error)}), 400

    if module_id:
        quiz_payload = {module_id: QUIZ_DATA[module_id]}
        message = f"Quiz untuk modul {module_id} berhasil diambil."
    else:
        quiz_payload = QUIZ_DATA
        message = "Semua quiz berhasil diambil."

    return jsonify(
        {
            "success": True,
            "message": message,
            "data": quiz_payload,
        }
    ), 200


@api_blueprint.post("/progress")
def save_progress():
    payload = request.get_json(silent=True)

    try:
        validated = validate_progress_payload(payload)
    except ValidationError as error:
        return jsonify({"success": False, "message": str(error)}), 400

    entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "module": validated["module"],
        "completed_topics": validated["completed_topics"],
        "completed_count": len(validated["completed_topics"]),
        "quiz_score": validated["quiz_score"],
    }

    append_progress_entry(entry)
    logger.info(
        "Progress stored for module=%s topics=%s quiz_score=%s",
        entry["module"],
        entry["completed_count"],
        entry["quiz_score"],
    )

    return jsonify(
        {
            "success": True,
            "message": "Progress berhasil disimpan.",
            "data": entry,
        }
    ), 201

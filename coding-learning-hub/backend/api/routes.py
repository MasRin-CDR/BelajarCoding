from __future__ import annotations

import logging
from datetime import datetime, timezone

from flask import Blueprint, jsonify, request

from api.storage import append_progress_entry
from api.validators import ValidationError, validate_module_id, validate_progress_payload
from models.schemas import ApiResponse
from security.rbac import require_role
from services.learning_service import get_quiz_payload, list_modules, list_security_topics


logger = logging.getLogger(__name__)

api_blueprint = Blueprint("api", __name__, url_prefix="/api")


@api_blueprint.get("/modules")
def get_modules():
    return jsonify(ApiResponse(True, "Daftar modul berhasil diambil.", list_modules()).to_dict()), 200


@api_blueprint.get("/quiz")
def get_quiz():
    try:
        module_id = validate_module_id(request.args.get("module"))
    except ValidationError as error:
        return jsonify({"success": False, "message": str(error)}), 400

    if module_id:
        quiz_payload = get_quiz_payload(module_id)
        message = f"Quiz untuk modul {module_id} berhasil diambil."
    else:
        quiz_payload = get_quiz_payload(None)
        message = "Semua quiz berhasil diambil."

    return jsonify(ApiResponse(True, message, quiz_payload).to_dict()), 200


@api_blueprint.get("/security/topics")
def get_security_topics():
    return jsonify(ApiResponse(True, "Topik security berhasil diambil.", list_security_topics()).to_dict()), 200


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

    return jsonify(ApiResponse(True, "Progress berhasil disimpan.", entry).to_dict()), 201


@api_blueprint.get("/admin/audit-sample")
@require_role("admin")
def get_audit_sample():
    return jsonify(
        ApiResponse(
            True,
            "Contoh endpoint RBAC admin.",
            {"events": ["login_success", "progress_created", "quiz_completed"]},
        ).to_dict()
    ), 200

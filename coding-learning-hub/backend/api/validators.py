from __future__ import annotations

from typing import Any

from api.data import MODULES_DATA


VALID_MODULE_IDS = {module["id"] for module in MODULES_DATA}


class ValidationError(ValueError):
    """Raised when incoming request data is invalid."""


def validate_module_id(module_id: str | None) -> str | None:
    if module_id is None:
        return None

    safe_module = module_id.strip().lower()
    if safe_module not in VALID_MODULE_IDS:
        raise ValidationError("Parameter module tidak valid.")
    return safe_module


def validate_progress_payload(payload: Any) -> dict[str, Any]:
    if not isinstance(payload, dict):
        raise ValidationError("Request body harus berupa object JSON.")

    module_id = payload.get("module")
    if not isinstance(module_id, str) or module_id.strip().lower() not in VALID_MODULE_IDS:
        raise ValidationError("Field `module` wajib dan harus berisi ID modul yang valid.")

    completed_topics = payload.get("completed_topics", [])
    if not isinstance(completed_topics, list):
        raise ValidationError("Field `completed_topics` harus berupa array string.")

    normalized_topics: list[str] = []
    for item in completed_topics:
        if not isinstance(item, str):
            raise ValidationError("Semua item di `completed_topics` harus berupa string.")
        safe_item = item.strip()
        if not safe_item:
            continue
        if len(safe_item) > 80:
            raise ValidationError("ID topik terlalu panjang.")
        normalized_topics.append(safe_item)

    if len(normalized_topics) > 50:
        raise ValidationError("Terlalu banyak topik dalam satu request.")

    quiz_score = payload.get("quiz_score")
    if quiz_score is not None:
        if not isinstance(quiz_score, int):
            raise ValidationError("Field `quiz_score` harus berupa integer jika dikirim.")
        if quiz_score < 0 or quiz_score > 100:
            raise ValidationError("Field `quiz_score` harus berada di antara 0 sampai 100.")

    return {
        "module": module_id.strip().lower(),
        "completed_topics": normalized_topics,
        "quiz_score": quiz_score,
    }

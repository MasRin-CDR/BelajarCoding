from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class ApiResponse:
    success: bool
    message: str
    data: Any = None

    def to_dict(self) -> dict[str, Any]:
        payload: dict[str, Any] = {
            "success": self.success,
            "message": self.message,
        }
        if self.data is not None:
            payload["data"] = self.data
        return payload


@dataclass(frozen=True)
class ProgressSubmission:
    module: str
    completed_topics: list[str]
    quiz_score: int | None

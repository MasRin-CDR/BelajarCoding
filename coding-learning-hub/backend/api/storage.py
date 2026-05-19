from __future__ import annotations

import json
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Any


DATA_DIR = Path(__file__).resolve().parent.parent / "data"
PROGRESS_FILE = DATA_DIR / "progress_submissions.json"


def ensure_storage() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not PROGRESS_FILE.exists():
        PROGRESS_FILE.write_text("[]", encoding="utf-8")


def read_progress_entries() -> list[dict[str, Any]]:
    ensure_storage()
    raw = PROGRESS_FILE.read_text(encoding="utf-8").strip()
    if not raw:
        return []

    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return []

    return data if isinstance(data, list) else []


def append_progress_entry(entry: dict[str, Any]) -> list[dict[str, Any]]:
    entries = read_progress_entries()
    entries.append(entry)
    ensure_storage()

    with NamedTemporaryFile("w", delete=False, encoding="utf-8", dir=DATA_DIR, suffix=".tmp") as temp_file:
        json.dump(entries, temp_file, ensure_ascii=False, indent=2)
        temp_path = Path(temp_file.name)

    temp_path.replace(PROGRESS_FILE)
    return entries

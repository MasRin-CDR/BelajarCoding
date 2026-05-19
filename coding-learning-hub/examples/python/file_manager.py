from __future__ import annotations

from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent / "notes"
BASE_DIR.mkdir(exist_ok=True)


def create_note(filename: str, content: str) -> Path:
    path = BASE_DIR / filename
    path.write_text(content, encoding="utf-8")
    return path


def read_note(filename: str) -> str:
    path = BASE_DIR / filename
    if not path.exists():
        raise FileNotFoundError("File tidak ditemukan.")
    return path.read_text(encoding="utf-8")


def delete_note(filename: str) -> None:
    path = BASE_DIR / filename
    if not path.exists():
        raise FileNotFoundError("File tidak ditemukan.")
    path.unlink()


def main() -> None:
    note = create_note("belajar.txt", "Hari ini fokus belajar Python file handling.")
    print(f"File dibuat: {note}")
    print(read_note("belajar.txt"))
    delete_note("belajar.txt")
    print("File berhasil dihapus.")


if __name__ == "__main__":
    main()

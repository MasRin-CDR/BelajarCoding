# Coding Learning Hub

Coding Learning Hub adalah website edukasi coding interaktif untuk belajar HTML, CSS, JavaScript, Python, dan C++ dari dasar sampai menengah/lanjut. Frontend dapat berjalan sebagai static website tanpa backend, sementara backend Python disiapkan sebagai lapisan API opsional.

## Fitur Utama

- Homepage dengan hero section, penjelasan platform, daftar modul, progress overview, search, filter, project practice, dan preview roadmap.
- Modul lengkap untuk HTML, CSS, JavaScript, Python, dan C++.
- Reference library untuk HTML tags, CSS properties, JavaScript built-ins, Python built-ins, Python standard library dasar, C++ basic syntax, dan C++ STL dasar.
- Playground interaktif untuk HTML/CSS/JavaScript dengan preview live, plus simulasi editor Python dan C++.
- Quiz interaktif per bahasa dengan skor otomatis, feedback, dan penjelasan jawaban.
- Roadmap belajar untuk Frontend Developer, Backend Developer, Full Stack Developer, Python Developer, dan C++ Basic Programmer.
- Progress tracking berbasis localStorage.
- Dark/light mode, responsive layout, sidebar navigation, breadcrumb, dan PWA-ready manifest/service worker.
- Backend Flask API dengan endpoint `/api/modules`, `/api/quiz`, dan `/api/progress`.

## Struktur Folder

```text
coding-learning-hub/
├── index.html
├── manifest.webmanifest
├── service-worker.js
├── README.md
├── .gitignore
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── responsive.css
│   │   └── components.css
│   ├── js/
│   │   ├── app.js
│   │   ├── data.js
│   │   ├── playground.js
│   │   ├── progress.js
│   │   ├── pwa.js
│   │   └── quiz.js
│   └── images/
├── pages/
│   ├── html.html
│   ├── css.html
│   ├── javascript.html
│   ├── python.html
│   ├── cpp.html
│   ├── roadmap.html
│   ├── playground.html
│   ├── quiz.html
│   └── reference.html
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── data/
│   │   └── .gitkeep
│   └── api/
│       ├── __init__.py
│       ├── data.py
│       ├── routes.py
│       ├── storage.py
│       └── validators.py
└── examples/
    ├── python/
    │   ├── cli_calculator.py
    │   ├── file_manager.py
    │   └── simple_api_example.py
    └── cpp/
        ├── calculator.cpp
        ├── array_manager.cpp
        └── oop_class_example.cpp
```

## Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python Flask
- Learning content: HTML, CSS, JavaScript, Python, C++

## Cara Menjalankan Frontend Lokal

Frontend tetap berjalan tanpa backend.

### Opsi 1: Python static server

```bash
cd coding-learning-hub
python -m http.server 8080
```

Lalu buka:

- `http://127.0.0.1:8080`

### Opsi 2: Live Server / static server lain

- Jalankan root folder `coding-learning-hub` dengan server statis favoritmu.
- Pastikan file diakses lewat `http://...`, bukan langsung `file://`, agar service worker dan fetch statis bekerja konsisten.

## Cara Menjalankan Backend Lokal

### 1. Masuk ke folder backend

```bash
cd coding-learning-hub/backend
```

### 2. Buat virtual environment

```bash
python -m venv .venv
```

### 3. Aktifkan virtual environment

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

macOS / Linux:

```bash
source .venv/bin/activate
```

### 4. Install dependency

```bash
pip install -r requirements.txt
```

### 5. Siapkan environment file

- Salin `backend/.env.example` menjadi `backend/.env`
- Ubah `SECRET_KEY` dan `CORS_ORIGINS` sesuai environment lokal atau production

### 6. Jalankan backend

```bash
python app.py
```

Backend akan tersedia di:

- `http://127.0.0.1:5000`

Health check:

- `http://127.0.0.1:5000/health`

## Contoh Endpoint API

### GET `/api/modules`

Response:

```json
{
  "success": true,
  "message": "Daftar modul berhasil diambil.",
  "data": [
    {
      "id": "html",
      "title": "HTML",
      "level": "Beginner",
      "estimated_time": "4-6 jam",
      "summary": "Struktur dasar, semantic tags, forms, tables, media, dan accessibility dasar."
    }
  ]
}
```

### GET `/api/quiz?module=python`

Response:

```json
{
  "success": true,
  "message": "Quiz untuk modul python berhasil diambil.",
  "data": {
    "python": [
      {
        "question": "Struktur data key-value di Python adalah...",
        "options": ["list", "tuple", "dictionary", "set"],
        "answer_index": 2
      }
    ]
  }
}
```

### POST `/api/progress`

Request body:

```json
{
  "module": "javascript",
  "completed_topics": ["js-dom", "js-fetch"],
  "quiz_score": 80
}
```

Response:

```json
{
  "success": true,
  "message": "Progress berhasil disimpan.",
  "data": {
    "timestamp": "2026-05-20T00:00:00+00:00",
    "module": "javascript",
    "completed_topics": ["js-dom", "js-fetch"],
    "completed_count": 2,
    "quiz_score": 80
  }
}
```

## Security Notes

- Tidak ada secret yang disimpan di frontend.
- Search input dibersihkan sebelum dipakai untuk filtering.
- Progress frontend disimpan hanya di localStorage untuk data non-sensitif.
- Backend memvalidasi query parameter dan request body.
- CORS dibatasi melalui environment variable.
- Debug mode default disarankan `false`.
- Logging backend tidak menyimpan payload sensitif.

## Cara Deploy

### Frontend static hosting

Gunakan hosting statis apa pun yang bisa melayani file HTML/CSS/JS:

1. Upload isi folder `coding-learning-hub/` kecuali folder `backend/` bila hanya ingin static version.
2. Pastikan root deploy mengarah ke `index.html`.
3. Jika host mendukung custom headers atau redirect, arahkan 404 ke `index.html` hanya bila nanti project diubah menjadi SPA.
4. Pastikan `service-worker.js` dan `manifest.webmanifest` ikut terdeploy di root.

### Backend Python hosting

Gunakan platform yang mendukung Python web app:

1. Deploy folder `backend/` sebagai service terpisah.
2. Set environment variables dari `.env.example`.
3. Install dependency dari `requirements.txt`.
4. Jalankan aplikasi dengan WSGI command yang sesuai platform, misalnya menunjuk ke object `app` di `app.py`.
5. Update `CORS_ORIGINS` agar hanya mengizinkan domain frontend production.

### Arsitektur deploy yang direkomendasikan

- Frontend: static hosting
- Backend: Python app hosting
- Data progres ringan: localStorage atau file JSON untuk demo
- Upgrade lanjutan: database dan auth jika ingin multi-user

## Ide Hosting yang Mudah

- Frontend-only: static host
- Full project terpisah: static host untuk frontend + Python host untuk backend
- Internal/demo sekolah: satu server dengan reverse proxy atau static folder + Flask service

## Pengembangan Lanjutan

- Tambahkan autentikasi user dan sinkronisasi progress lintas device.
- Ganti penyimpanan file JSON backend dengan database seperti PostgreSQL atau SQLite.
- Tambahkan halaman detail untuk project practice dan assessment rubric.
- Integrasikan execution sandbox untuk Python/C++ yang aman.
- Tambahkan mode mentor, rekomendasi materi berikutnya, dan analytics belajar.
- Tambahkan test suite frontend dan backend.
- Tambahkan CI/CD dan pipeline deployment.
- Tambahkan asset icon PWA lengkap dan offline caching yang lebih granular.
- Tambahkan localization dan dukungan i18n.

## Checklist Lanjutan

- [ ] Tambah autentikasi dan profil pengguna
- [ ] Sinkronisasi progress ke backend/database
- [ ] Tambah lesson detail yang lebih mendalam per topik
- [ ] Tambah project gallery dengan rubric penilaian
- [ ] Tambah code runner aman untuk Python/C++
- [ ] Tambah unit test dan integration test
- [ ] Tambah mode admin untuk mengelola konten
- [ ] Tambah SEO metadata dan social preview asset
- [ ] Tambah monitoring, rate limiting, dan audit logging

## Catatan

- Frontend didesain agar tetap berfungsi penuh meskipun backend tidak aktif.
- Backend saat ini berperan sebagai layer API demo yang mudah dikembangkan.
- Semua halaman saling terhubung dan menggunakan struktur modular agar mudah ditambah ke PWA atau web app yang lebih besar.

# Deployment Guide

## Static Frontend

1. Deploy folder `frontend/` ke static hosting.
2. Pastikan `index.html`, `css/`, `js/`, dan `data/` berada di root public folder.
3. Aktifkan HTTPS.
4. Tambahkan security headers:
   - `Content-Security-Policy`
   - `X-Content-Type-Options`
   - `X-Frame-Options`
   - `Referrer-Policy`

## Backend Flask API

1. Salin `backend/.env.example` menjadi `backend/.env`.
2. Ubah `SECRET_KEY`, `CORS_ORIGINS`, dan rate limit.
3. Jalankan dependency:

```bash
pip install -r backend/requirements.txt
```

4. Jalankan production server:

```bash
cd backend
gunicorn --bind 0.0.0.0:5000 app:app
```

## Docker Compose

```bash
cd docker
docker compose up --build
```

Frontend:

- `http://localhost:8080`

Backend:

- `http://localhost:5000/health`

## Nginx + VPS Checklist

- Gunakan user non-root untuk service backend.
- Pasang TLS via Cloudflare atau Let's Encrypt.
- Batasi `CORS_ORIGINS` ke domain frontend production.
- Jangan deploy `.env` ke public static folder.
- Aktifkan log rotation dan healthcheck.
- Jalankan dependency audit sebelum release.

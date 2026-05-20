# Security Checklist

## OWASP Top 10 Controls

- Broken Access Control: gunakan RBAC decorator dan test endpoint admin.
- Cryptographic Failures: pakai HTTPS, jangan log secret, rotasi key.
- Injection: gunakan parameterized query atau ORM safe APIs.
- Insecure Design: threat model flow auth, progress, API, dan telemetry.
- Security Misconfiguration: aktifkan CSP, HSTS, CORS allowlist, dan debug off.
- Vulnerable Components: audit dependency sebelum deploy.
- Identification and Authentication Failures: token expiry, strong secret, secure cookie untuk session.
- Software and Data Integrity Failures: CI/CD dengan signed artifact jika diperlukan.
- Logging and Monitoring Failures: log event security tanpa payload sensitif.
- SSRF: validasi URL outbound dan batasi network egress.

## Frontend

- Gunakan `textContent` atau escaping untuk output user-generated content.
- Jangan menyimpan token sensitif di localStorage untuk aplikasi production.
- Terapkan CSP ketat.
- Validasi panjang input search/filter.
- Jangan memuat script dari origin tidak dipercaya.

## Backend

- Validasi body request dan query parameter.
- Tambahkan rate limiting.
- Gunakan CORS allowlist.
- Gunakan `.env` untuk secret.
- Jangan aktifkan debug mode di production.
- Tangani error dengan response generik.

## Embedded & ECU

- Validasi header, length, payload, dan checksum sebelum proses data.
- Terapkan timeout dan retry terbatas.
- Jangan mempercayai packet serial/Bluetooth mentah.
- Log packet invalid dengan sampling agar tidak memenuhi storage.
- Pisahkan mode debug dari mode production.

# Mobile Integration Examples

## Android USB OTG Concept

Android dapat membaca adapter serial melalui USB OTG dengan library USB serial. Flow dasar:

1. Request permission ke `UsbManager`.
2. Buka serial port.
3. Set baud rate, data bits, stop bits, parity.
4. Baca stream bytes.
5. Kirim bytes ke packet parser.
6. Render telemetry dengan Jetpack Compose.

## Bluetooth Telemetry

Bluetooth serial memakai konsep serupa:

- Pair device ESP32.
- Buka socket RFCOMM.
- Baca stream bytes.
- Validasi frame dan checksum.
- Simpan telemetry terakhir ke local storage.

## REST API Integration

Mobile app dapat mengirim summary telemetry ke backend:

- `POST /api/progress` untuk demo progress.
- Endpoint production bisa menjadi `POST /api/telemetry`.
- Gunakan auth token, retry terbatas, dan offline queue.

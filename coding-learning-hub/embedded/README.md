# Embedded & ECU Examples

## Konsep ECU

ECU mengirim dan menerima data melalui protokol seperti CAN Bus, K-Line, UART bridge, atau adapter Bluetooth/USB. Data biasanya berbentuk frame dengan header, panjang payload, payload, dan checksum.

## Telemetry Realtime

Flow umum:

1. Sensor/ECU menghasilkan data.
2. ESP32 atau adapter membaca data via UART/CAN/K-Line.
3. Packet divalidasi dengan checksum.
4. Data dikirim ke dashboard via serial, Bluetooth, Wi-Fi, atau WebSocket bridge.
5. UI menampilkan RPM, throttle, suhu, voltage, dan error code.

## Reliability

- Timeout jika packet tidak lengkap.
- Retry terbatas untuk request penting.
- Drop packet jika checksum salah.
- Gunakan ring buffer untuk stream serial.
- Pisahkan parser dari transport agar mudah dites.

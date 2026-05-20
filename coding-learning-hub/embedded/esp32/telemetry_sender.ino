struct TelemetryPacket {
  uint16_t rpm;
  uint8_t throttle;
  uint8_t coolantTemp;
};

uint8_t checksum(const uint8_t* data, size_t length) {
  uint8_t sum = 0;
  for (size_t i = 0; i < length; i++) {
    sum += data[i];
  }
  return sum;
}

void sendPacket(const TelemetryPacket& packet) {
  uint8_t frame[7];
  frame[0] = 0xAA;
  frame[1] = 0x03;
  frame[2] = packet.rpm >> 8;
  frame[3] = packet.rpm & 0xFF;
  frame[4] = packet.throttle;
  frame[5] = packet.coolantTemp;
  frame[6] = checksum(frame, 6);
  Serial.write(frame, sizeof(frame));
}

void setup() {
  Serial.begin(115200);
}

void loop() {
  TelemetryPacket packet = {2450, 18, 86};
  sendPacket(packet);
  delay(1000);
}

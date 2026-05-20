#include <cstdint>
#include <optional>
#include <vector>

struct Telemetry {
    uint16_t rpm;
    uint8_t throttle;
    uint8_t coolantTemp;
};

uint8_t checksum(const std::vector<uint8_t>& frame, std::size_t length) {
    uint8_t sum = 0;
    for (std::size_t i = 0; i < length; ++i) {
        sum += frame[i];
    }
    return sum;
}

std::optional<Telemetry> parseTelemetry(const std::vector<uint8_t>& frame) {
    if (frame.size() != 7) {
        return std::nullopt;
    }
    if (frame[0] != 0xAA || frame[1] != 0x03) {
        return std::nullopt;
    }
    if (checksum(frame, 6) != frame[6]) {
        return std::nullopt;
    }

    uint16_t rpm = static_cast<uint16_t>((frame[2] << 8) | frame[3]);
    return Telemetry{rpm, frame[4], frame[5]};
}

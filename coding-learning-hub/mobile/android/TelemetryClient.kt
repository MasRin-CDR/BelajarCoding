package com.example.telemetry

data class TelemetryFrame(
    val rpm: Int,
    val throttle: Int,
    val coolantTemp: Int
)

fun parseTelemetryFrame(bytes: ByteArray): TelemetryFrame? {
    if (bytes.size != 7) return null
    if (bytes[0].toInt() and 0xFF != 0xAA) return null
    if (bytes[1].toInt() and 0xFF != 0x03) return null

    val expected = bytes.take(6).fold(0) { acc, byte -> (acc + (byte.toInt() and 0xFF)) and 0xFF }
    val actual = bytes[6].toInt() and 0xFF
    if (expected != actual) return null

    val rpm = ((bytes[2].toInt() and 0xFF) shl 8) or (bytes[3].toInt() and 0xFF)
    return TelemetryFrame(
        rpm = rpm,
        throttle = bytes[4].toInt() and 0xFF,
        coolantTemp = bytes[5].toInt() and 0xFF
    )
}

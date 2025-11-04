# WiFi Halo JSON Payload Documentation

## Overview

This document describes the structure and fields of the WiFi Halo JSON payload used for MQTT communication. This is a telemetry message that contains device identification, sensor telemetry data, and health status information.

## Payload Structure for Telmetry Message

```json
{
    "device_id": "1234567890",
    "sensor_type": "temperature_humidity",
    "firmware": "1.0.0",
    "hardware": "1.0.0",
    "protocol": "1.0.0",
    "message_type": "telemetry",
    "timestamp": "epoch_time_seconds",
    "trigger": "interval",
    "telemetry": {
        "temperature": 22,
        "humidity": 45
    },
    "health": {
        "battery_percentage": 80,
        "rssi": -50,
        "message_counter": 10000
    }
}
```

## Field Descriptions

### Root Level Fields

#### `device_id`
- **Type**: String
- **Description**: Unique identifier for the device
- **Example**: `"1234567890"`
- **Required**: Yes

#### `sensor_type`
- **Type**: String
- **Description**: Type of sensor
- **Example**: ` 1 = "temperature_humidity"`
- **Required**: Yes

#### `firmware`
- **Type**: String
- **Description**: Firmware version number
- **Format**: Semantic versioning (e.g., "1.0.0")
- **Example**: `"1.0.0"`
- **Required**: Yes

#### `hardware`
- **Type**: String
- **Description**: Hardware version number
- **Format**: Semantic versioning (e.g., "1.0.0")
- **Example**: `"1.0.0"`
- **Required**: Yes

#### `protocol`
- **Type**: String
- **Description**: Protocol version number
- **Format**: Semantic versioning 1.x.x = WiFiHalo, 2.x.x = WiFi, 3.x.x = Lora, 4.x.x = Digimesh
- **Example**: `"1.0.0"`
- **Required**: Yes

#### `message_type`
- **Type**: String
- **Description**: Type of message being sent
- **Example**: `"telemetry"` This could also be acknowledgment, settings, etc
- **Required**: Yes

#### `timestamp`
- **Type**: String
- **Description**: Timestamp when the message was generated, represented as epoch time in seconds
- **Format**: Epoch time (seconds since January 1, 1970 UTC)
- **Example**: `"epoch_time_seconds"`
- **Required**: Yes

#### `trigger`
- **Type**: String
- **Description**: Event or condition that triggered the message to be sent
- **Example**: `"interval"`
- **Note**: Common values may include "interval" for scheduled messages, interrupt for state change, etc
- **Required**: Yes

### Telemetry Object

The `telemetry` object contains sensor readings from the device.

#### `telemetry.temperature`
- **Type**: Number
- **Description**: Temperature reading in degrees Celsius
- **Example**: `22`
- **Required**: Yes

#### `telemetry.humidity`
- **Type**: Number
- **Description**: Relative humidity percentage
- **Range**: 0-100
- **Example**: `45`
- **Required**: Yes

### Health Object

The `health` object contains device health and status information.

#### `health.battery_percentage`
- **Type**: Number
- **Description**: Remaining battery level as a percentage
- **Range**: 0-100
- **Example**: `80`
- **Required**: Yes

#### `health.rssi`
- **Type**: Number
- **Description**: Received Signal Strength Indicator (RSSI) in dBm
- **Range**: Typically -100 to 0 (higher values indicate stronger signal)
- **Example**: `-50`
- **Note**: Values closer to 0 indicate stronger signal strength
- **Required**: Yes

#### `health.message_counter`
- **Type**: Number
- **Description**: Sequential counter for messages sent by the device
- **Example**: `10000`
- **Required**: Yes

## Usage Notes

- All fields are required in the payload
- The payload should be sent as a JSON string over MQTT
- This is a telemetry message type, as indicated by the `message_type` field
- The `timestamp` field uses epoch time in seconds (Unix timestamp)
- The `trigger` field indicates what caused the message to be sent (e.g., "interval" for scheduled messages)
- Temperature is measured in degrees Celsius
- Humidity is a percentage value (0-100)
- Battery percentage represents remaining charge (0-100)
- RSSI values are negative numbers, with values closer to 0 indicating better signal strength
- The message counter increments with each message sent and can be used for message tracking and detecting missed messages

## Example Payload

```json
{
    "device_id": "1234567890",
    "sensor_type": "temperature_humidity",
    "firmware": "1.0.0",
    "hardware": "1.0.0",
    "protocol": "1.0.0",
    "message_type": "telemetry",
    "timestamp": "epoch_time_seconds",
    "trigger": "interval",
    "telemetry": {
        "temperature": 22,
        "humidity": 45
    },
    "health": {
        "battery_percentage": 80,
        "rssi": -50,
        "message_counter": 10000
    }
}
```

## Version History

- **1.0.0**: Initial payload structure


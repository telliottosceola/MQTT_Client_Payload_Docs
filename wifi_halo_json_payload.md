# WiFi Halo JSON Payload Documentation

## Overview

This document describes the structure and fields of the WiFi Halo JSON payload used for MQTT communication. The payload supports multiple message types including:

### Messages TO Sensor (Commands/Configuration)
- **Configuration messages**: Device configuration parameters sent to the sensor
- **Command messages**: Commands sent to the sensor for execution

### Messages FROM Sensor (Responses/Telemetry)
- **Telemetry messages**: Device identification, sensor telemetry data, and health status information
- **Settings messages**: Device configuration parameters (periodic updates)
- **Settings Acknowledgment messages**: Confirmation of settings updates with current settings
- **Command Acknowledgment messages**: Confirmation of command execution with results

## Payload Structure for Configuration Message (TO Sensor)

```json
{
    "message_type": "configuration",
    "device_id": "1234567890",
    "timestamp": "epoch_time_seconds",
    "settings": {
        "telemetry_interval": 10,
        "settings_interval": 3600,
        "ssid": "MyWiFi",
        "mqtt_broker": "mqtt.example.com",
        "mqtt_client_id": "MyClientId",
        "mqtt_port": 1883,
        "mqtt_username": "MyUsername",
        "mqtt_topic": "MyTopic",
        "mqtt_qos": 0,
        "mqtt_retain": false,
        "ntp_server": "pool.ntp.org",
        "ntp_timezone": "UTC",
        "ntp_update_interval": 3600
    },
    "response_topic": "/command/response/1234567890"
}
```

## Payload Structure for Command Message (TO Sensor)

```json
{
    "message_type": "command",
    "device_id": "1234567890",
    "correlation_id": "daily_command_1001",
    "timestamp": "epoch_time_seconds",
    "command_list": [
        {"reset_lifetime_packets": {}},
        {"reboot": {}},
        {"factory_reset": {"reboot": true}},
        {"firmware_update": {"target_version": "1.0.0"}},
        {"request_raw_data": {"odr": 800, "duration": 1000, "lpf": 4, "hpf": 2048}}
    ],
    "response_topic": "/command/response/1234567890"
}
```

## Payload Structure for Telemetry Message (FROM Sensor)

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
    "last_settings_update": "epoch_time_seconds",
    "telemetry": {
        "temperature": 22,
        "humidity": 45
    },
    "health": {
        "battery_percentage": 80,
        "rssi": -50,
        "message_counter": 10000
    },
    "errors": [
        {"error": "Temperature sensor error"},
        {"error": "Humidity sensor error"},
        {"error": "Battery sensor error"}
    ]
}
```

## Payload Structure for Settings Message (FROM Sensor)

```json
{
    "device_id": "1234567890",
    "sensor_type": "temperature_humidity",
    "firmware": "1.0.0",
    "hardware": "1.0.0",
    "protocol": "1.0.0",
    "message_type": "settings",
    "timestamp": "epoch_time_seconds",
    "trigger": "interval",
    "last_settings_update": "epoch_time_seconds",
    "settings": {
        "telemetry_interval": 10,
        "settings_interval": 3600,
        "ssid": "MyWiFi",
        "mqtt_broker": "mqtt.example.com",
        "mqtt_client_id": "MyClientId",
        "mqtt_port": 1883,
        "mqtt_username": "MyUsername",
        "mqtt_topic": "MyTopic",
        "mqtt_qos": 0,
        "mqtt_retain": false,
        "ntp_server": "pool.ntp.org",
        "ntp_timezone": "UTC",
        "ntp_update_interval": 3600
    }
}
```

## Payload Structure for Settings Acknowledgment Message (FROM Sensor)

```json
{
    "device_id": "1234567890",
    "sensor_type": "temperature_humidity",
    "firmware": "1.0.0",
    "hardware": "1.0.0",
    "protocol": "1.0.0",
    "message_type": "settings_acknowledgment",
    "timestamp": "epoch_time_seconds",
    "last_settings_update": "epoch_time_seconds",
    "configure_request_timestamp": "epoch_time_seconds_from_configure_request",
    "settings": {
        "telemetry_interval": 10,
        "settings_interval": 3600,
        "ssid": "MyWiFi",
        "mqtt_broker": "mqtt.example.com",
        "mqtt_client_id": "MyClientId",
        "mqtt_port": 1883,
        "mqtt_username": "MyUsername",
        "mqtt_topic": "MyTopic",
        "mqtt_qos": 0,
        "mqtt_retain": false,
        "ntp_server": "pool.ntp.org",
        "ntp_timezone": "UTC",
        "ntp_update_interval": 3600
    },
    "errors": [
        {"ntp_update_interval": "invalid url"},
        {"telemetry_interval": "invalid value type"},
        {"mqtt_retain": "invalid value"}
    ]
}
```

## Payload Structure for Command Acknowledgment Message (FROM Sensor)

```json
{
    "device_id": "1234567890",
    "sensor_type": "temperature_humidity",
    "firmware": "1.0.0",
    "hardware": "1.0.0",
    "protocol": "1.0.0",
    "message_type": "command_acknowledgment",
    "timestamp": "epoch_time_seconds",
    "last_command_update": "epoch_time_seconds",
    "correlation_id": "daily_command_1001",
    "command_results": [
        {"reset_lifetime_packets": "success"},
        {"reboot": "failure"},
        {"factory_reset": "pending"},
        {"firmware_update": "pending"}
    ],
    "errors": [
        {"reset_lifetime_packets": "Command execution error"},
        {"reboot": "Invalid command"},
        {"factory_reset": "Invalid value"},
        {"firmware_update": "Invalid Version"}
    ]
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
- **Values**: `"configuration"`, `"command"` (TO sensor), `"telemetry"`, `"settings"`, `"settings_acknowledgment"`, `"command_acknowledgment"` (FROM sensor)
- **Example**: `"telemetry"`
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
- **Note**: Common values may include "interval" for scheduled messages, interrupt for state change, etc. Not present in acknowledgment messages.
- **Required**: Conditional (No for acknowledgment messages)

#### `last_settings_update`
- **Type**: String
- **Description**: Timestamp of the last settings update, represented as epoch time in seconds
- **Format**: Epoch time (seconds since January 1, 1970 UTC)
- **Example**: `"epoch_time_seconds"`
- **Required**: Conditional (Present in telemetry, settings, and settings_acknowledgment messages)

#### `last_command_update`
- **Type**: String
- **Description**: Timestamp of the last command update, represented as epoch time in seconds
- **Format**: Epoch time (seconds since January 1, 1970 UTC)
- **Example**: `"epoch_time_seconds"`
- **Required**: Conditional (Present in command_acknowledgment messages)

#### `correlation_id`
- **Type**: String
- **Description**: Unique identifier for correlating command requests with their acknowledgments. This value is sent in command messages (TO sensor) and echoed back in command_acknowledgment messages (FROM sensor) to match responses to requests.
- **Example**: `"daily_command_1001"`
- **Required**: Conditional (Yes for command and command_acknowledgment messages)

#### `configure_request_timestamp`
- **Type**: String
- **Description**: Timestamp from the original configuration request, echoed back in settings_acknowledgment messages to correlate the acknowledgment with the original request
- **Format**: Epoch time (seconds since January 1, 1970 UTC)
- **Example**: `"epoch_time_seconds_from_configure_request"`
- **Required**: Conditional (Present in settings_acknowledgment messages)

#### `response_topic`
- **Type**: String
- **Description**: MQTT topic where the sensor should publish its response/acknowledgment message. Allows the sender to specify a custom response topic for commands and configuration messages.
- **Example**: `"/command/response/1234567890"`
- **Required**: Conditional (Optional for configuration and command messages)

#### `command_list`
- **Type**: Array of Objects
- **Description**: Array containing commands to be executed. Each object contains a command name as the key and command parameters as the value.
- **Example**: `[{"reset_lifetime_packets": {}}, {"reboot": {}}, {"factory_reset": {"reboot": true}}]`
- **Required**: Conditional (Yes for command messages)

#### `command_results`
- **Type**: Array of Objects
- **Description**: Array containing the results of command execution. Each object contains a command name as the key and its result status as the value.
- **Result Status Values**: "success", "failure", "pending"
- **Example**: `[{"reset_lifetime_packets": "success"}, {"reboot": "failure"}, {"factory_reset": "pending"}]`
- **Required**: Conditional (Yes for command_acknowledgment messages)

#### `errors`
- **Type**: Array of Objects
- **Description**: Array containing error information. The structure varies by message type:
  - **Telemetry messages**: Generic error messages with structure `[{"error": "error_message"}]`
  - **Settings Acknowledgment messages**: Field-specific validation errors with structure `[{"field_name": "error_message"}]`
  - **Command Acknowledgment messages**: Command-specific execution errors with structure `[{"command_name": "error_message"}]`
- **Example (Telemetry)**: `[{"error": "Temperature sensor error"}, {"error": "Humidity sensor error"}]`
- **Example (Settings Acknowledgment)**: `[{"ntp_update_interval": "invalid url"}, {"telemetry_interval": "invalid value type"}]`
- **Example (Command Acknowledgment)**: `[{"reset_lifetime_packets": "Command execution error"}, {"reboot": "Invalid command"}]`
- **Required**: Conditional (Optional - only present when errors occur)

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

### Settings Object

The `settings` object contains device configuration parameters. This object is present when `message_type` is "settings" or "settings_acknowledgment".

#### `settings.telemetry_interval`
- **Type**: Number
- **Description**: Interval in seconds between telemetry message transmissions
- **Example**: `10`
- **Required**: Yes

#### `settings.settings_interval`
- **Type**: Number
- **Description**: Interval in seconds between settings message transmissions
- **Example**: `3600`
- **Required**: Yes

#### `settings.ssid`
- **Type**: String
- **Description**: WiFi network SSID (Service Set Identifier)
- **Example**: `"MyWiFi"`
- **Required**: Yes

#### `settings.mqtt_broker`
- **Type**: String
- **Description**: MQTT broker hostname or IP address
- **Example**: `"mqtt.example.com"`
- **Required**: Yes

#### `settings.mqtt_client_id`
- **Type**: String
- **Description**: MQTT client identifier
- **Example**: `"MyClientId"`
- **Required**: Yes

#### `settings.mqtt_port`
- **Type**: Number
- **Description**: MQTT broker port number
- **Example**: `1883`
- **Required**: Yes

#### `settings.mqtt_username`
- **Type**: String
- **Description**: MQTT broker username for authentication
- **Example**: `"MyUsername"`
- **Required**: Yes

#### `settings.mqtt_topic`
- **Type**: String
- **Description**: MQTT topic to publish messages to
- **Example**: `"MyTopic"`
- **Required**: Yes

#### `settings.mqtt_qos`
- **Type**: Number
- **Description**: MQTT Quality of Service level (0, 1, or 2)
- **Range**: 0-2
- **Example**: `0`
- **Note**: 0 = at most once, 1 = at least once, 2 = exactly once
- **Required**: Yes

#### `settings.mqtt_retain`
- **Type**: Boolean
- **Description**: MQTT retain flag
- **Example**: `false`
- **Note**: If true, the broker will retain the last message published to the topic
- **Required**: Yes

#### `settings.ntp_server`
- **Type**: String
- **Description**: NTP (Network Time Protocol) server hostname
- **Example**: `"pool.ntp.org"`
- **Required**: Yes

#### `settings.ntp_timezone`
- **Type**: String
- **Description**: Timezone identifier
- **Example**: `"UTC"`
- **Required**: Yes

#### `settings.ntp_update_interval`
- **Type**: Number
- **Description**: Interval in seconds between NTP time synchronization updates
- **Example**: `3600`
- **Required**: Yes

## Usage Notes

- All fields are required in the payload (except where noted as conditional)
- The payload should be sent as a JSON string over MQTT
- Message types are indicated by the `message_type` field:
  - **TO Sensor**: `"configuration"`, `"command"`
  - **FROM Sensor**: `"telemetry"`, `"settings"`, `"settings_acknowledgment"`, `"command_acknowledgment"`
- The `timestamp` field uses epoch time in seconds (Unix timestamp)
- The `trigger` field indicates what caused the message to be sent (e.g., "interval" for scheduled messages, "interrupt" for state change). Not present in acknowledgment messages or messages TO sensor.
- For configuration and command messages (TO sensor):
  - `device_id` is optional but recommended to identify the target device
  - `timestamp` can be included to track when the request was sent
  - `response_topic` is optional and allows specifying a custom MQTT topic for responses
  - `correlation_id` (command messages) is used to match command acknowledgments with their requests
- For command messages:
  - `command_list` contains an array of commands to execute
  - Each command is an object with the command name as the key and parameters as the value
  - Supported commands include: `reset_lifetime_packets`, `reboot`, `factory_reset`, `firmware_update`, `request_raw_data`
- For telemetry messages:
  - Temperature is measured in degrees Celsius
  - Humidity is a percentage value (0-100)
  - Battery percentage represents remaining charge (0-100)
  - RSSI values are negative numbers, with values closer to 0 indicating better signal strength
  - The message counter increments with each message sent and can be used for message tracking and detecting missed messages
- For settings and settings_acknowledgment messages:
  - Intervals are specified in seconds
  - MQTT QoS levels: 0 = at most once, 1 = at least once, 2 = exactly once
  - NTP update interval is specified in seconds
- For settings_acknowledgment messages:
  - Sent in response to configuration messages to confirm the current settings state
  - Contains the `last_settings_update` timestamp indicating when settings were last modified
  - Contains `configure_request_timestamp` to correlate with the original configuration request
- For command_acknowledgment messages:
  - Sent in response to command execution requests
  - Contains `correlation_id` to match the acknowledgment with the original command request
  - `command_results` array contains the execution status for each command (success, failure, pending)
- The `errors` array is optional and only present when errors occur:
  - In telemetry messages: reports sensor or device errors
  - In settings_acknowledgment messages: reports validation errors for specific settings fields
  - In command_acknowledgment messages: reports execution errors for specific commands

## Example Payloads

### Configuration Message Example (TO Sensor)

```json
{
    "message_type": "configuration",
    "device_id": "1234567890",
    "timestamp": "epoch_time_seconds",
    "settings": {
        "telemetry_interval": 10,
        "settings_interval": 3600,
        "ssid": "MyWiFi",
        "mqtt_broker": "mqtt.example.com",
        "mqtt_client_id": "MyClientId",
        "mqtt_port": 1883,
        "mqtt_username": "MyUsername",
        "mqtt_topic": "MyTopic",
        "mqtt_qos": 0,
        "mqtt_retain": false,
        "ntp_server": "pool.ntp.org",
        "ntp_timezone": "UTC",
        "ntp_update_interval": 3600
    },
    "response_topic": "/command/response/1234567890"
}
```

### Command Message Example (TO Sensor)

```json
{
    "message_type": "command",
    "device_id": "1234567890",
    "correlation_id": "daily_command_1001",
    "timestamp": "epoch_time_seconds",
    "command_list": [
        {"reset_lifetime_packets": {}},
        {"reboot": {}},
        {"factory_reset": {"reboot": true}},
        {"firmware_update": {"target_version": "1.0.0"}},
        {"request_raw_data": {"odr": 800, "duration": 1000, "lpf": 4, "hpf": 2048}}
    ],
    "response_topic": "/command/response/1234567890"
}
```

### Telemetry Message Example (FROM Sensor)

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
    "last_settings_update": "epoch_time_seconds",
    "telemetry": {
        "temperature": 22,
        "humidity": 45
    },
    "health": {
        "battery_percentage": 80,
        "rssi": -50,
        "message_counter": 10000
    },
    "errors": [
        {"error": "Temperature sensor error"},
        {"error": "Humidity sensor error"},
        {"error": "Battery sensor error"}
    ]
}
```

### Settings Message Example (FROM Sensor)

```json
{
    "device_id": "1234567890",
    "sensor_type": "temperature_humidity",
    "firmware": "1.0.0",
    "hardware": "1.0.0",
    "protocol": "1.0.0",
    "message_type": "settings",
    "timestamp": "epoch_time_seconds",
    "trigger": "interval",
    "last_settings_update": "epoch_time_seconds",
    "settings": {
        "telemetry_interval": 10,
        "settings_interval": 3600,
        "ssid": "MyWiFi",
        "mqtt_broker": "mqtt.example.com",
        "mqtt_client_id": "MyClientId",
        "mqtt_port": 1883,
        "mqtt_username": "MyUsername",
        "mqtt_topic": "MyTopic",
        "mqtt_qos": 0,
        "mqtt_retain": false,
        "ntp_server": "pool.ntp.org",
        "ntp_timezone": "UTC",
        "ntp_update_interval": 3600
    }
}
```

### Settings Acknowledgment Message Example (FROM Sensor)

```json
{
    "device_id": "1234567890",
    "sensor_type": "temperature_humidity",
    "firmware": "1.0.0",
    "hardware": "1.0.0",
    "protocol": "1.0.0",
    "message_type": "settings_acknowledgment",
    "timestamp": "epoch_time_seconds",
    "last_settings_update": "epoch_time_seconds",
    "configure_request_timestamp": "epoch_time_seconds_from_configure_request",
    "settings": {
        "telemetry_interval": 10,
        "settings_interval": 3600,
        "ssid": "MyWiFi",
        "mqtt_broker": "mqtt.example.com",
        "mqtt_client_id": "MyClientId",
        "mqtt_port": 1883,
        "mqtt_username": "MyUsername",
        "mqtt_topic": "MyTopic",
        "mqtt_qos": 0,
        "mqtt_retain": false,
        "ntp_server": "pool.ntp.org",
        "ntp_timezone": "UTC",
        "ntp_update_interval": 3600
    },
    "errors": [
        {"ntp_update_interval": "invalid url"},
        {"telemetry_interval": "invalid value type"},
        {"mqtt_retain": "invalid value"}
    ]
}
```

### Command Acknowledgment Message Example (FROM Sensor)

```json
{
    "device_id": "1234567890",
    "sensor_type": "temperature_humidity",
    "firmware": "1.0.0",
    "hardware": "1.0.0",
    "protocol": "1.0.0",
    "message_type": "command_acknowledgment",
    "timestamp": "epoch_time_seconds",
    "last_command_update": "epoch_time_seconds",
    "correlation_id": "daily_command_1001",
    "command_results": [
        {"reset_lifetime_packets": "success"},
        {"reboot": "failure"},
        {"factory_reset": "pending"},
        {"firmware_update": "pending"}
    ],
    "errors": [
        {"reset_lifetime_packets": "Command execution error"},
        {"reboot": "Invalid command"},
        {"factory_reset": "Invalid value"},
        {"firmware_update": "Invalid Version"}
    ]
}
```

## Version History

- **1.0.0**: Initial payload structure


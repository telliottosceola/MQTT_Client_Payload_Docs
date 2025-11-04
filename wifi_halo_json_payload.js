//Telemetry Message
{
    "device_id": "1234567890",
    "sensor_type": "temperature_humidity",
    "firmware": "1.0.0",
    "hardware": "1.0.0",
    "protocol": "1.0.0",
    "message_type": "telemetry",
    "timestamp": "epoch_time_seconds",
    "trigger": "interval",
    "telemetry":
        {"temperature":22,"humidity":45},
    "health":{
        "battery_percentage":80,
        "rssi":-50,
        "message_counter":10000}
    "errors":[
        {"code":1001,"message":"Temperature sensor error"},
        {"code":1002,"message":"Humidity sensor error"},
        {"code":1003,"message":"Battery sensor error"}]
}
//Settings Message
{
    "device_id": "1234567890",
    "sensor_type": "temperature_humidity",
    "firmware": "1.0.0",
    "hardware": "1.0.0",
    "protocol": "1.0.0",
    "message_type": "settings",
    "timestamp": "epoch_time_seconds",
    "trigger": "interval",
    "settings":{
        "telemetry_interval":10,
        "settings_interval":3600,
        "ssid":"MyWiFi",
        "mqtt_broker":"mqtt.example.com",
        "mqtt_client_id":"MyClientId",
        "mqtt_port":1883,
        "mqtt_username":"MyUsername",
        "mqtt_topic":"MyTopic",
        "mqtt_qos":0,
        "mqtt_retain":false,
        "ntp_server":"pool.ntp.org",
        "ntp_timezone":"UTC",
        "ntp_timezone_offset":0
    }
}
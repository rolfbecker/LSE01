# LSE01 LoRa Payload Decoder and Encoder on TTN

The communication between a LoRaWAN network server and a LoRaWAN device can be bidirectional. <br>
The direction **device -> server** is called `uplink` and **server -> device** is `downlink`.




## Decoder Example for Received Uplink Message Payloads 

A LoRa message payload sent by a device such as the LSE01 is byte array. See the LSE01 device documentation for more information of the payload format. The data sent `uplink` has to be **decoded**, i.e. the bytes have to be combined to yield numbers or strings. 
The example decoder in this folder converts a LSE01 message into a JSON object. 


### INPUT PAYLOAD (BINARY): <br>
`0C D0 00 00 03 3F 07 14 18 9C 01`

### OUTPUT (JSON): <br>
```
{
  "battery_voltage": {
    "comment": "LSE01 battery voltage",
    "unit": "V",
    "value": 3.28
  },
  "extra_temperature_sensor": {
    "comment": "Temperature from an extra DS18B20. Not connected by default.",
    "unit": "°C",
    "value": "0.00"
  },
  "soil_sensor": {
    "electrical_conductivity": {
      "comment": "Soil electrical conductivity (EC)",
      "unit": "uS/cm",
      "value": 6300
    },
    "moisture": {
      "comment": "Volumetric soil water content",
      "unit": "%vol",
      "value": "8.31"
    },
    "temperature": {
      "comment": "Soil temperature",
      "unit": "°C",
      "value": "18.12"
    }
  },
  "type": "LSE01"
}
```

## Encoder Example for Downlink Message Payloads to be Sent

Currently only the message to set the measurement/transmission interval is defined.

### INPUT JSON: <br>
`{"transmission_time_interval_secs": 30}`

### OUTPUT PAYLOAD: <br>
`01 00 00 1E`

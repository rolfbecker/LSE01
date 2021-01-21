# LSE01 LoRa Payload Decoder and Encoder on TTN

The communication between a LoRaWAN network server and a LoRaWAN device can be bidirectional. <br>
The direction **device -> server** is called `uplink` and **server -> device** is `downlink`.




## Decoder Example for Received Uplink Message Payloads 

A LoRa message payload sent by a device such as the LSE01 is byte array. See the LSE01 device documentation for more information of the payload format. The data sent `uplink` has to be **decoded**, i.e. the bytes have to be combined to yield numbers or strings. 
The examplte decoder in this folder converts a LSE01 message into a JSON object. 


INPUT: <br>



OUTPUT: <br>

## Encoder Example for Downlink Message Payloads to be Sent

INPUT: <br>


OUTPUT: <br>


// TTN Data Encoder for Dragino LSE01 to Set the Transmission Time Interval (Custom Payload Format)
// Rolf Becker, 2020-01-03, V001
//
// A PAYLOAD FOR TESTING (JSON)
// {"transmission_time_interval_secs": 30}
//
// RESULT:
// encoded payload:
// 01 00 00 1E

function Encoder(object, port) {
  // Encode downlink messages sent as
  // object to an array or buffer of bytes.
  var bytes = [];
  
  var d = object.transmission_time_interval_secs; // duration in secs
  
  if (d > 3600) d = 3600; // max interval: 3600 secs (1h), set by me, otherwise response not acceptable. LSE01 max unknown.
  if (d < 6) d = 6;       // min interval: 6 secs, set by LSE01.

  // MSB first
  bytes[3] = d & 0xFF;
  bytes[2] = (d >> 8) & 0xFF;
  bytes[1] = 0;
  bytes[0] = 1; // Message Type ID for setting time interval

  return bytes;
}

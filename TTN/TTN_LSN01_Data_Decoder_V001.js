// TTN Data Decoder for Dragino LSE01 (Custom Payload Format)
// Originally from Dragino, 
// output format modified by Rolf Becker, 2020-01-03, V001

// A PAYLOAD FOR TESTING
// 0C D0 00 00 03 3F 07 14 18 9C 01

function Decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  
  var value=(bytes[0]<<8 | bytes[1]) & 0x3FFF;
  var batV=value/1000;//Battery,units:V
  
  value=bytes[2]<<8 | bytes[3];
  if(bytes[2] & 0x80) 
    value |= 0xFFFF0000;
  var temp_DS18B20=(value/10).toFixed(2);//DS18B20,temperature,units: °C
  
  value=bytes[4]<<8 | bytes[5];
  var water_SOIL=(value/100).toFixed(2);//water_SOIL,Humidity,units:%
  
  value=bytes[6]<<8 | bytes[7];
  var temp_SOIL;
  if((value & 0x8000)>>15 === 0)
    temp_SOIL=(value/100).toFixed(2);//temp_SOIL,temperature,units: °C
  else if((value & 0x8000)>>15 === 1)
    temp_SOIL=((value-0xFFFF)/100).toFixed(2);//temp_SOIL,temperature,units: °C
  
  value=bytes[8]<<8 | bytes[9];
  var conduct_SOIL=(value);//conduct_SOIL,conductivity,units: uS/cm
  
/*
  // Original output format by Dragino
  return {
    bat:batV +" V",
    temp_DS18B20:temp_DS18B20+" °C",
    water_SOIL:water_SOIL+" %",
    temp_SOIL:temp_SOIL+" °C",
    conduct_SOIL:conduct_SOIL+" uS/cm"
  };
*/
  
  return {
    battery_voltage: {
      value: batV,
      unit: "V",
      comment: "LSE01 battery voltage"
    },
    
    extra_temperature_sensor: {
      value: temp_DS18B20,
      unit: "°C",
      comment: "Temperature from an extra DS18B20. Not connected by default."
    },
    
    soil_sensor: {
    
      moisture: {
        value: water_SOIL, 
        unit: "%vol",
        comment: "Volumetric soil water content"
      },
      
      temperature: {
        value: temp_SOIL,
        unit: "°C",
        comment: "Soil temperature"
      },
      
      electrical_conductivity: {
        value: conduct_SOIL,
        unit: "uS/cm",
        comment: "Soil electrical conductivity (EC)"
      }
    }
  }
}

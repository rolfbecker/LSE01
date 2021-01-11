// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
// The function must return an object, e.g. {"temperature": 22.5}
function Decode(fPort, bytes) {
	
  switch(fPort) {
    
    case 2:
	
	  // BATTERY
  	  var value=(bytes[0]<<8 | bytes[1]) & 0x3FFF;
	  var batV=value/1000;//Battery,units:V
	  
	  //DS18B20 (not used)
	  value=bytes[2]<<8 | bytes[3];
      if(bytes[2] & 0x80) 
        value |= 0xFFFF0000;
      var temp_DS18B20=(value/10).toFixed(2);//DS18B20,temperature,units: °C
  
      //SOIL WATER CONTENT
      value=bytes[4]<<8 | bytes[5];
      var water_SOIL=(value/100).toFixed(2);//water_SOIL,Humidity,units:%
  
      //SOIL TEMPERATURE
      value=bytes[6]<<8 | bytes[7];
      var temp_SOIL;
      if((value & 0x8000)>>15 === 0)
        temp_SOIL=(value/100).toFixed(2);//temp_SOIL,temperature,units: °C
      else if((value & 0x8000)>>15 === 1)
        temp_SOIL=((value-0xFFFF)/100).toFixed(2);//temp_SOIL,temperature,units: °C
  
      //SOIL ELECTRICAL CONDUCTIVITY
      value=bytes[8]<<8 | bytes[9];
      var conduct_SOIL=(value);//conduct_SOIL,conductivity,units: uS/cm
    
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
    default:
      return {
        Error: "No port configured, check the upload payload file."
      };
  }
}

import paho.mqtt.client as mqtt
import json

ttn_mqtt_broker  = 'eu.thethings.network'
ttn_mqtt_port    = 8883
ttn_mqtt_timeout = 60

ttn_mqtt_sub_topic = '+/devices/+/up'

# TTN Application ID and default TTN Application Access Key generated durring TTN app creation
ttn_app_id         = "hsrw_iotlab_lse01"
ttn_app_access_key = "ttn-account-v2.0xngX41yI5MwO3Kyv6eHaK5GDGiUq8V_Pf0LBMKHXHU"

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Trying to connect to: %s:%d" % (ttn_mqtt_broker, ttn_mqtt_port))    
    print('Connected with result code: '+str(rc))
    client.subscribe(ttn_mqtt_sub_topic)
    print('Subscribed to topic: %s' % (ttn_mqtt_sub_topic)) 
    
# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    topic = msg.topic
    print("TOPIC: %s" % (topic))
    payload = json.loads(msg.payload)
    print("PAYLOAD: %s" % (payload))

# Create the MQTT client
client = mqtt.Client()

# Bind callback functions to client
client.on_connect = on_connect
client.on_message = on_message

# Use secure rransmission
client.tls_set()

# Use TTN App ID and TTN Access Key as MQTT Username and Password.
client.username_pw_set(username = ttn_app_id, password = ttn_app_access_key)

# Connect the client to the broker. 
# This provokes the execution of the on_connect() function.
# Within on_connect() the subscribe() function is called.
client.connect(ttn_mqtt_broker, ttn_mqtt_port, ttn_mqtt_timeout)

# Whenever a message is received the on_message() callback function is called.
client.loop_forever()
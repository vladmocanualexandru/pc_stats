import paho.mqtt.client as mqtt
import json, os

def handle_command(command):
    if command == 'shutdown':
        os.system("sudo shutdown now -h")
        exit(1)

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(os.getenv('MQTT_TOPIC'))

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    payload = json.loads(msg.payload)
    handle_command(payload['command'])
    # print(msg.topic+" "+str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.username_pw_set(os.getenv('MQTT_USER'), os.getenv('MQTT_PASSWORD'))

client.connect(os.getenv('MQTT_BROKER'), int(os.getenv('MQTT_PORT')), 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()

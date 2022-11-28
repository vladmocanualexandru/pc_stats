import paho.mqtt.client as mqtt
import json, subprocess

MQTT_BROKER = "home.hub"
MQTT_PORT = 1883
MQTT_USER = "pc_stats_rpi"
MQTT_PASSWORD = "FeW*!!XQgb%duykLcHqW$q3vtQ&%@jh7R9noHQ!QNTX#P^w!fCLdi%2$Z4TFoSUHy!E@?ogo$X9H@rfbPheK!eQ^pW%XK3sLeACqjmN%&x4kb?$@RaHVk$^FJPhCF4Ps"
MQTT_TOPIC = "hass-out/control-pc-stats-rpi"

def handle_command(command):
    if command == 'shutdown':
        subprocess.run(["shutdown"])
        exit(1)

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(MQTT_TOPIC)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    payload = json.loads(msg.payload)
    handle_command(payload['command'])
    # print(msg.topic+" "+str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.username_pw_set(MQTT_USER, MQTT_PASSWORD)

client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
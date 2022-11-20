package mov.personal.pcstats.aggregator.mqtt;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public class SingleValueListener {
    private Map<String, SingleValueTopic> topics = new HashMap<>();
    private String endpoint, username, password;

    public SingleValueListener(String mqttEnpoint, String mqttUsername, String mqttPassword){
        this.endpoint = mqttEnpoint;
        this.username = mqttUsername;
        this.password = mqttPassword;
    }

    public void addTopic(SingleValueTopic topic) {
        topics.put(topic.getTopic(), topic);
    }

    public void connect(){
        String clientid = "pc_stats_aggregator";

        try {
            MqttClient client = new MqttClient(endpoint, clientid, new MemoryPersistence());
            // connect options
            MqttConnectOptions options = new MqttConnectOptions();
            options.setUserName(username);
            options.setPassword(password.toCharArray());

            options.setConnectionTimeout(60);
            options.setKeepAliveInterval(60);
            options.setAutomaticReconnect(true);

            // setup callback
            client.setCallback(new MqttCallback() {

                public void connectionLost(Throwable cause) {
                    System.out.println("MQTT topic connection lost: " + cause.getMessage());
                }

                public void messageArrived(String topic, MqttMessage message) {
                    topics.get(topic).payloadReceived(message.getPayload());
                }

                public void deliveryComplete(IMqttDeliveryToken token) {}

            });
            
            client.connect(options);

            Set<String> topicLabels = topics.keySet();
            client.subscribe(topics.keySet().toArray(new String[topicLabels.size()]));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

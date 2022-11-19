package mov.personal.pcstats.aggregator.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public abstract class SingleValueTopic {
    private boolean connectionLost = true;

    private String endpoint, username, password;

    public SingleValueTopic(String endpoint, String username, String password){
        this.endpoint = endpoint;
        this.username = username;
        this.password = password;
    }

    protected abstract String getTopic();
    protected abstract void payloadReceived(byte[] payload);

    public void connect() {
        if (connectionLost) {
            String clientid = "pc_stats_aggregator";
            int qos = 0;

            try {
                MqttClient client = new MqttClient(endpoint, clientid, new MemoryPersistence());
                // connect options
                MqttConnectOptions options = new MqttConnectOptions();
                options.setUserName(username);
                options.setPassword(password.toCharArray());
                options.setConnectionTimeout(60);
                options.setKeepAliveInterval(60);
                // setup callback
                client.setCallback(new MqttCallback() {
    
                    public void connectionLost(Throwable cause) {
                        connectionLost = true;
                        System.out.println(getTopic()+" topic connection lost: " + cause.getMessage());
                    }
    
                    public void messageArrived(String topic, MqttMessage message) {
                        payloadReceived(message.getPayload());
                    }
    
                    public void deliveryComplete(IMqttDeliveryToken token) {
                    }
    
                });
                
                client.connect(options);
                client.subscribe(getTopic(), qos);

                connectionLost = false;
            } catch (Exception e) {
                e.printStackTrace();
                connectionLost = true;
            }
        }
    }

    public boolean isConnectionLost() {
        return connectionLost;
    }

    public void setConnectionLost(boolean connectionLost) {
        this.connectionLost = connectionLost;
    }

}

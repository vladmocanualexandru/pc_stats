package mov.personal.pcstats.aggregator;

import java.net.UnknownHostException;
import java.time.Duration;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import com.profesorfalken.wmi4java.WMIException;

import mov.personal.pcstats.aggregator.custom_wmi.WMI4Java;

@SpringBootApplication
public class PcStatsAggregatorApplication {

	class AqirysPowerConsumptionTopic {
		private double value = -1;
		private boolean connectionLost = true;

		public void connect() {
			if (connectionLost) {
				String broker = "tcp://home.hub:1883";
				String topic = "sensor-out/aqirys-power-consumption";
				String username = "hass";
				String password = "MOCdRicjNlkAdPC0VFRhRfqR3fXvpIP5G6WDN9FF4NsmlowRMXkpoovhX1N6jRKedmDEqoVmeAHniCierVqDEXeUuuZDSpgK6U53jXtknnuHBjBTA1ade9Fgw3wMIIOH";
				String clientid = "pc_stats_aggregator";
				int qos = 0;

				try {
					MqttClient client = new MqttClient(broker, clientid, new MemoryPersistence());
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
							System.out.println("connectionLost: " + cause.getMessage());
						}
		
						public void messageArrived(String topic, MqttMessage message) {
							String payload = new String(message.getPayload());
							value = Double.parseDouble(payload);
						}
		
						public void deliveryComplete(IMqttDeliveryToken token) {
						}
		
					});
					
					client.connect(options);
					client.subscribe(topic, qos);

					connectionLost = false;
				} catch (Exception e) {
					e.printStackTrace();
					connectionLost = true;
				}
			}
		}
		
		public AqirysPowerConsumptionTopic(){
			connect();
		}

		public double getValue() {
			return value;
		}

		public void setValue(double value) {
			this.value = value;
		}
	}

	@Bean
	public AqirysPowerConsumptionTopic aqirysPowerConsumptionTopic(){
		return new AqirysPowerConsumptionTopic();
	}

	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.setConnectTimeout(Duration.ofMillis(3000)).setReadTimeout(Duration.ofMillis(3000)).build();
	}

	@Bean
	public WMI4Java wmiNamespace() {
		// return WMI4Java.get().VBSEngine().namespace("Root/WMI");
		return WMI4Java.get().namespace("Root/WMI");
	}

	public static void main(String[] args) throws WMIException, UnknownHostException {
		SpringApplication.run(PcStatsAggregatorApplication.class, args);
	}

}

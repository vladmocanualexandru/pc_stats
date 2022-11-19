package mov.personal.pcstats.aggregator;

import java.net.UnknownHostException;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import com.profesorfalken.wmi4java.WMIException;

import mov.personal.pcstats.aggregator.custom_wmi.WMI4Java;
import mov.personal.pcstats.aggregator.mqtt.AqirysPowerConsumptionTopic;

@SpringBootApplication
public class PcStatsAggregatorApplication {

	@Value("${mqtt.endpoint}")
    private String mqttEnpoint;

	@Value("${mqtt.username}")
    private String mqttUsername;

	@Value("${mqtt.password}")
    private String mqttPassword;

	@Bean
	public AqirysPowerConsumptionTopic aqirysPowerConsumptionTopic(){
		return new AqirysPowerConsumptionTopic(mqttEnpoint, mqttUsername, mqttPassword);
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

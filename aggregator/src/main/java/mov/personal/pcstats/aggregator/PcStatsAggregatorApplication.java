package mov.personal.pcstats.aggregator;

import java.net.UnknownHostException;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.DependsOn;
import org.springframework.web.client.RestTemplate;

import com.profesorfalken.wmi4java.WMIException;

import mov.personal.pcstats.aggregator.custom_wmi.WMI4Java;
import mov.personal.pcstats.aggregator.mqtt.AqirysPowerConsumptionTopic;
import mov.personal.pcstats.aggregator.mqtt.RandomValue1;
import mov.personal.pcstats.aggregator.mqtt.RandomValue2;
import mov.personal.pcstats.aggregator.mqtt.RandomValue3;
import mov.personal.pcstats.aggregator.mqtt.SingleValueListener;

@SpringBootApplication
public class PcStatsAggregatorApplication {
	
	@Value("${mqtt.endpoint}")
    private String mqttEnpoint;

	@Value("${mqtt.username}")
    private String mqttUsername;

	@Value("${mqtt.password}")
    private String mqttPassword;

	@Bean("aqirysPowerConsumptionTopic")
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

	@Bean("randomValue1")
	public RandomValue1 randomValue1(){
		return new RandomValue1();
	}
	
	@Bean("randomValue2")
	public RandomValue2 randomValue2(){
		return new RandomValue2();
	}
	
	@Bean("randomValue3")
	public RandomValue3 randomValue3(){
		return new RandomValue3();
	}

	@Autowired
    RandomValue1 randomValue1;

    @Autowired
    RandomValue2 randomValue2;

    @Autowired
    RandomValue3 randomValue3;
	
	@Autowired
	AqirysPowerConsumptionTopic aqirysPowerConsumptionTopic;
	
	@Bean
	@DependsOn({"aqirysPowerConsumptionTopic", "randomValue1", "randomValue2", "randomValue3"})
	public SingleValueListener singleValueListener() {
		SingleValueListener singleValueListener = new SingleValueListener(mqttEnpoint, mqttUsername, mqttPassword);
		
		singleValueListener.addTopic(aqirysPowerConsumptionTopic);

		// singleValueListener.addTopic(randomValue1);
		// singleValueListener.addTopic(randomValue2);
		// singleValueListener.addTopic(randomValue3);

		singleValueListener.connect();
		
		return singleValueListener;
	}
	
	public static void main(String[] args) throws WMIException, UnknownHostException {
		SpringApplication.run(PcStatsAggregatorApplication.class, args);
	}
	
}

package mov.personal.pcstats.aggregator;

import java.net.UnknownHostException;
import java.time.Duration;

import mov.personal.pcstats.aggregator.custom_wmi.WMI4Java;
import com.profesorfalken.wmi4java.WMIException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class PcStatsAggregatorApplication {

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

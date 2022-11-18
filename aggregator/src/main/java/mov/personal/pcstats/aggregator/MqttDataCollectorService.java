package mov.personal.pcstats.aggregator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mov.personal.pcstats.aggregator.PcStatsAggregatorApplication.AqirysPowerConsumptionTopic;
import mov.personal.pcstats.commons.SystemInfo;
import mov.personal.pcstats.commons.SystemStatus;

@Service
public class MqttDataCollectorService implements SystemDataCollector{

    @Autowired
    AqirysPowerConsumptionTopic aqirysPowerConsumptionTopic;

    @Override
    public void enrichSystemInfo(SystemInfo systemInfo) {
    }

    @Override
    public void enrichSystemStatus(SystemStatus systemStatus) {
        aqirysPowerConsumptionTopic.connect();
        
        systemStatus.setPowerConsumption(aqirysPowerConsumptionTopic.getValue());
    }
    
    // @Value("${ohwm.data.url}")
    // private String dataUrl;
    
    // @Autowired
    // private RestTemplate restTemplate;

    // public void enrichSystemInfo(SystemInfo systemInfo){
    //     String jsonString = restTemplate.getForObject(dataUrl, String.class);

    //     SystemInfoBuilder.fromOHWMJSON(systemInfo, jsonString);
    // }

    // public void enrichSystemStatus(SystemStatus status){
    //     String jsonString = restTemplate.getForObject(dataUrl, String.class);

    //     SystemStatusBuilder.fromOHWMJSON(status, jsonString);
    // }

}

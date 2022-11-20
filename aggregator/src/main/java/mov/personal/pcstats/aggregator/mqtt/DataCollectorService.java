package mov.personal.pcstats.aggregator.mqtt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mov.personal.pcstats.aggregator.SystemDataCollector;
import mov.personal.pcstats.commons.SystemInfo;
import mov.personal.pcstats.commons.SystemStatus;

@Service
public class DataCollectorService implements SystemDataCollector{

    @Autowired
    AqirysPowerConsumptionTopic aqirysPowerConsumptionTopic;
    
    @Autowired
    RandomValue1 randomValue1;

    @Autowired
    RandomValue2 randomValue2;

    @Autowired
    RandomValue3 randomValue3;
    
    @Override
    public void enrichSystemInfo(SystemInfo systemInfo) {
    }

    @Override
    public void enrichSystemStatus(SystemStatus systemStatus) {
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

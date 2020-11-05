package mov.personal.pcstats.aggregator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import mov.personal.pcstats.commons.SystemInfo;
import mov.personal.pcstats.commons.SystemStatus;

@Service
public class OHWMDataCollectorService implements SystemDataCollector{
    
    @Value("${ohwm.data.url}")
    private String dataUrl;
    
    @Autowired
    private RestTemplate restTemplate;

    public void enrichSystemInfo(SystemInfo systemInfo){
        String jsonString = restTemplate.getForObject(dataUrl, String.class);

        SystemInfoBuilder.fromOHWMJSON(systemInfo, jsonString);
    }

    public void enrichSystemStatus(SystemStatus status){
        String jsonString = restTemplate.getForObject(dataUrl, String.class);

        SystemStatusBuilder.fromOHWMJSON(status, jsonString);
    }

}

package mov.personal.pcstats.aggregator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import mov.personal.pcstats.commons.SystemInfo;
import mov.personal.pcstats.commons.SystemStatus;

@Service
public class OHWMDataCollectorService {
    
    @Value("${ohwm.data.url}")
    private String dataUrl;
    
    @Autowired
    private RestTemplate restTemplate;

    public SystemInfo getSystemInfo(){
        String jsonString = restTemplate.getForObject(dataUrl, String.class);

        return SystemInfoBuilder.fromOHWMJSON(jsonString);
    }

    public SystemStatus getSystemStatus(){
        String jsonString = restTemplate.getForObject(dataUrl, String.class);

        return SystemStatusBuilder.fromOHWMJSON(jsonString);
    }

}

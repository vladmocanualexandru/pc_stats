package mov.personal.pcstats.aggregator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OHWMDataCollectorService {
    
    @Autowired
    private RestTemplate restTemplate;

    public SystemInfo getSystemInfo(){
        final String uri = "http://192.168.1.71:8085/data.json";
 
        String jsonString = restTemplate.getForObject(uri, String.class);

        return SystemInfo.fromOHWMJSON(jsonString);
    }

}

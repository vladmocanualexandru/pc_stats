package mov.personal.pcstats.aggregator;

import org.springframework.stereotype.Service;

@Service
public class OHWMDataCollectorService {//implements SystemDataCollector{
    
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

package mov.personal.pcstats.client_html;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import mov.personal.pcstats.commons.SystemStatus;

@RestController
public class PollingController {

    @Value("${pcstats.aggregator.systemstatus.url}")
    String systemStatusInfoUrl;

    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/poll-system-stats")
    public SystemStatus pollStats(){
        SystemStatus status = restTemplate.getForObject(systemStatusInfoUrl, SystemStatus.class);

        return status;
    }

}

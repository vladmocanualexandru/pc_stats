package mov.personal.pcstats.client_html;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import mov.personal.pcstats.commons.SystemStatus;

@RestController
public class PollingController {

    @Value("${pcstats.aggregator.system-status-url}")
    String systemStatusInfoUrl;

    @Value("${pcstats.client-html.mock-data.enabled}")
    Boolean useMockDataOnUi;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    MockDataBuilder mockBuilder;

    @GetMapping("/poll-system-stats")
    public SystemStatus pollStats(HttpSession session){
        SystemStatus status = new SystemStatus();
        
        if (!useMockDataOnUi){
            status = restTemplate.getForObject(systemStatusInfoUrl, SystemStatus.class);
        } else {
            //check for mock system status seed
            status = session.getAttribute("mockSystemStatusSeed")!=null?mockBuilder.buildStatus((SystemStatus)session.getAttribute("mockSystemStatusSeed")):mockBuilder.buildStatus();

            //update mock system status seed
            session.setAttribute("mockSystemStatusSeed", status);
        }

        return status;
    }

}

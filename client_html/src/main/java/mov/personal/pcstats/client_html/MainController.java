package mov.personal.pcstats.client_html;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import mov.personal.pcstats.commons.SystemInfo;

@Controller
public class MainController {
    
    @Value("${pcstats.aggregator.systeminfo.url}")
    String systemInfoUrl;

    @Value("${pcstats.client-html.ui.mock-data.enabled}")
    Boolean useMockDataOnUi;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    MockDataBuilder mockBuilder;

    @GetMapping("/")
    public String showIndex(Model model){

        SystemInfo systemInfo = new SystemInfo();
        
        if (!useMockDataOnUi) {
            systemInfo = restTemplate.getForObject(systemInfoUrl, SystemInfo.class);
        } else {
            systemInfo = mockBuilder.buildInfo();
        }
        
        model.addAttribute("systemInfo", systemInfo);
        model.addAttribute("currentTime", new Date());
        
        return "index";
    }
    
    @GetMapping("/lite")
    public String showLiteIndex(Model model){
        
        SystemInfo systemInfo = new SystemInfo();
        
        if (!useMockDataOnUi) {
            systemInfo = restTemplate.getForObject(systemInfoUrl, SystemInfo.class);
        } else {
            systemInfo = mockBuilder.buildInfo();
        }

        model.addAttribute("systemInfo", systemInfo);
        model.addAttribute("currentTime", new Date());

        return "index_lite";
    }

}

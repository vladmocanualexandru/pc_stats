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

    @Value("${pcstats.client-html.ui.use-mock-data}")
    Boolean useMockDataOnUi;

    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/")
    public String showIndex(Model model){

        SystemInfo systemInfo = new SystemInfo();
        
        if (!useMockDataOnUi) {
            restTemplate.getForObject(systemInfoUrl, SystemInfo.class);
        } else {
            systemInfo.setCpuName("TEST CPU (use-mock-data=true)");
            systemInfo.setGpuName("TEST GPU (use-mock-data=true)");
            systemInfo.setPcName("TEST PC (use-mock-data=true)");
            systemInfo.setNoCpuCores(4);
        }

        model.addAttribute("systemInfo", systemInfo);
        model.addAttribute("currentTime", new Date());

        return "index";
    }

}

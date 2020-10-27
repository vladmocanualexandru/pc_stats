package mov.personal.pcstats.client_html;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

@Controller
public class MainController {
    
    @Value("${pcstats.aggregator.systeminfo.url}")
    String systemInfoUrl;

    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/")
    public String showIndex(Model model){

        String systemInfo = restTemplate.getForObject(systemInfoUrl, String.class);

        model.addAttribute("systemInfo", systemInfo);
        model.addAttribute("currentTime", new Date());

        return "index";
    }

}

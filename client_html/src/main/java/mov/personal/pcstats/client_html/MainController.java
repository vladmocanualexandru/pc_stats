package mov.personal.pcstats.client_html;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

@Controller
public class MainController {
    
    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/")
    public String showIndex(Model model){

        final String uri = "http://localhost:5000/pcstats_aggregator/get-system-info";
 
        String systemInfo = restTemplate.getForObject(uri, String.class);

        model.addAttribute("systemInfo", systemInfo);
        model.addAttribute("currentTime", new Date());

        return "index";
    }

}

package mov.personal.pcstats.client;

import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    
    @GetMapping("/")
    public String showIndex(Model model){
        
        String[] toys = {"beach ball","toycar", "teddybear"};
        
        model.addAttribute("currentTime", new Date());
        model.addAttribute("toys", toys);

        return "index";
    }

}

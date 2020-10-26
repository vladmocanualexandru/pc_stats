package mov.personal.pcstats.aggregator;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataController {

 
    @GetMapping("/data")
    public String getSystemData(){
        return "OK";
    }


}

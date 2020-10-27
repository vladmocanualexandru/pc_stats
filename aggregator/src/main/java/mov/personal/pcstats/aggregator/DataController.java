package mov.personal.pcstats.aggregator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataController {

    @Autowired
    private OHWMDataCollectorService ohwmDataCollectorService;
 
    @GetMapping("/get-system-info")
    public SystemInfo getSystemInfo(){
        return ohwmDataCollectorService.getSystemInfo();
    }


}

package mov.personal.pcstats.aggregator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import mov.personal.pcstats.commons.SystemInfo;
import mov.personal.pcstats.commons.SystemStatus;

@RestController
public class DataController {

    @Autowired
    private OHWMDataCollectorService ohwmDataCollectorService;
 
    @CrossOrigin
    @GetMapping("/get-system-info")
    public SystemInfo getSystemInfo(){
        return ohwmDataCollectorService.getSystemInfo();
    }

    @CrossOrigin
    @GetMapping("/get-system-status")
    public SystemStatus getSystemStatus(){
        return ohwmDataCollectorService.getSystemStatus();
    }


}

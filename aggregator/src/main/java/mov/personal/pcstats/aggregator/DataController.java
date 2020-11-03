package mov.personal.pcstats.aggregator;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import mov.personal.pcstats.commons.SystemInfo;
import mov.personal.pcstats.commons.SystemStatus;

@RestController
public class DataController {

    private static SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");

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
        SystemStatus status = new SystemStatus();
        try {
            status = ohwmDataCollectorService.getSystemStatus();
        } catch(Exception e) {
            System.out.println("Error while parsing OHWM data");
        }
        status.setTime(sdf.format(new Date()));

        return status;
    }


}

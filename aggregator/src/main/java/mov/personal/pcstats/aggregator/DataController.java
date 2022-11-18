package mov.personal.pcstats.aggregator;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import mov.personal.pcstats.commons.SystemStatus;

@RestController
public class DataController {

    private static SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");

    // @Autowired
    // private OHWMDataCollectorService ohwmCollectorService;

    @Autowired
    private AIDA64DataCollectorService aida64CollectorService;

    @Autowired
    private MqttDataCollectorService mqttDataCollectorService;
 
    // @CrossOrigin
    // @GetMapping("/get-system-info")
    // public SystemInfo getSystemInfo(){
    //     SystemInfo systemInfo = new SystemInfo();
        
    //     ohwmCollectorService.enrichSystemInfo(systemInfo);

    //     return systemInfo;
    // }

    @CrossOrigin
    @GetMapping("/get-system-status")
    public SystemStatus getSystemStatus(){
        SystemStatus status = new SystemStatus();

        // try {
        //     ohwmCollectorService.enrichSystemStatus(status);
        // } catch(Exception e) {
        //     System.out.println("Error while parsing OHWM data");
        //     e.printStackTrace();
        // }

        try {
            aida64CollectorService.enrichSystemStatus(status);
        } catch(Exception e) {
            System.out.println("Error while parsing AIDA64 data");
			e.printStackTrace();
        }

        try {
            mqttDataCollectorService.enrichSystemStatus(status);
        } catch(Exception e) {
            System.out.println("Error while parsing Mqtt data");
			e.printStackTrace();
        }

        status.setTimeFromStringArray(sdf.format(new Date()).split(":"));

        return status;
    }

}

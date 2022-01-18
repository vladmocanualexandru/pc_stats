package mov.personal.pcstats.aggregator;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mov.personal.pcstats.aggregator.custom_wmi.WMI4Java;
import mov.personal.pcstats.commons.SystemInfo;
import mov.personal.pcstats.commons.SystemStatus;

@Service
public class AIDA64DataCollectorService implements SystemDataCollector {

    @Autowired
    private WMI4Java wmiNamespace;

	@Override
	public void enrichSystemInfo(SystemInfo systemInfo) {}

    @Override
    public void enrichSystemStatus(SystemStatus systemStatus) {
       Map<String,String> parsedData = parseData(wmiNamespace.getWMIObjectList("AIDA64_SensorValues"));

       String fcpu = parsedData.get("FCPU");
       String fcha1 = parsedData.get("FCHA1");
       String fcha2 = parsedData.get("FCHA2");
       String sfraps = parsedData.get("SFRAPS");
       String smemuti = parsedData.get("SMEMUTI");

       if (fcpu != null) systemStatus.setCpuFan(Integer.parseInt(fcpu));
       if (fcha1 != null) systemStatus.setCha1Fan(Integer.parseInt(fcha1));
       if (fcha2 != null) systemStatus.setCha2Fan(Integer.parseInt(fcha2));
       if (sfraps != null) systemStatus.setFps(Integer.parseInt(sfraps));
       if (smemuti != null) systemStatus.setRamLoad(Double.parseDouble(smemuti));
    }

    private Map<String, String> parseData(List<Map<String,String>> wmiData){
        Map<String,String> parsedData = new HashMap<>();

        for (Map<String,String> map : wmiData) {
            parsedData.put(map.get("ID"), map.get("Value"));
        }

        return parsedData;
    }

}

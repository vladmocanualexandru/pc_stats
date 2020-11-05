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
	public void enrichSystemInfo(SystemInfo systemInfo) {
		// TODO Auto-generated method stub
	}

    @Override
    public void enrichSystemStatus(SystemStatus systemStatus) {
       Map<String,String> parsedData = parseData(wmiNamespace.getWMIObjectList("AIDA64_SensorValues"));

       systemStatus.setCpuFan(Integer.parseInt(parsedData.get("FCPU")));
       systemStatus.setCha1Fan(Integer.parseInt(parsedData.get("FCHA1")));
       systemStatus.setCha2Fan(Integer.parseInt(parsedData.get("FCHA2")));
       systemStatus.setFps(Integer.parseInt(parsedData.get("SFRAPS")));
    }

    private Map<String, String> parseData(List<Map<String,String>> wmiData){
        Map<String,String> parsedData = new HashMap<>();

        for (Map<String,String> map : wmiData) {
            parsedData.put(map.get("ID"), map.get("Value"));
        }

        return parsedData;
    }

}

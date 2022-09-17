package mov.personal.pcstats.aggregator;

import java.util.ArrayList;
import java.util.Collections;
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

       String sfraps = parsedData.get("SFRAPS");
       String smemuti = parsedData.get("SMEMUTI");
       String scpuuti = parsedData.get("SCPUUTI");
       String tcpu = parsedData.get("TCPU");
       String tgpu = parsedData.get("TGPU1");
       
       String sgpu1uti = parsedData.get("SGPU1UTI");
       String sgpu1biuti = parsedData.get("SGPU1BIUTI");
       String sgpu1mcuti = parsedData.get("SGPU1MCUTI");
       String sgpu1veuti = parsedData.get("SGPU1VEUTI");

       List<String> keys = new ArrayList<String>(parsedData.keySet());
       Collections.sort(keys);

       if (sfraps != null) systemStatus.setFps(Integer.parseInt(sfraps));
       if (smemuti != null) systemStatus.setRamLoad(Double.parseDouble(smemuti));
       if (scpuuti != null) systemStatus.setCpuLoad(Double.parseDouble(scpuuti));
       if (tcpu != null) systemStatus.setCpuTemp(Double.parseDouble(tcpu));
       if (tgpu != null) systemStatus.setGpuTemp(Double.parseDouble(tgpu));

       if (sgpu1uti != null) systemStatus.setGpuLoadCore(Double.parseDouble(sgpu1uti));
       if (sgpu1biuti != null) systemStatus.setGpuLoadBusInterface(Double.parseDouble(sgpu1biuti));
       if (sgpu1mcuti != null) systemStatus.setGpuLoadMemory(Double.parseDouble(sgpu1mcuti));
       if (sgpu1veuti != null) systemStatus.setGpuLoadVideoEngine(Double.parseDouble(sgpu1veuti));
    }

    private Map<String, String> parseData(List<Map<String,String>> wmiData){
        Map<String,String> parsedData = new HashMap<>();

        for (Map<String,String> map : wmiData) {
            parsedData.put(map.get("ID"), map.get("Value"));
        }

        return parsedData;
    }

}

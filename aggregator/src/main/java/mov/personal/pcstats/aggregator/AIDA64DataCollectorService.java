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

       String fcpu = parsedData.get("FCPU");
       String fgpu = parsedData.get("FGPU1");
       
       String sgpu1uti = parsedData.get("SGPU1UTI");
       String sgpu1mcuti = parsedData.get("SGPU1MCUTI");

       String snic2dlrate = parsedData.get("SNIC2DLRATE");
       String snic2ulrate = parsedData.get("SNIC2ULRATE");

       String tmobo = parsedData.get("TMOBO");
       String tchip = parsedData.get("TCHIP");
       String thdd1 = parsedData.get("THDD1");
       String thdd2 = parsedData.get("THDD2");
       String thdd1ts2 = parsedData.get("THDD1TS2");
       String thdd2ts2 = parsedData.get("THDD2TS2");

       List<String> keys = new ArrayList<String>(parsedData.keySet());
       Collections.sort(keys);

       if (sfraps != null) systemStatus.setFps(Integer.parseInt(sfraps));
       if (smemuti != null) systemStatus.setRamLoad(Double.parseDouble(smemuti));
       if (scpuuti != null) systemStatus.setCpuLoad(Double.parseDouble(scpuuti));
       if (tcpu != null) systemStatus.setCpuTemp(Double.parseDouble(tcpu));
       if (tgpu != null) systemStatus.setGpuTemp(Double.parseDouble(tgpu));

       if (fcpu != null) systemStatus.setCpuFan(Integer.parseInt(fcpu));
       if (fgpu != null) systemStatus.setGpuFan(Integer.parseInt(fgpu));

       if (sgpu1uti != null) systemStatus.setGpuLoadCore(Double.parseDouble(sgpu1uti));
       if (sgpu1mcuti != null) systemStatus.setGpuLoadMemory(Double.parseDouble(sgpu1mcuti));

       if (snic2dlrate != null) systemStatus.setBandwidthDownRate(Double.parseDouble(snic2dlrate));
       if (snic2ulrate != null) systemStatus.setBandwidthUpRate(Double.parseDouble(snic2ulrate)); 

       if (tmobo != null) systemStatus.setMoboTemp(Double.parseDouble(tmobo)); 
       if (tchip != null) systemStatus.setChipsetTemp(Double.parseDouble(tchip)); 

       if (thdd1 != null) systemStatus.setSsd1Temp1(Double.parseDouble(thdd1)); 
       if (thdd2 != null) systemStatus.setSsd2Temp1(Double.parseDouble(thdd2)); 

       if (thdd1ts2 != null) systemStatus.setSsd1Temp2(Double.parseDouble(thdd1ts2)); 
       if (thdd2ts2 != null) systemStatus.setSsd2Temp2(Double.parseDouble(thdd2ts2)); 
    }

    private Map<String, String> parseData(List<Map<String,String>> wmiData){
        Map<String,String> parsedData = new HashMap<>();

        for (Map<String,String> map : wmiData) {
            parsedData.put(map.get("ID"), map.get("Value"));
        }

        return parsedData;
    }

}

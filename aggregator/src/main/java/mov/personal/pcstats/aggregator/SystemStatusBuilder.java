package mov.personal.pcstats.aggregator;

import org.json.JSONArray;
import org.json.JSONObject;

import mov.personal.pcstats.commons.SystemStatus;

public class SystemStatusBuilder {
    public static SystemStatus fromOHWMJSON(String jsonString){
        SystemStatus result = new SystemStatus();

        JSONObject jsonObject = new JSONObject(jsonString);
        JSONObject rootObject = jsonObject.getJSONArray("Children").getJSONObject(0);
        JSONObject cpuObject = rootObject.getJSONArray("Children").getJSONObject(1);
        JSONObject ramObject = rootObject.getJSONArray("Children").getJSONObject(2); 
        JSONObject gpuObject = rootObject.getJSONArray("Children").getJSONObject(3); 

        JSONArray cpuLoads = cpuObject.getJSONArray("Children").getJSONObject(2).getJSONArray("Children");
        result.setCpuLoad(Float.parseFloat(cpuLoads.getJSONObject(0).getString("Value").replace(" %", "")));
        for (int i = 0; i < 8; i++) {
            result.getCpuCoreLoads()[i] = Float.parseFloat(cpuLoads.getJSONObject(i+1).getString("Value").replace(" %", ""));
        }

        String cpuTempStringValue = cpuObject.getJSONArray("Children").getJSONObject(1).getJSONArray("Children").getJSONObject(0).getString("Value");
        result.setCpuTemp(Float.parseFloat(cpuTempStringValue.subSequence(0,cpuTempStringValue.length()-3).toString()));

        result.setWatts(Float.parseFloat(cpuObject.getJSONArray("Children").getJSONObject(3).getJSONArray("Children").getJSONObject(0).getString("Value").replace(" W","")));

        result.setGpuLoadCore(Float.parseFloat(gpuObject.getJSONArray("Children").getJSONObject(2).getJSONArray("Children").getJSONObject(0).getString("Value").replace(" %", "")));
        result.setGpuLoadMemory(Float.parseFloat(gpuObject.getJSONArray("Children").getJSONObject(2).getJSONArray("Children").getJSONObject(4).getString("Value").replace(" %", "")));

        String gpuTempString = gpuObject.getJSONArray("Children").getJSONObject(1).getJSONArray("Children").getJSONObject(0).getString("Value");
        result.setGpuTemp(Float.parseFloat(gpuTempString.subSequence(0,gpuTempString.length()-3).toString()));
        
        result.setGpuFan(Float.parseFloat(gpuObject.getJSONArray("Children").getJSONObject(3).getJSONArray("Children").getJSONObject(0).getString("Value").replace(" RPM","")));
        result.setWatts(result.getWatts()+Float.parseFloat(gpuObject.getJSONArray("Children").getJSONObject(5).getJSONArray("Children").getJSONObject(0).getString("Value").replace(" W","")));
        
        String ramLoadStringValue = ramObject.getJSONArray("Children").getJSONObject(0).getJSONArray("Children").getJSONObject(0).getString("Value");
        result.setRamLoad(Float.parseFloat(ramLoadStringValue.replace(" %", "")));

        return result;
    }
}

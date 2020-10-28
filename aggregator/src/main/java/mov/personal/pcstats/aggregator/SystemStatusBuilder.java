package mov.personal.pcstats.aggregator;

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

        String cpuStringValue = cpuObject.getJSONArray("Children").getJSONObject(2).getJSONArray("Children").getJSONObject(0).getString("Value");
        String gpuStringValue = gpuObject.getJSONArray("Children").getJSONObject(2).getJSONArray("Children").getJSONObject(0).getString("Value");
        String ramStringValue = ramObject.getJSONArray("Children").getJSONObject(0).getJSONArray("Children").getJSONObject(0).getString("Value");

        result.setCpuLoad(Float.parseFloat(cpuStringValue.replace(" %", "")));
        result.setGpuLoad(Float.parseFloat(gpuStringValue.replace(" %", "")));
        result.setRamLoad(Float.parseFloat(ramStringValue.replace(" %", "")));

        return result;
    }
}

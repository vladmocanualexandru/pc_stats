package mov.personal.pcstats.aggregator;

import org.json.JSONObject;
import mov.personal.pcstats.commons.SystemInfo;

public class SystemInfoBuilder {
    public static SystemInfo fromOHWMJSON(String jsonString){
        SystemInfo result = new SystemInfo();

        JSONObject jsonObject = new JSONObject(jsonString);
        JSONObject rootObject = jsonObject.getJSONArray("Children").getJSONObject(0);
        JSONObject cpuObject = rootObject.getJSONArray("Children").getJSONObject(1);
        JSONObject gpuObject = rootObject.getJSONArray("Children").getJSONObject(3);

        result.setPcName(rootObject.getString("Text"));
        result.setCpuName(cpuObject.getString("Text"));
        
        result.setNoCpuCores(cpuObject
            .getJSONArray("Children")
            .getJSONObject(0)
            .getJSONArray("Children").length() - 1);

        result.setGpuName(gpuObject.getString("Text"));

        return result;
    }
}

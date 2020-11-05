package mov.personal.pcstats.aggregator;

import org.json.JSONObject;
import mov.personal.pcstats.commons.SystemInfo;

public class SystemInfoBuilder {
    public static void fromOHWMJSON(SystemInfo systemInfo, String jsonString){
        JSONObject jsonObject = new JSONObject(jsonString);
        JSONObject rootObject = jsonObject.getJSONArray("Children").getJSONObject(0);
        JSONObject cpuObject = rootObject.getJSONArray("Children").getJSONObject(1);
        JSONObject gpuObject = rootObject.getJSONArray("Children").getJSONObject(3);

        systemInfo.setPcName(rootObject.getString("Text"));
        systemInfo.setCpuName(cpuObject.getString("Text"));
        
        systemInfo.setNoCpuCores(cpuObject
            .getJSONArray("Children")
            .getJSONObject(0)
            .getJSONArray("Children").length() - 1);

        systemInfo.setGpuName(gpuObject.getString("Text"));
    }
}

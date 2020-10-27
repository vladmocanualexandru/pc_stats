package mov.personal.pcstats.aggregator;

import org.json.JSONObject;

public class SystemInfo {
    private String pcName, cpuName, gpuName;
    private Integer noCpuCores;

    private SystemInfo(){}

    public String getCpuName() {
        return cpuName;
    }

    public void setCpuName(String cpuName) {
        this.cpuName = cpuName;
    }

    public String getGpuName() {
        return gpuName;
    }

    public void setGpuName(String gpuName) {
        this.gpuName = gpuName;
    }

    public Integer getNoCpuCores() {
        return noCpuCores;
    }

    public void setNoCpuCores(Integer noCpuCores) {
        this.noCpuCores = noCpuCores;
    }

    public String getPcName() {
        return pcName;
    }

    public void setPcName(String pcName) {
        this.pcName = pcName;
    }
    

    public static SystemInfo fromOHWMJSON(String jsonString){
        SystemInfo result = new SystemInfo();

        JSONObject jsonObject = new JSONObject(jsonString);
        JSONObject rootObject = jsonObject.getJSONArray("Children").getJSONObject(0);
        JSONObject cpuObject = rootObject.getJSONArray("Children").getJSONObject(1);
        JSONObject gpuObject = rootObject.getJSONArray("Children").getJSONObject(3);

        result.pcName = rootObject.getString("Text");
        result.cpuName = cpuObject.getString("Text");
        
        result.noCpuCores = cpuObject
            .getJSONArray("Children")
            .getJSONObject(0)
            .getJSONArray("Children").length() - 1;

        result.gpuName = gpuObject.getString("Text");

        return result;
    }

    
}

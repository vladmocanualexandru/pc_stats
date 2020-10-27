package mov.personal.pcstats.commons;

public class SystemInfo {
    private String pcName, cpuName, gpuName;
    private Integer noCpuCores;

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

    @Override
    public String toString() {
        return "SystemInfo [cpuName=" + cpuName + ", gpuName=" + gpuName + ", noCpuCores=" + noCpuCores + ", pcName="
                + pcName + "]";
    }

    
}
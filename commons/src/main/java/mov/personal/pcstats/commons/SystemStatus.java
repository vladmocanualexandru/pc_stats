package mov.personal.pcstats.commons;

public class SystemStatus {
    private double cpuLoad, gpuLoadCore, gpuLoadMemory, ramLoad, cpuTemp, gpuTemp, cpuFan, gpuFan, gpuMemory, watts;
    private double[] cpuCoreLoads = {-1f,-1f,-1f,-1f,-1f,-1f,-1f,-1f};

    public SystemStatus() {
        this.cpuLoad = -1f;
        this.gpuLoadCore = -1f;
        this.gpuLoadMemory = -1f;
        this.ramLoad = -1f;
        this.cpuTemp = -1f;
        this.gpuTemp = -1f;
        this.cpuFan = -1f;
        this.gpuFan = -1f;
        this.gpuMemory = -1f;
        this.watts = -1f;
    }

    public double getCpuLoad() {
        return cpuLoad;
    }

    public void setCpuLoad(double cpuLoad) {
        this.cpuLoad = cpuLoad;
    }

    public double getRamLoad() {
        return ramLoad;
    }

    public void setRamLoad(double ramLoad) {
        this.ramLoad = ramLoad;
    }

    public double getCpuTemp() {
        return cpuTemp;
    }

    public void setCpuTemp(double cpuTemp) {
        this.cpuTemp = cpuTemp;
    }

    public double getGpuTemp() {
        return gpuTemp;
    }

    public void setGpuTemp(double gpuTemp) {
        this.gpuTemp = gpuTemp;
    }

    public double getCpuFan() {
        return cpuFan;
    }

    public void setCpuFan(double cpuFan) {
        this.cpuFan = cpuFan;
    }

    public double getGpuFan() {
        return gpuFan;
    }

    public void setGpuFan(double gpuFan) {
        this.gpuFan = gpuFan;
    }

    public double getGpuMemory() {
        return gpuMemory;
    }

    public void setGpuMemory(double gpuMemory) {
        this.gpuMemory = gpuMemory;
    }

    public double getWatts() {
        return watts;
    }

    public void setWatts(double watts) {
        this.watts = watts;
    }

    public double getGpuLoadCore() {
        return gpuLoadCore;
    }

    public void setGpuLoadCore(double gpuLoadCore) {
        this.gpuLoadCore = gpuLoadCore;
    }

    public double getGpuLoadMemory() {
        return gpuLoadMemory;
    }

    public void setGpuLoadMemory(double gpuLoadMemory) {
        this.gpuLoadMemory = gpuLoadMemory;
    }

    public double[] getCpuCoreLoads() {
        return cpuCoreLoads;
    }

    public void setCpuCoreLoads(double[] cpuCoreLoads) {
        this.cpuCoreLoads = cpuCoreLoads;
    }
    
}

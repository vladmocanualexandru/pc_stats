package mov.personal.pcstats.commons;

public class SystemStatus {
    private double gpuLoadCore, gpuLoadMemory, gpuLoadVideoEngine, gpuLoadBusInterface;
    private double cpuLoad, ramLoad, cpuTemp, gpuTemp;
    private int fps = -1;
    private int[] time = {-1,-1,-1};

    public SystemStatus() {
        this.cpuLoad = -1f;
        this.gpuLoadCore = -1f;
        this.gpuLoadMemory = -1f;
        this.gpuLoadVideoEngine = -1f;
        this.gpuLoadBusInterface = -1f;
        this.ramLoad = -1f;
        this.cpuTemp = -1f;
        this.gpuTemp = -1f;
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

    public int getFps() {
        return fps;
    }

    public void setFps(int fps) {
        this.fps = fps;
    }

    public int[] getTime() {
        return time;
    }

    public void setTime(int[] time) {
        this.time = time;
    }

    public double getGpuLoadVideoEngine() {
        return gpuLoadVideoEngine;
    }

    public void setGpuLoadVideoEngine(double gpuLoadVideoEngine) {
        this.gpuLoadVideoEngine = gpuLoadVideoEngine;
    }

    public double getGpuLoadBusInterface() {
        return gpuLoadBusInterface;
    }

    public void setGpuLoadBusInterface(double gpuLoadBusInterface) {
        this.gpuLoadBusInterface = gpuLoadBusInterface;
    }

    public void setTimeFromStringArray(String[] time) {
        this.time[0] = Integer.parseInt(time[0]);
        this.time[1] = Integer.parseInt(time[1]);
        this.time[2] = Integer.parseInt(time[2]);
    }
    
}

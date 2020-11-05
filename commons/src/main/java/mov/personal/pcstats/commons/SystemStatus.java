package mov.personal.pcstats.commons;

public class SystemStatus {
    private double cpuLoad, gpuLoadCore, gpuLoadMemory, ramLoad, cpuTemp, gpuTemp, gpuMemory, watts;
    private int cpuFan, gpuFan, cha1Fan, cha2Fan, fps;
    private double[] cpuCoreLoads = {-1f,-1f,-1f,-1f,-1f,-1f,-1f,-1f};
    private String time = "-1:-1:-1";

    public SystemStatus() {
        this.cpuLoad = -1f;
        this.gpuLoadCore = -1f;
        this.gpuLoadMemory = -1f;
        this.ramLoad = -1f;
        this.cpuTemp = -1f;
        this.gpuTemp = -1f;
        this.cpuFan = -1;
        this.cha1Fan = -1;
        this.cha2Fan = -1;
        this.gpuFan = -1;
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getCpuFan() {
        return cpuFan;
    }

    public void setCpuFan(int cpuFan) {
        this.cpuFan = cpuFan;
    }

    public int getGpuFan() {
        return gpuFan;
    }

    public void setGpuFan(int gpuFan) {
        this.gpuFan = gpuFan;
    }

    public int getCha1Fan() {
        return cha1Fan;
    }

    public void setCha1Fan(int cha1Fan) {
        this.cha1Fan = cha1Fan;
    }

    public int getCha2Fan() {
        return cha2Fan;
    }

    public void setCha2Fan(int cha2Fan) {
        this.cha2Fan = cha2Fan;
    }

    public int getFps() {
        return fps;
    }

    public void setFps(int fps) {
        this.fps = fps;
    }

    
    
}

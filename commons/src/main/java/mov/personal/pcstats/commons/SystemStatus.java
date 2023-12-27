package mov.personal.pcstats.commons;

public class SystemStatus {
    private double gpuLoadCore, gpuLoadMemory;
    private double cpuLoad, ramLoad, cpuTemp, gpuTemp;
    private double moboTemp, chipsetTemp;
    private double ssd1Temp1, ssd1Temp2;
    private double ssd2Temp1, ssd2Temp2;
    private double powerConsumption;
    private double bandwidthDownRate, bandwidthUpRate;
    private int cpuFan, gpuFan;
    private int fps = -1;
    private int[] time = {-1,-1,-1};

    public SystemStatus() {
        this.cpuLoad = -1f;
        this.gpuLoadCore = -1f;
        this.gpuLoadMemory = -1f;
        this.ramLoad = -1f;
        this.cpuTemp = -1f;
        this.gpuTemp = -1f;
        this.bandwidthDownRate = -1f;
        this.bandwidthUpRate = -1f;
        this.powerConsumption = -1f;
        this.moboTemp = -1f;
        this.chipsetTemp = -1f;
        this.ssd1Temp1 = -1f;
        this.ssd1Temp2 = -1f;
        this.ssd2Temp1 = -1f;
        this.ssd2Temp2 = -1f;
        this.cpuFan = -1;
        this.gpuFan = -1;
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

    public double getMoboTemp() {
        return moboTemp;
    }

    public void setMoboTemp(double moboTemp) {
        this.moboTemp = moboTemp;
    }

    public double getChipsetTemp() {
        return chipsetTemp;
    }

    public void setChipsetTemp(double chipsetTemp) {
        this.chipsetTemp = chipsetTemp;
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

    public double getPowerConsumption() {
        return powerConsumption;
    }

    public void setPowerConsumption(double powerConsumption) {
        this.powerConsumption = powerConsumption;
    }

    
    
    public double getBandwidthDownRate() {
        return bandwidthDownRate;
    }

    public void setBandwidthDownRate(double bandwidthDownRate) {
        this.bandwidthDownRate = bandwidthDownRate;
    }

    public double getBandwidthUpRate() {
        return bandwidthUpRate;
    }

    public void setBandwidthUpRate(double bandwidthUpRate) {
        this.bandwidthUpRate = bandwidthUpRate;
    }

    public void setTimeFromStringArray(String[] time) {
        this.time[0] = Integer.parseInt(time[0]);
        this.time[1] = Integer.parseInt(time[1]);
        this.time[2] = Integer.parseInt(time[2]);
    }

    public double getSsd1Temp1() {
        return ssd1Temp1;
    }

    public void setSsd1Temp1(double ssd1Temp1) {
        this.ssd1Temp1 = ssd1Temp1;
    }

    public double getSsd1Temp2() {
        return ssd1Temp2;
    }

    public void setSsd1Temp2(double ssd1Temp2) {
        this.ssd1Temp2 = ssd1Temp2;
    }

    public double getSsd2Temp1() {
        return ssd2Temp1;
    }

    public void setSsd2Temp1(double ssd2Temp1) {
        this.ssd2Temp1 = ssd2Temp1;
    }

    public double getSsd2Temp2() {
        return ssd2Temp2;
    }

    public void setSsd2Temp2(double ssd2Temp2) {
        this.ssd2Temp2 = ssd2Temp2;
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
    
}

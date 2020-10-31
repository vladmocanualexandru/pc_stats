export default class SystemStatus{
    constructor(
        public cpuLoad:number,
        public gpuLoadCore:number,
        public gpuLoadMemory:number,
        public ramLoad:number,
        public cpuTemp:number,
        public gpuTemp:number,
        public cpuFan:number,
        public gpuFan:number,
        public gpuMemory:number,
        public watts:number,
        public cpuCoreLoads:Array<number>
    ){}
}
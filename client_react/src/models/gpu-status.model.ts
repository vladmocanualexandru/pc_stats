export default class GpuStatus{
    constructor(
        public gpuName:string,
        public gpuLoadCore:number,
        public gpuLoadMemory:number,
        public gpuTemp:number,
        public gpuFan:number,
        public gpuMemory:number
    ){}
}
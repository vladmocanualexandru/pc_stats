export default class CpuStatus{
    constructor(
        public cpuName:string,
        public cpuLoad:number,
        public cpuTemp:number,
        public cpuFan:number,
        public cpuCoreLoads:Array<number>
    ){}
}
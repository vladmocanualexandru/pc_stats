import React from 'react';
import SystemStatus from '../../../models/system-status.model';
import SystemInfo from '../../../models/system-info.model';
import "./info-frame.css";
import CpuInfo from "../cpu-info/cpu-info.component";
import GpuInfo from "../gpu-info/gpu-info.component";
import PcInfo from "../pc-info/pc-info.component";
import PcStatus from '../../../models/pc-status.model';
import CpuStatus from '../../../models/cpu-status.model';
import GpuStatus from '../../../models/gpu-status.model';

class InfoFrame extends React.Component<{systemInfo:SystemInfo, systemStatus:SystemStatus},{
    pcStatus:PcStatus|undefined,
    cpuStatus:CpuStatus|undefined,
    gpuStatus:GpuStatus|undefined
}> {
  constructor(props:any) {
    super(props);
    this.state={
        pcStatus:undefined,
        cpuStatus:undefined,
        gpuStatus:undefined
    }
  }

  async componentDidMount(){
    this.setState({
        pcStatus:new PcStatus(
            this.props.systemInfo.pcName,
            this.props.systemStatus.watts,
            this.props.systemStatus.ramLoad
        ),
        cpuStatus: new CpuStatus(
            this.props.systemInfo.cpuName,
            this.props.systemStatus.cpuLoad,
            this.props.systemStatus.cpuTemp,
            this.props.systemStatus.cpuFan,
            this.props.systemStatus.cpuCoreLoads
        ),
        gpuStatus: new GpuStatus(
            this.props.systemInfo.gpuName,
            this.props.systemStatus.gpuLoadCore,
            this.props.systemStatus.gpuLoadMemory,
            this.props.systemStatus.gpuTemp,
            this.props.systemStatus.gpuFan,
            this.props.systemStatus.gpuMemory
        )
    })
  }

  render(){
      return (
          <div className="InfoFrame">
              <div className="Header">
                <PcInfo pcStatus={this.state.pcStatus!}/>
              </div>
              <div className="BodyFrame">
                <div className="CpuInfo">
                    <CpuInfo cpuStatus={this.state.cpuStatus!}/>
                </div>
                <div className="GpuInfo">
                    <GpuInfo gpuStatus={this.state.gpuStatus!}/>
                </div>
              </div>
          </div>
      );
  }
  
}

export default InfoFrame;

import React from 'react';
import CpuStatus from '../../../models/cpu-status.model';
import "./cpu-info.css";

class CpuInfo extends React.Component<{cpuStatus:CpuStatus},{
}> {
  constructor(props:any) {
    super(props);
  }

  async componentDidMount(){  }

  render(){
      return (
        <div className="CpuInfo">
          {`${JSON.stringify(this.props.cpuStatus)};`}
        </div>
      );

  }
  
}

export default CpuInfo;

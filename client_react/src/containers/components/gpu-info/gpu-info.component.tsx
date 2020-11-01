import React from 'react';
import GpuStatus from '../../../models/gpu-status.model';
import "./gpu-info.css";

class GpuInfo extends React.Component<{gpuStatus:GpuStatus},{
}> {
  constructor(props:any) {
    super(props);
  }

  async componentDidMount(){  
  }

  render(){
      return (
        <div className="GpuInfo">
          {`${JSON.stringify(this.props.gpuStatus)};`}
        </div>
      );
  }
  
}

export default GpuInfo;

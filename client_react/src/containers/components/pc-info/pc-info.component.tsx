import React from 'react';
import PcStatus from '../../../models/pc-status.model';
import "./pc-info.css";

class PcInfo extends React.Component<{pcStatus:PcStatus},{
}> {
  constructor(props:any) {
    super(props);
  }

  async componentDidMount(){

    
  }

  render(){
      return (
        <div className="PcInfo" >
          {`${JSON.stringify(this.props.pcStatus)};`}
        </div>
      );

  }
  
}

export default PcInfo;

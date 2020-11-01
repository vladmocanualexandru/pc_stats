import React from 'react';
import './App.css';
import Api from '../services/api.service';
import SystemInfo from "../models/system-info.model";
import SystemStatus from '../models/system-status.model';
import InfoFrame from "./components/info-frame/info-frame.component";

class App extends React.Component<{},{
  systemInfo:SystemInfo|undefined,
  systemStatus: SystemStatus|undefined,
  messageInfo:string|undefined
}> {
  constructor(props:any) {
    super(props);
    this.state = {
      systemInfo: undefined,
      systemStatus: undefined,
      messageInfo: undefined
    }
  }

  async componentDidMount(){
    try {
      const systemInfo:SystemInfo = await Api.getSystemInfo() ;
      const systemStatus:SystemStatus = await Api.getSystemStatus() ;
      // const systemInfo:SystemInfo = new SystemInfo("","","","");
      // const systemStatus:SystemStatus = new SystemStatus(0,0,0,0,0,0,0,0,0,0,[])
      this.setState({ systemInfo:systemInfo});
      this.setState({ systemStatus:systemStatus});
    } catch (error) {
      this.setState({messageInfo:`${error.message} `})
    }
    
  }

  render(){
    if(this.state.messageInfo){
      return <div className="App">{this.state.messageInfo}</div>
    }else if(this.state.systemInfo && this.state.systemStatus){
      return (
        <InfoFrame systemInfo={this.state.systemInfo} systemStatus={this.state.systemStatus!}/>
      );
    }else
      return <></>
    
  }
  
}

export default App;

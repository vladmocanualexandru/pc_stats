import React from 'react';
import './App.css';
import Api from '../services/api.service';
import SystemInfo from "../models/system-info.model";
import SystemStatus from '../models/system-status.model';

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
      this.setState({ systemInfo:systemInfo});
      this.setState({ systemStatus:systemStatus});
    } catch (error) {
      this.setState({messageInfo:`${error.message} `})
    }
    
  }

  render(){
    if(this.state.messageInfo){
      return <div className="App">{this.state.messageInfo}</div>
    }else if(this.state.systemInfo){
      return (
        <div className="App">
          {`${JSON.stringify(this.state.systemInfo)};`}
          {`${JSON.stringify(this.state.systemStatus)}`}
        </div>
      );
    }else
      return <></>
    
  }
  
}

export default App;

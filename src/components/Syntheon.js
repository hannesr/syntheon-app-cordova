import React from 'react';
import Selectable from './Selectable';

//import '../css/syntheon.css';

class Syntheon extends React.Component {

  constructor(props) {
    console.log("... Syntheon.constructor");
    super(props);
    this.state = {bank:[]};
  }

  componentDidMount() {
    console.log("... Syntheon.componentDidMount");
  }

  onDisconnect() {
    console.log("... Syntheon.onDisconnect");
    ble.disconnect(this.props.device.id,
      () => { this.props.onDisconnected(); },
      () => { this.props.onDisconnected(); }
    );
  }

  render() {
    return (
      <div className="syntheon">
        <p>Widgets go here!</p>
        <button onClick={this.onDisconnect()}>Disconnect</button>
      </div>
    );
  }

}

module.exports = Syntheon;

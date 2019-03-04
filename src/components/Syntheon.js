import React from 'react';

//import '../css/syntheon.css';

class Syntheon extends React.Component {

  constructor(props) {
    console.log("... Syntheon.constructor");
    super(props);
    this.state = {
      devices: [],
      message: "Connected"
    };
  }

  onDisconnect() {
    console.log("... Syntheon.onDisconnect");
    ble.disconnect(this.props.device.id,
      () => {
        console.log("Device disconnected");
      },
      () => {
        console.log("Device disconnect failed");
      }
    );
  }

  render() {
    return (
      <div className="syntheon">
        <h1>Syntheon / { this.props.device.name }</h1>
        <p>{ this.state.message }</p>
        <p>Widgets go here!</p>
        <button onClick={this.onDisconnect()}>Disconnect</button>
      </div>
    );
  }

}

module.exports = Syntheon;

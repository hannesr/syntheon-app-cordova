import React from 'react';

//import '../css/scan.css';

class Scan extends React.Component {

  constructor(props) {
    console.log("... Scan.constructor");
    super(props);
    this.state = {scanning:false, devices: [], message: null};
  }

  onScan() {
    console.log("... Scan.doScan");
    this.setState({scanning:true, message: 'Scanning....'});
    ble.startScan([],
      (device) => {
        console.log("... device found ",JSON.stringify(device));
        this.setState((state) => {
          return {devices: state.devices.concat([device])};
        });
      },
      () => {
        console.log("... startScan failed");
        this.setState({message: "Scan failed"});
        // >>> for testing on browser...
        this.setState((state) => {
          return {devices: state.devices.concat([{name: "Test device", id: "42"}])};
        });
        // <<<
      }
    );
  }

  onSelect(d) {
    console.log("... Scan.onSelect");
    ble.stopScan(
      () => { },
      () => { this.setState({message: "Stop scan failed"}); }
    );
    this.props.onSelect(d);
  }

  render() {
    const devices_rendered = this.state.devices.map((d) =>
      <li key={d.id}
        className="btn"
        onClick={() => this.onSelect(d)}>
        {d.name}
      </li>
    );

    return (
      <div className="scan">
        <h1>Syntheon / Select device</h1>
        <p>{ this.state.message }</p>
        <button onClick={() => this.onScan()}>Scan</button>
        <ul>{ devices_rendered }</ul>
      </div>
    );
  }

}

module.exports = Scan;

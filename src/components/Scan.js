import React from 'react';
import Selectable from './Selectable';

//import '../css/scan.css';

class Scan extends React.Component {

  constructor(props) {
    console.log("... Scan.constructor");
    super(props);
    this.state = {scanning:false, devices: []};
  }

  componentDidMount() {
    console.log("... Scan.componentDidMount");
    this.onScan();
  }

  onScan() {
    console.log("... Scan.onScan");
    if (typeof(ble) == 'undefined') return;
    this.setState({scanning:true});
    this.props.onMessage("Scanning...");
    ble.startScan([],
      (device) => {
        console.log("... device found ",JSON.stringify(device));
        if (!device.name) device.name = device.id;
        this.setState((state) => {
          return {devices: state.devices.concat([device])};
        });
      },
      (err) => {
        this.props.onMessage("Scan failed: "+JSON.stringify(err));
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
      () => { this.props.onMessage("Stop scan failed"); }
    );
    this.props.onSelect(d);
  }

  render() {
    const devices_rendered = this.state.devices.map((d) =>
      <Selectable key={d.id}
        text={d.name}
        icon={d.name==d.id ? "custom" : "bluetooth"}
        onClick={() => this.onSelect(d)}
      />
    );

    return (
      <div className="scan">
        {!this.state.scanning &&
          <Selectable text="Scan" onClick={() => this.onScan()} />
        }
        <ul>{ devices_rendered }</ul>
      </div>
    );
  }

}

export default Scan;

import React from 'react';
import Selectable from './Selectable';
import SyntheonApi from './SyntheonApi';

//import '../css/syntheon.css';

class Syntheon extends React.Component {

  constructor(props) {
    console.log("... Syntheon.constructor");
    super(props);
    this.state = {bank:[], preset:-1};
  }

  componentDidMount() {
    console.log("... Syntheon.componentDidMount");
    this.api = new SyntheonApi(this.props.device.id);
    this.props.onMessage("Initializing");
    this.api.getBank(
      (bank) => { this.setState({bank:bank}); },
      (cause) => { this.props.onMessage("getBank failed: "+cause); }
    );
    this.api.getPreset(
      (preset) => {
        this.setState({preset:preset});
        this.props.onMessage("Ready");
      },
      (cause) => { this.props.onMessage("getPreset failed: "+cause); }
    );
  }

  onPreset(preset) {
    console.log("... Syntheon.onPreset: "+preset);
  }

  onDisconnect() {
    console.log("... Syntheon.onDisconnect");
    ble.disconnect(this.props.device.id,
      () => { this.props.onDisconnected(); },
      () => { this.props.onDisconnected(); }
    );
  }

  render() {
    const bank_rendered = this.state.bank.map((p,i) =>
      <Selectable key={i.toString()}
        icon={i==0 ? "off" : "sound"}
        selected={i==this.state.preset}
        text={p}
        onClick={() => this.onPreset(i)}
      />
    );

    return (
      <div className="syntheon">
        <ul>{bank_rendered}</ul>
        <Selectable text="Disconnect"
          onClick={() => this.onDisconnect()}
        />
      </div>
    );
  }

}

export default Syntheon;

import './css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Scan from './components/Scan';
import Syntheon from './components/Syntheon';

class App extends React.Component {

  constructor(props) {
    console.log("... App.constructor");
    super(props);
    this.state = {device: null, message: null};
  }

  onSelect(d) {
    console.log("... App.onSelect "+JSON.stringify(d));
    ble.connect(d.id,
      () => {
        this.onMessage("Connected: "+d.name);
        this.setState({device: d});
      },
      () => {
        this.onMessage("Disconnected");
        //this.setState({device: null});
        // >>> for testing on browser...
        this.setState({device: d});
        // <<<
      }
    );
  }

  onMessage(m) {
    console.log("MESSAGE: "+m)
    this.setState({message: m});
  }

  renderMainPanel() {
    if (!this.state.device) {
      return (
        <Scan
          onSelect={(d) => this.onSelect(d)}
          onMessage={(m) => this.onMessage(m)}
        />
      );
    } else {
      return (
        <Syntheon
          device={this.state.device}
          onMessage={(m) => this.onMessage(m)}
          onDisconnected={() => this.setState({device: null})}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Header
          device={this.state.device}
          message={this.state.message}
        />
        { this.renderMainPanel() }
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));

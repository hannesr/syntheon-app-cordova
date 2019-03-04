import './css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Scan from './components/Scan';
import Syntheon from './components/Syntheon';

class App extends React.Component {

  constructor(props) {
    console.log("... App.constructor");
    super(props);
    this.state = {device: null};
  }

  onSelect(d) {
    console.log("... App.onSelect ", d);
    ble.connect(d.id,
      () => {
        console.log("... device connected", d);
        this.setState({device: d});
      },
      () => {
        console.log("... device disconnected", d);
        //this.setState({device: null});
        // >>> for testing on browser...
        this.setState({device: d});
        // <<<
      }
    );
  }

  render() {
    const panel_rendered = () =>
      (this.state.device ?
        <Syntheon device={this.state.device} /> :
        <Scan onSelect={(d) => this.onSelect(d)} />
      );

    return (
      <div>
        <CSSTransitionGroup transitionName="push"
          transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
          { panel_rendered() }
        </CSSTransitionGroup>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));

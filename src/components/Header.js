import React from 'react';

//import '../css/header.css';

class Header extends React.Component {
  render() {
    const name = this.props.device ?
      "Syntheon / "+this.props.device.name :
      "Syntheon";
    return(
      <div>
        <h1>{name}</h1>
        <p><i>{this.props.message}</i></p>
      </div>
    );
  }
}

module.exports = Header;

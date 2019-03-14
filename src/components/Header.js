import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import '../css/header.css';

class Header extends React.Component {
  render() {
    const name = this.props.device ?
      "Syntheon / "+this.props.device.name :
      "Syntheon";
    return(
      <div>
        <Navbar className="header-title" expand>
          <Navbar.Brand>Syntheon</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            { this.props.device &&
              <Navbar.Text>
                connected to
                <strong>{this.props.device.name}</strong>
              </Navbar.Text>
            }
          </Navbar.Collapse>
        </Navbar>
        <Navbar className="header-msg" expand>
          <span>{this.props.message}</span>
        </Navbar>
      </div>
    );
  }
}

export default Header;

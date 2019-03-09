import React from 'react';

//import '../css/selectable.css';

class Selectable extends React.Component {
  render() {
    return (
      <li onClick={() => this.props.onClick()}>
      {this.props.text}
      </li>
    );
  }
}

module.exports = Selectable;
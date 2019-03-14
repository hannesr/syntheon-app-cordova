import React from 'react';
import Button from 'react-bootstrap/Button'
import MdBluetooth from 'react-ionicons/lib/MdBluetooth'
import MdBulb from 'react-ionicons/lib/MdBulb'
import MdMusicalNote from 'react-ionicons/lib/MdMusicalNote'
import MdMusicalNotes from 'react-ionicons/lib/MdMusicalNotes'
import MdCog from 'react-ionicons/lib/MdCog'

class Selectable extends React.Component {
  render() {
    return (
      <Button variant="primary" size="lg" block
        onClick={() => this.props.onClick()}
        className={this.props.selected ? 'active' : ''}
      >
        {this.props.icon && this.renderIcon(this.props.icon)}
        {this.props.text}
      </Button>
    );
  }

  renderIcon(icon) {
    switch(icon) {
      case "bluetooth":
        return <MdBluetooth color="white" />
      case "custom":
        return <MdBulb color="lightgrey" />
      case "bypass":
        return <MdMusicalNote color="white" />
      case "sound":
        return <MdMusicalNotes color="white" />
      default:
        return <MdCog color="white" />
    }
  }
}

export default Selectable;

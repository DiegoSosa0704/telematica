import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'

class ButtonToggleReturnLoan extends Component {
  state = {};

  handleClick = () => {
    this.setState(prevState => ({active: !prevState.active}))
  };

  render() {
    const {active} = this.state;
    return (
      <Button
        toggle
        active={active}
        color={active ? "green" : "red"}
        content={active ? "Entregado" : "Péndiente"}
        icon={active ? "check" : "cancel"}
        onClick={this.handleClick}
      />
    )
  }
}

export default ButtonToggleReturnLoan
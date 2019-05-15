import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'

class ButtonToggleReturnLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({active: this.props.component.state === 1 ? true : false})
  }

  handleClick = () => {
    fetch(`/api/v1/loan/component/update/${this.props.component.loan_id}/`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        state: this.state.active ? 0 : 1,
      }),
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({active: data.state === 1 ? true : false})
        })
      } else {
        response.json().then(error => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
    });
    /*this.setState(prevState => ({active: !prevState.active}))*/
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
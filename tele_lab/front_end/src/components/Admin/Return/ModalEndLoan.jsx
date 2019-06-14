import React, {Component} from 'react'
import {connect} from "react-redux";
import {Button, Header, Icon, Modal} from "semantic-ui-react";

class ModalEndLoan extends Component {
  state = { modalOpen: false }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({modalOpen: nextProps.endLoan})
  }

  handleClose = () => {
    // Desactivar
    this.setState({modalOpen: false})
  };

  render() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='browser' content='Desea terminar la entrega?'/>
        <Modal.Content>
          <h3>This website uses cookies to ensure the best user experience.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose} inverted>Cancelar</Button>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark'/> Terminar
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(null, null)(ModalEndLoan);
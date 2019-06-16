import React, {Component} from 'react'
import {connect} from "react-redux";
import {Button, Header, Icon, Modal} from "semantic-ui-react";
import {returnComponent} from "../../../actions";

class ModalEndLoan extends Component {
  state = { modalOpen: false };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({modalOpen: nextProps.propEndLoan})
  }

  handleClose = () => {
    this.setState({modalOpen: false});
    this.props.endLoan(0, this.props.indexLastComponent)
  };

  changeLoanState = () => {
    let endComponent = null;
    this.props.componentsLoan.forEach((component, index) => {
      if (index === this.props.indexLastComponent) {
        endComponent = component;
      }
    });
    if (endComponent !== null) {
      fetch(`/api/v1/loan/component/update/${endComponent.loan_id}/`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          state: 1,
        }),
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.props.changeEndLoan(false);
            this.setState({modalOpen: false})
          })
        } else {
          response.json().then(error => {
            console.log(`Failed to load data: ${error.message}`);
          });
        }
      });
    }
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
          <Button color='green' onClick={this.changeLoanState} inverted>
            <Icon name='checkmark'/> Terminar
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    indexLastComponent: state.returnComponent.indexLastComponent,
    componentsLoan: state.returnComponent.componentsLoan,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    endLoan: (state, index) => {
      return dispatch(returnComponent.endLoan(state, index));
    },
    changeEndLoan: (state) => {
      return dispatch(returnComponent.changeEndLoan(state));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEndLoan);
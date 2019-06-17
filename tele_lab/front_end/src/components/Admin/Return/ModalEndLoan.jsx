import React, {Component} from 'react'
import {connect} from "react-redux";
import {Button, Header, Icon, Modal} from "semantic-ui-react";
import {returnComponent} from "../../../actions";
import toast from 'toasted-notes'

class ModalEndLoan extends Component {
  state = {modalOpen: false};

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({modalOpen: nextProps.propEndLoan})
  }

  handleClose = () => {
    this.setState({modalOpen: false});
    this.props.endLoan(0, this.props.indexLastComponent)
  };

  changeLoanState = () => {
    let endComponent = this.props.componentsLoan[this.props.indexLastComponent];
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
            this.fetchChangeLoanState();
            this.setState({modalOpen: false});
          })
        } else {
          response.json().then(error => {
            console.log(`Failed to load data: ${error.message}`);
          });
        }
      });
    }
  };

  fetchChangeLoanState = () => {
    let selectedLoan = this.props.pendingLoans[this.props.stateItem];
    fetch(`/api/v1/loan/update/${selectedLoan.id}/`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        state_loan: 1,
      }),
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.props.getPendingLoans();
          toast.notify("Préstamo finalizado.", {
            position: "bottom-left"
          });
        })
      } else {
        response.json().then(error => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
    });
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
    stateItem: state.returnComponent.stateItem,
    pendingLoans: state.returnComponent.pendingLoans,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    endLoan: (state, index) => {
      return dispatch(returnComponent.endLoan(state, index));
    },
    changeEndLoan: (state) => {
      return dispatch(returnComponent.changeEndLoan(state));
    },
    getPendingLoans: () => {
      return dispatch(returnComponent.getPendingLoans());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEndLoan);
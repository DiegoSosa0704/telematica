import React, {Component} from 'react'
import {connect} from "react-redux";
import {Button, Header, Icon, Modal} from "semantic-ui-react";

class ModalEndLoan extends Component {
  state = {modalOpen: false};

  handleOpen = () => {
    /*if (this.props.endLoan) {
      this.setState({modalOpen: true})
    }*/
  };

  handleClose = () => this.setState({modalOpen: false});

  render() {
    return (
      <Modal
        open={this.props.endLoan}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='browser' content='Cookies policy'/>
        <Modal.Content>
          <h3>This website uses cookies to ensure the best user experience.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark'/> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    endLoan: state.returnComponent.endLoan,
  };
};

export default connect(mapStateToProps, null)(ModalEndLoan);
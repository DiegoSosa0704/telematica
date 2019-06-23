import React, {Component} from 'react'
import {Button, Header, Icon, Image, Modal} from 'semantic-ui-react'
import {loan} from "../../../actions";
import {connect} from "react-redux";
import ModalStockComponentContent from "./ModalStockComponentContent";

class ModalStockComponent extends Component {
  handleClose = () => {
    this.props.changeStatusModal(false);
  };

  render() {
    return (
      <Modal
        open={this.props.statusModal}
        onClose={this.handleClose}
      >
        {this.props.selectedComponent !== undefined ?
          <ModalStockComponentContent component={this.props.selectedComponent}/> :
          <div>No ha seleccionado un component</div>
        }
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedComponent: state.loan.selectedComponent,
    statusModal: state.loan.statusModalSelectedComponent,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeStatusModal: (state) => {
      return dispatch(loan.statusModalSelectedComponent(state))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalStockComponent)
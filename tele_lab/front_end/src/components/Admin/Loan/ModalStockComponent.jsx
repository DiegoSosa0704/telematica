import React, {Component} from 'react'
import {Modal} from 'semantic-ui-react'
import {loan} from "../../../actions";
import {connect} from "react-redux";
import ModalStockComponentContent from "./ModalStockComponentContent";
import * as PropTypes from 'prop-types'

class ModalStockComponent extends Component {
  handleClose = () => {
    this.props.changeStatusModal(false);
  };

  render() {
    return (
      <Modal
        closeIcon
        size={'large'}
        open={this.props.statusModal}
        onClose={this.handleClose}
        centered={false}
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
    },
  };
};

ModalStockComponent.propTypes = {
  selectedComponent: PropTypes.object,
  statusModal: PropTypes.bool,
  changeStatusModal: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalStockComponent)
import React, {Component} from 'react'
import {List} from "semantic-ui-react";
import {changeTypeAcademic, dateTimeToString, dateToString} from "../../../utils";
import {returnComponent} from "../../../actions";
import {connect} from "react-redux";

class ItemLoan extends Component {
  state = {active: false};

  handlerListItem(component) {
    this.props.getComponentsByPendingLoan(component.id);
    //this.props.changeStateItemList(this.props.stateItem);
    this.setState({active: !this.state.active});
  }

  render() {
    return (
      <List.Item active={this.state.active} onClick={() => this.handlerListItem(this.props.component)}>
        <List.Content floated='right'>
          <List.Header>Fecha:</List.Header>
          <List.Description>{dateToString(this.props.component.date_start)}</List.Description>
          <List.Description>{dateTimeToString(this.props.component.date_start)}</List.Description>
        </List.Content>
        <List.Content>
          <List.Header>{this.props.component.academic.last_name} {this.props.component.academic.first_name}</List.Header>
          <List.Description>{changeTypeAcademic(this.props.component.academic.type)}</List.Description>
          <List.Description><b>Código:</b> {this.props.component.academic.code}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

const mapStateToProps = state => {
  return {
    stateItem: state.returnComponent.stateItem,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getComponentsByPendingLoan: (loanId) => {
      return dispatch(returnComponent.getComponentsByPendingLoan(loanId));
    },
    changeStateItemList: (state) => {
      return dispatch(returnComponent.changeStateItemList(state));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemLoan);

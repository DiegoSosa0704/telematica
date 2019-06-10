import React, {Component} from 'react'
import {List} from "semantic-ui-react";
import {changeTypeAcademic, dateTimeToString, dateToString} from "../../../utils";
import {returnComponent} from "../../../actions";
import {connect} from "react-redux";

class ItemLoan extends Component {
  state = {active: false};

  handlerListItem(component) {
    this.setState({active: !this.state.active});
    this.props.changeStateItemList(this.props.indexItem);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.indexItem === nextProps.stateItem ) {
      this.setState({active: true});
      this.props.getComponentsByPendingLoan(nextProps.component.id);
    } else {
      this.setState({active: false})
    }
  }

  componentDidMount() {
    if (this.props.indexItem === this.props.stateItem) {
      this.setState({active: true});
      this.props.getComponentsByPendingLoan(this.props.component.id);
    } else {
      this.setState({active: false})
    }
  }

  render() {
    return (
      <List.Item active={this.state.active} onClick={() => this.handlerListItem(this.props.component)}>
        <List.Content floated='right'>
          <List.Header>Fecha:</List.Header>
          <List.Description>{dateToString(this.props.component.date_start)}</List.Description>
          <List.Description>{dateTimeToString(this.props.component.date_start)}</List.Description>
        </List.Content>
        {this.state.active? <List.Icon name='right triangle' />: null}
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
    changeStateItemList: (indexItem) => {
      return dispatch(returnComponent.changeStateItemList(indexItem));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemLoan);

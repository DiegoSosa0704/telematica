import React, {Component} from "react";
import {Button, List} from "semantic-ui-react";
import {loan} from "../../../actions";
import {connect} from "react-redux";
import {store} from "../../../index";

class ListSticky extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
  }

  handleRemoveItem() {
    this.props.removeItem(this.props.component)
    this.props.getListComponents(store.getState().loan.lastQuery, store.getState().loan.components)

  }

  render() {
    return (
      <React.Fragment>
        <List.Content floated='right'>
          <Button onClick={this.handleRemoveItem} size='mini' circular icon='close'/>
        </List.Content>
        <List.Content>
          <List.Header as='a'>{this.props.component.name}</List.Header>
          <List.Description as='a'>{this.props.component.status}</List.Description>
        </List.Content>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeItem: (component) => {
      return dispatch(loan.removeToLoan(component));
    },
    getListComponents: (query, post) => {
      return dispatch(loan.listComponents(query, post));
    },
  }
};

export default connect(null, mapDispatchToProps)(ListSticky)
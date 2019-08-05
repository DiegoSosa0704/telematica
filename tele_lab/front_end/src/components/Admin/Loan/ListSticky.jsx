import React, {Component} from "react";
import {Button, List} from "semantic-ui-react";
import {loan} from "../../../actions";
import {connect} from "react-redux";

const daysLevel = {
  "L1": 5,
  "L2": 10,
  "L3": 15,
  "L4": 20,
};

class ListSticky extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.component);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleRemoveItem() {
    this.props.removeItem(this.props.component);
  }

  render() {
    const dateEnd = () => {
      let sumDays = 0;
      let date = new Date(Date.now());
      for (const prop in daysLevel) {
        if (prop === this.props.component.component_stock_object.level) {
          sumDays = daysLevel[prop]
        }
      }
      date.setDate(date.getDate() + sumDays);
      return date.toLocaleDateString('es-CO')
    };

    return (
      <React.Fragment>
        <List.Content floated='right'>
          <Button onClick={this.handleRemoveItem} size='mini' circular icon='close'/>
        </List.Content>
        <List.Content floated='right'>
          <List.Header>Fecha de entrega:</List.Header>
          <List.Description>{dateEnd()}</List.Description>
        </List.Content>
        <List.Content>
          <List.Header as='a'>{this.props.component.component_stock_object.name}</List.Header>
          <List.Description><b>Serial:</b> {this.props.component.serial}</List.Description>
          <List.Description><b>Serial UPTC:</b> {this.props.component.uptc_serial}</List.Description>
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
  }
};

export default connect(null, mapDispatchToProps)(ListSticky)
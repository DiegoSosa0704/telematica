import React, {Component} from 'react'
import {Header, List} from "semantic-ui-react";
import {changeTypeAcademic, dateTimeToString, dateToString} from '../../../utils'
import {connect} from "react-redux";
import {returnComponent} from "../../../actions";

class ListPendingLoans extends Component {
  constructor(props) {
    super(props);
  }

  handlerListItem(component) {
    this.props.getComponentsByPendingLoan(component.id);
  }

  render() {
    if (this.props.pendingLoans.length > 0) {
      const listLoans = this.props.pendingLoans.map((component, index) => {
        return (
          <React.Fragment key={index}>
            <List.Item onClick={() => this.handlerListItem(component)}>
              <List.Content floated='right'>
                <List.Header>Fecha:</List.Header>
                <List.Description>{dateToString(component.date_start)}</List.Description>
                <List.Description>{dateTimeToString(component.date_start)}</List.Description>
              </List.Content>
              <List.Content>
                <List.Header>{component.academic.last_name} {component.academic.first_name}</List.Header>
                <List.Description>{changeTypeAcademic(component.academic.type)}</List.Description>
                <List.Description><b>Código:</b> {component.academic.code}</List.Description>
              </List.Content>
            </List.Item>
          </React.Fragment>
        );
      });
      return (
        <List animated selection divided>
          {listLoans}
        </List>
      );
    } else {
      return (
        <Header as='h3' disabled>
          No hay préstamos pendientes.
        </Header>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getComponentsByPendingLoan: (loanId) => {
      return dispatch(returnComponent.getComponentsByPendingLoan(loanId));
    },
  };
};

export default connect(null, mapDispatchToProps)(ListPendingLoans);

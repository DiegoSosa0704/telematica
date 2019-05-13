import React, {Component} from 'react'
import {Header, List} from "semantic-ui-react";
import {changeTypeAcademic, dateTimeToString, dateToString} from '../../../utils'

class ListPendingLoans extends Component {
  constructor(props) {
    super(props);
  }

  handlerListItem(component) {
    console.log(component.date_start)
  }

  render() {
    if (this.props.pendingLoans.length > 0) {
      const listLoans = this.props.pendingLoans.map((component, index) => {
        return (
          <React.Fragment key={index}>
            <List.Item onClick={this.handlerListItem(component)}>
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
        <List animated selection divided relaxed>
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

export default ListPendingLoans;

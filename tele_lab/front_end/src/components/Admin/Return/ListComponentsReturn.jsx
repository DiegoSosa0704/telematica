import React from 'react'
import {List} from "semantic-ui-react";
import {changeStateLoanComponent} from '../../../utils'
import ButtonToggleReturnLoan from "./ButtonToggleReturnLoan";

export const ListComponentsReturn = (props) => {
  const listLoans = props.componentsLoan.map((component, index) => {
    return (
      <React.Fragment key={index}>
        <List.Item>
          <List.Content floated='right'>
            <ButtonToggleReturnLoan component={component}/>
          </List.Content>
          <List.Content floated='left'>
            <List.Header>{component.name}</List.Header>
            <List.Description>{changeStateLoanComponent(component.state)}</List.Description>
          </List.Content>
          <List.Content floated='left'>
            <List.Description><b>Serial: </b>{component.serial}</List.Description>
            <List.Description><b>Serial UPTC: </b>{component.uptc_serial}</List.Description>
          </List.Content>
        </List.Item>
      </React.Fragment>
    );
  });
  return (
    <List selection divided relaxed>
      {listLoans}
    </List>
  );
};
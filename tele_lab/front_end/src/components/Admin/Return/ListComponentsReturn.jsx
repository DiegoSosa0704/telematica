import React from 'react'
import {List} from "semantic-ui-react";
import ButtonToggleReturnLoan from "./ButtonToggleReturnLoan";
import * as PropTypes from 'prop-types'

const ListComponentsReturn = (props) => {
  const listLoans = props.componentsLoan.map((component, index) => {
    return (
      <React.Fragment key={index}>
        <List.Item>
          <List.Content floated='right'>
            <ButtonToggleReturnLoan component={component} index={index}/>
          </List.Content>
          <List.Content floated='left'>
            <List.Header>{component.name}</List.Header>
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
    <List selection divided relaxed className={"listComponents"}>
      {listLoans}
    </List>
  );
};

ListComponentsReturn.propTypes = {
  componentsLoan: PropTypes.array
};

export default ListComponentsReturn;
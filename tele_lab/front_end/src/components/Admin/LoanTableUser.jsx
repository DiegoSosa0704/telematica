import React from 'react'
import {Header, Item} from "semantic-ui-react";
import * as PropTypes from 'prop-types'

const DataUserLoan = (props) => {
  return (
    <React.Fragment>
      {
        Object.keys(props.userLoan).length > 0 ?
          <Item>
            <Item.Content className="content-user">
              <Header as='a' content={props.userLoan.title}/>
              <Item.Meta>{props.userLoan.description}</Item.Meta>
              <Item.Description>
              </Item.Description>
              <Item.Extra>
                {props.userLoan.code}
                <br/>
                {props.userLoan.academic_program}
              </Item.Extra>
            </Item.Content>
          </Item> :
          <Header as='h3' disabled textAlign='center'>
            No ha seleccionado un usuario
          </Header>
      }
    </React.Fragment>
  );
};

DataUserLoan.propTypes = {
  userLoan: PropTypes.object.isRequired
};

export default DataUserLoan;
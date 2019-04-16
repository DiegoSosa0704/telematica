import React, {Component} from 'react'
import {Header, Segment} from "semantic-ui-react";
import LoanTableUser from "../LoanTableUser";

class LoanSticky extends Component {
  render() {
    return (
      <Segment raised>
        <Header as='h3'>Stuck Content</Header>
        <LoanTableUser/>
      </Segment>
    );
  }
}

export default LoanSticky;
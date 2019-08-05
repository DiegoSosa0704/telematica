import React, {Component} from 'react'
import {Header, Placeholder} from 'semantic-ui-react'
import ListPendingLoans from "./ListPendingLoans";

class LoansReturn extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as='h3' dividing>
          Préstamos
        </Header>
        {this.props.loansReturn !== undefined ?
          <ListPendingLoans pendingLoans={this.props.loansReturn}/> :
          <Placeholder>
            <Placeholder.Line length='full'/>
            <Placeholder.Line length='very long'/>
            <Placeholder.Line length='long'/>
            <Placeholder.Line length='medium'/>
          </Placeholder>
        }
      </React.Fragment>
    );
  }
}

export default LoansReturn;
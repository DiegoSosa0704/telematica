import React, {Component} from 'react'
import {Header, Placeholder} from 'semantic-ui-react'
import ListPendingLoans from "./ListPendingLoans";
import * as PropTypes from 'prop-types';

class LoansReturn extends Component {
  render() {
    return (
      <React.Fragment>
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

LoansReturn.propTypes = {
  loansReturn: PropTypes.array
};

export default LoansReturn;
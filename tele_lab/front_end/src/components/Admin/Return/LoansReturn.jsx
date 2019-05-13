import React, {Component} from 'react'
import {Header, Placeholder} from 'semantic-ui-react'
import {returnComponent} from "../../../actions";
import {connect} from "react-redux";
import ListPendingLoans from "./ListPendingLoans";

class LoansReturn extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPendingLoans();
  }

  render() {
    return (
      <React.Fragment>
        <Header as='h3'>Préstamos</Header>
        {this.props.pendingLoans !== undefined ?
          <ListPendingLoans pendingLoans={this.props.pendingLoans}/> :
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

const mapStateToProps = state => {
  return {
    pendingLoans: state.returnComponent.pendingLoans
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getPendingLoans: () => {
      return dispatch(returnComponent.getPendingLoans());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoansReturn)
import React, {Component} from 'react'
import {Input} from "semantic-ui-react";
import {connect} from "react-redux";
import _ from "lodash";

class LoansSearch extends Component {
  constructor(props) {
    super(props);
    this.getLoanSearch = this.getLoanSearch.bind(this)
  }

  getLoanSearch(data) {
    console.log(data.value);
    const re = new RegExp(_.escapeRegExp(data.value), 'i');
    const isMatch = result => re.test(result.academic.code);
    let results = _.filter(this.props.pendingLoans, isMatch);
    console.log(results)
  }

  render() {
    return (
      <Input loading onChange={(event, data) => this.getLoanSearch(data)}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    pendingLoans: state.returnComponent.pendingLoans
  };
};

const mapDispatchToProps = (dispatch) =>{
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps())(LoansSearch)
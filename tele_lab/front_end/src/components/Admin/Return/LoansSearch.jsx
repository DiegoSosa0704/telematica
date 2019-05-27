import React, {Component} from 'react'
import {Input} from "semantic-ui-react";
import {connect} from "react-redux";

class LoansSearch extends Component {
  constructor(props) {
    super(props);
    this.getLoanSearch = this.getLoanSearch.bind(this)
  }

  getLoanSearch() {

  }

  render() {
    return (
      <Input onChange={this.getLoanSearch}/>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
  }
};

export default connect(null, mapDispatchToProps())(LoansSearch)
import React, {Component} from 'react'
import {Header, Item} from "semantic-ui-react";
import {connect} from "react-redux";

class LoanTableUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Item>
          <Item.Content>
            <Header as='a' content={this.props.userLoan.title}/>
            <Item.Meta>{this.props.userLoan.description}</Item.Meta>
            <Item.Description>
            </Item.Description>
            <Item.Extra>
              {this.props.userLoan.code}
              <br/>
              {this.props.userLoan.academic_program}
            </Item.Extra>
          </Item.Content>
        </Item>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoan: state.loan.userLoan,
  }
};

export default connect(mapStateToProps, null)(LoanTableUser);
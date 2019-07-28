import React, {Component} from 'react'
import {auth} from "../actions";
import {connect} from "react-redux";


class VerifyEmail extends Component {

  componentDidMount() {
    const {token} = this.props.match.params;
    this.props.onVerifyEmail(token.toString())
  }

  render() {
    return (
      <div>
        Hola Mundo
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onVerifyEmail: (token) => {
      return dispatch(auth.verifyEmail(token));
    }
  };
};

export default connect(null, mapDispatchToProps)(VerifyEmail)
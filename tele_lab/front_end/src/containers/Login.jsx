import React from 'react'
import {connect} from 'react-redux'
import LoginForm from '../components/forms/LoginForm'
import {isAuthenticated} from '../reducers'
import {Redirect} from "react-router";
import routes from '../routes'

const Login = (props) => {
  if (props.isAuthenticated) {
    return (
       <Redirect to={routes.home}/>
    )
  } else {
    return (
      <div>
        <LoginForm {...props}/>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state)
});

export default connect(mapStateToProps, null)(Login);
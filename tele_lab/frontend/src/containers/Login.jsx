import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import LoginForm from '../components/forms/LoginForm'
import {authErrors, isAuthenticated} from '../reducers'

const Login = (props) => {
    if (props.isAuthenticated) {
        return (
            <Redirect to='/'/>
        )
    } else {
        return (
            <div className="login-page">
                <LoginForm {...props}/>
            </div>
        )
    }
};


const mapStateToProps = (state) => ({
    errors: authErrors(state),
    isAuthenticated: isAuthenticated(state)
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
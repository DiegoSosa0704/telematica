import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {authErrors, isAuthenticated} from '../reducers'
import SignUpForm from "../components/forms/SignUpForm";
import {academicProgram} from "../actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.props.getAcademicPrograms();
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <Redirect to='/'/>
      )
    } else {
      return (
        <SignUpForm {...this.props}/>
      )
    }
  }
}


const mapStateToProps = (state) => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state),
  academic_programs: state.academicProgram.academic_programs,
});

const mapDispatchToProps = (dispatch) => ({
  getAcademicPrograms: () => {
    return dispatch(academicProgram.getAcademicPrograms())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
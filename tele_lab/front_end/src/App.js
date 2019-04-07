import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Route, Switch} from "react-router";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import VerifyEmail from "./containers/VerifyEmail";
import MessageSignUp from "./containers/MessageSignUp";
import PrivateRoute from "./containers/PrivateRouter";
import routes from "./routes"
import HomePage from "./containers/Home";


class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path={routes.login} component={Login}/>
        <Route exact path={routes.signup} component={SignUp}/>
        <Route path={routes.verify_email} component={VerifyEmail}/>
        <Route path="/signup/message/" component={MessageSignUp}/>
        <PrivateRoute path={routes.home} component={HomePage}/>
      </Switch>
    );
  }
}

export default (App);

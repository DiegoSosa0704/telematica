import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {Route, Switch} from 'react-router'
import configureStore from './store'
import {Router} from "react-router-dom";
import Login from './containers/Login'
import 'semantic-ui-css/semantic.min.css'
import PrivateRoute from "./containers/PrivateRouter";
import SignUp from "./containers/SignUp";
import VerifyEmail from "./containers/VerifyEmail";
import MessageSignUp from "./containers/MessageSignUp";
import HomePage from "./containers/HomePage";


const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/login/" component={Login}/>
        <Route exact path="/signup/" component={SignUp}/>
        <Route path="/verify-email/:token" component={VerifyEmail}/>
        <Route path="/signup/message/" component={MessageSignUp}/>
        <PrivateRoute path="/" component={HomePage}/>
        {/*<PrivateRoute path="/" component={MainContainer}/>*/}
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

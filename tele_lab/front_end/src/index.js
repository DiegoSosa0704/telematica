import React from 'react';
import ReactDOM from 'react-dom';
import {PersistGate} from 'redux-persist/lib/integration/react';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureStore from './store'
import {persistStore} from 'redux-persist'
import {Router} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import {createBrowserHistory} from 'history'
import {Route, Switch} from "react-router";
import routes from "./routes";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import VerifyEmail from "./containers/VerifyEmail";
import MessageSignUp from "./containers/MessageSignUp";
import HomePage from "./containers/Home";
import PrivateRoute from "./containers/PrivateRouter";
import './custom.css'

const history = createBrowserHistory();
const store = configureStore(history);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Switch>
          <Route exact path={routes.login} component={Login}/>
          <Route exact path={routes.signup} component={SignUp}/>
          <Route path={routes.verify_email} component={VerifyEmail}/>
          <Route path="/signup/message/" component={MessageSignUp}/>
          <PrivateRoute path={routes.home} component={HomePage}/>
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import {PersistGate} from 'redux-persist/lib/integration/react';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureStore from './store'
import {persistStore} from 'redux-persist'
import {Router} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import App from "./App";
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();
const store = configureStore(history);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <PersistGate persistor={persistor}>
        <App/>
      </PersistGate>
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

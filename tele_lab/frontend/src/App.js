import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {Provider} from "react-redux"
import {createStore} from "redux";
import ponyApp from "./reducers";

// import TeleLab from './components/TeleLab'
import NotFound from './components/NotFound'
// import HomePage from './containers/HomePage'
import Sidebar from './components/Container'
// import 'semantic-ui-css/semantic.min.css'

let store = createStore(ponyApp);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Sidebar}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;

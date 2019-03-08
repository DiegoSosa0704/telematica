import React, {Component} from 'react';
import {createStore} from "redux";
import ponyApp from "./reducers";
import 'semantic-ui-css/semantic.min.css'
import AdminContainer from './containers/AdminContainer'
import {fakeAuth} from "./containers/HomePage";
import HomePage from "./containers/HomePage";

let store = createStore(ponyApp);

class App extends Component {
    render() {
        return (
            <div>
                <style>{`
                  html, body {
                    background-color: #e0e0e0 !important;
                  }
                }
                `}</style>
                {fakeAuth.isAuthenticated ? (
                    <AdminContainer/>
                ) : (
                    <HomePage/>
                )}
            </div>
        );
    }
}

export default App;

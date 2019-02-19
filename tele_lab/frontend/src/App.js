import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom'
import {createStore} from "redux";
import ponyApp from "./reducers";
import 'semantic-ui-css/semantic.min.css'
import Record from "./containers/Record";
import {Container, Menu} from "semantic-ui-react";
import Schedule from "./containers/Schedule";
import Recommended from "./containers/Recommended";

let store = createStore(ponyApp);

class App extends Component {
    state = {};
    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;
        return (
            <div>
                <Menu stackable inverted>
                    <Container>
                        <Menu.Item>
                            <img src='https://react.semantic-ui.com/logo.png'/>
                        </Menu.Item>

                        <Menu.Item
                            name='start'
                            active={activeItem === 'start'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to='/'
                        >
                            Inicio
                        </Menu.Item>

                        <Menu.Item
                            name='record'
                            active={activeItem === 'record'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to='/record'
                        >
                            Historial
                        </Menu.Item>

                        <Menu.Item
                            name='recommended'
                            active={activeItem === 'recommended'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to='/recommended'
                        >
                            Recomendador
                        </Menu.Item>

                    </Container>
                </Menu>
                <Switch>
                    <Route exact path="/" component={Schedule}/>
                    <Route exact path="/record" component={Record}/>
                    <Route exact path="/recommended" component={Recommended}/>
                </Switch>
            </div>
        );
    }
}

export default App;

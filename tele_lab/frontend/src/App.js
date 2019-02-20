import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom'
import {createStore} from "redux";
import ponyApp from "./reducers";
import 'semantic-ui-css/semantic.min.css'
import Record from "./containers/Record";
import {Container, Grid, Header, List, Menu, Segment} from "semantic-ui-react";
import Schedule from "./containers/Schedule";
import Recommended from "./containers/Recommended";
import LoginAdmin from "./containers/LoginAdmin";

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
                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='signup'
                                active={activeItem === 'signup'}
                                onClick={this.handleItemClick}
                                as={Link}
                                to='/login'
                            >
                                Admin
                            </Menu.Item>
                        </Menu.Menu>

                    </Container>
                </Menu>
                <Container style={{height: '90vh'}}>
                    <Switch>
                        <Route exact path="/" component={Schedule}/>
                        <Route exact path="/record" component={Record}/>
                        <Route exact path="/recommended" component={Recommended}/>
                        <Route exact path="/login" component={LoginAdmin}/>
                    </Switch>
                </Container>
                <Segment inverted vertical style={{padding: '5em 0em'}}>
                    <Container>
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='About'/>
                                    <List link inverted>
                                        <List.Item as='a'>Sitemap</List.Item>
                                        <List.Item as='a'>Contact Us</List.Item>
                                        <List.Item as='a'>Religious Ceremonies</List.Item>
                                        <List.Item as='a'>Gazebo Plans</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='Services'/>
                                    <List link inverted>
                                        <List.Item as='a'>Banana Pre-Order</List.Item>
                                        <List.Item as='a'>DNA FAQ</List.Item>
                                        <List.Item as='a'>How To Access</List.Item>
                                        <List.Item as='a'>Favorite X-Men</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Header as='h4' inverted>
                                        Footer Header
                                    </Header>
                                    <p>
                                        Extra space for a call to action inside the footer that could help re-engage
                                        users.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
            </div>
        );
    }
}

export default App;

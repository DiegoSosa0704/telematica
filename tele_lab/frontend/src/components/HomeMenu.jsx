import React, {Component} from 'react'
import {Container, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

class HomeMenu extends Component {
    state = {};
    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;

        return (
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
        );
    }
}

export default HomeMenu;
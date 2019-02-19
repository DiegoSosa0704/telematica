import React, {Component} from 'react'
import {Container, Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class MenuExampleStackable extends Component {
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
                        name='schedule'
                        active={activeItem === 'schedule'}
                        onClick={this.handleItemClick}
                        as={Link}
                        to="/"
                    >
                        Horario
                    </Menu.Item>

                    <Menu.Item
                        name='record'
                        active={activeItem === 'record'}
                        onClick={this.handleItemClick}
                        as={Link}
                        to="/record"
                    >
                        Historial
                    </Menu.Item>

                    <Menu.Item
                        name='recommended'
                        active={activeItem === 'recommended'}
                        onClick={this.handleItemClick}
                        as={Link}
                        to="/recommended"
                    >
                        Recomendador
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item name='admin'
                                   active={activeItem === 'admin'}
                                   onClick={this.handleItemClick}>
                            Admin
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}
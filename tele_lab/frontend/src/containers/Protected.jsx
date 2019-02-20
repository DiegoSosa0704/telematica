import React, {Component} from 'react'
import {fakeAuth} from '../App'
import {withRouter} from "react-router-dom";
import {Menu} from 'semantic-ui-react'

const AuthButton = withRouter(
    ({history}) =>
        fakeAuth.isAuthenticated ? (
            <p>
                Welcome!{" "}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push("/"));
                    }}
                >
                    Sign out
                </button>
            </p>
        ) : (
            <p>You are not logged in.</p>
        )
);

class MenuExampleHeaderVertical extends Component {
    handleItemClick = name => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state || {}

        return (
            <Menu vertical inverted style={{minHeight: '100vh', borderRadius: '0'}}>
                <Menu.Item>
                    <Menu.Header>Products</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='enterprise'
                            active={activeItem === 'enterprise'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='consumer'
                            active={activeItem === 'consumer'}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>CMS Solutions</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='rails'
                            active={activeItem === 'rails'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='python'
                            active={activeItem === 'python'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item name='php' active={activeItem === 'php'} onClick={this.handleItemClick}/>
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Hosting</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='shared'
                            active={activeItem === 'shared'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='dedicated'
                            active={activeItem === 'dedicated'}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Support</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item name='email' active={activeItem === 'email'} onClick={this.handleItemClick}>
                            E-mail Support
                        </Menu.Item>

                        <Menu.Item name='faq' active={activeItem === 'faq'} onClick={this.handleItemClick}>
                            FAQs
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        )
    }
}


class Protected extends Component {
    render() {
        return (
            <div style={{minHeight: '100vh'}}>
                <MenuExampleHeaderVertical/>
            </div>
        )
    }
}

export default Protected

import React, {Component} from 'react'
import {Image, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import * as reducers from "../../reducers";
import {auth} from "../../actions";
import {connect} from "react-redux";
import routes from '../../routes'

class AdminMenu extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLogoutClick = () => {
    if (this.props.isAuthenticated) {
      this.props.logout();
    }
  };

  state = {};
  handleItemClick = (e, {name}) => this.setState({activeItem: name});

  render() {
    const {activeItem} = this.state;
    return (
      <div>
        <Menu fixed='left' vertical inverted style={{
          bottom: 0,
          left: 0,
          top: 0,
          width: 250,
          borderRadius: '0'
        }}>
          <Menu.Item>
            <Image src={'https://react.semantic-ui.com/logo.png'} size='tiny' centered/>
          </Menu.Item>
          <Menu.Item>
            Préstamos
            <Menu.Menu>
              <Menu.Item
                name='loans'
                active={activeItem === 'loans'}
                onClick={this.handleItemClick}
                as={Link}
                to={routes.admin_user.loans}
              >
                Préstamos
              </Menu.Item>
              <Menu.Item
                name='returns'
                active={activeItem === 'returns'}
                onClick={this.handleItemClick}
                as={Link}
                to={routes.admin_user.returns}
              >
                Devoluciones
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            Inventario
            <Menu.Menu>
              <Menu.Item
                name='search'
                active={activeItem === 'search'}
                onClick={this.handleItemClick}
              >
                Buscar
              </Menu.Item>
              <Menu.Item name='add' active={activeItem === 'add'} onClick={this.handleItemClick}>
                Agregar
              </Menu.Item>
              <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick}>
                Remover
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          >
            Mantenimiento
          </Menu.Item>
          <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={this.handleLogoutClick}
            as={Link}
            to={routes.login}
          >
            Cerrar Sesión
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: reducers.isAuthenticated(state),
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      return dispatch({type: auth.LOGOUT_SUCCESSFUL});
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminMenu)
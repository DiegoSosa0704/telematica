import React, {Component} from 'react'
import {Dropdown, Icon, Image, Input, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

class AdminMenu extends Component {
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
          <Menu.Item
            name='loans'
            active={activeItem === 'loans'}
            onClick={this.handleItemClick}
            as={Link}
            to='/admin/loans/'
          >
            Prestamos
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
        </Menu>
      </div>
    );
  }
}

export default AdminMenu
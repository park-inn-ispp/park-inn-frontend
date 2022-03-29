import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { DropdownStyled, DropdownToggleStyled, DropdownMenuStyled, DropdownItemStyled } from "./Navbar.elements";


export default class DropdownComponent extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className='menu'caret>
          Panel Administrador
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem href="/dashboard-reservas">Reservas</DropdownItem>
            <DropdownItem href="/dashboard-plazas">Plazas</DropdownItem>
            <DropdownItem href="/dashboard-usuarios">Usuarios</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
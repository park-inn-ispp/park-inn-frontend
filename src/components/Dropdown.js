import React from 'react';
import { useState } from "react";
import {BsBookmarksFill} from "react-icons/bs"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { MenuItemLink } from "./Navbar.elements";

import Cookies from 'universal-cookie';
const cookies = new Cookies();
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

    
    if (cookies.get('email')=="admin@admin.com"){
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className='menu'caret>
                Panel Administrador
              </DropdownToggle>
              <DropdownMenu>
                  <DropdownItem href="/dashboard-reservas">Reservas</DropdownItem>
                  <DropdownItem href="/dashboard-plazas">Plazas</DropdownItem>
                  <DropdownItem href="/dashboard-usuarios">Usuarios</DropdownItem>
                  <DropdownItem href="/logout">Cerrar Sesión</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
    }else{
        return (
        <MenuItemLink to="/logout">
            <BsBookmarksFill/>
            CERRAR SESIÓN
        </MenuItemLink>
        );
    }


  }
}
import { useState } from "react";
import { ProfileIcon, Container, LogoContainer, Menu, MenuItem, MenuItemLink, DropdownStyle, ParkinnTitle, Wrapper, LinkTitle, MobileIcon } from "./Navbar.elements";
import {FaBars, FaHome, FaParking, FaTimes, FaUserCircle} from "react-icons/fa"
import {BsBookmarksFill} from "react-icons/bs"
import { IconContext } from "react-icons";
import logo from '../resources/logoSinFondo.png';
import DropdownComponent from "./Dropdown";
import ProfileDropdown from './ProfileDropdown'
import Cookies from "universal-cookie";
import {RiShutDownLine} from "react-icons/ri"
import { Link } from "react-router-dom";

const cookies = new Cookies();

export default function Navbar(){

    //Estado para el boton del menu desplegable 
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
    <Container id="navbar-parkinn">
        <Wrapper>
            <IconContext.Provider value = {{style: {fontSize: "2em"}}}>
            <LogoContainer>
                <img class="logoNav" alt="Logo" src={logo}/>
                <ParkinnTitle><LinkTitle to="/">PARK-INN</LinkTitle></ParkinnTitle>
            </LogoContainer>

            <Menu open = {showMobileMenu}>
                <MenuItem>
                    <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)} to="/">
                        <FaHome/>
                        INICIO
                    </MenuItemLink>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)} to="/mis-plazas">
                        <FaParking/>
                        MIS PLAZAS
                    </MenuItemLink>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)} to="/mis-reservas">
                        <BsBookmarksFill/>
                        MIS RESERVAS
                    </MenuItemLink>
                </MenuItem>
                <MenuItem>
                <ProfileDropdown onClickShowMobile={() => setShowMobileMenu(!showMobileMenu)}/>
                </MenuItem>

                
            </Menu>
            <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <FaTimes/> : <FaBars/>}
            </MobileIcon>
            </IconContext.Provider>
            </Wrapper>
    </Container>
    )
}

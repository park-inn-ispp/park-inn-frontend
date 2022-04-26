import { useState } from "react";
import { ProfileIcon, Container, LogoContainer, Menu, MenuItem, MenuItemLink, DropdownStyle, ParkinnTitle, Wrapper, LinkTitle, MobileIcon } from "./Navbar.elements";
import {FaBars, FaHome, FaParking, FaTimes, FaUserCircle} from "react-icons/fa"
import {BsBookmarksFill} from "react-icons/bs"
import { IconContext } from "react-icons";
import Logo from './Logo'
import DropdownComponent from "./Dropdown";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Navbar(){

    //Estado para el boton del menu desplegable 
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
    <Container id="navbar-parkinn">
        <Wrapper>
            <IconContext.Provider value = {{style: {fontSize: "2em"}}}>
            <LogoContainer>
                <Logo size="100px"/>
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
                    <DropdownStyle>
                        <DropdownComponent /> 
                    </DropdownStyle> 
                </MenuItem>
            </Menu>
            <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <FaTimes/> : <FaBars/>}
            </MobileIcon>
            </IconContext.Provider>
            <IconContext.Provider value = {{style: {fontSize: "2.7em"}}}>
                <ProfileIcon>
                    <Link to={cookies.get("AuthToken")===undefined? '' :`/clients/view/${cookies.get("UserData").id}`}>
                        <FaUserCircle/>
                    </Link>
                </ProfileIcon>
            </IconContext.Provider>
            </Wrapper>
    </Container>
    )
}

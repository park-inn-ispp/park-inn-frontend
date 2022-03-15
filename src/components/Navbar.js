import { Container, LogoContainer, Menu, MenuItem, MenuItemLink, ParkinnTitle, Wrapper, LinkTitle, MobileIcon } from "./Navbar.elements";
import {FaBars} from "react-icons/fa"
import { IconContext } from "react-icons";
import Logo from './Logo'
export default function Navbar(){
    return (
    <Container>
        <Wrapper>
            <IconContext.Provider value = {{style: {fontSize: "2em"}}}>
            <LogoContainer>
                <Logo size="90px"/>
                <ParkinnTitle><LinkTitle href="">PARK-INN</LinkTitle></ParkinnTitle>
            </LogoContainer>

            <Menu>
                <MenuItem>
                    <MenuItemLink>
                        INICIO
                    </MenuItemLink>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink>
                        MIS PLAZAS
                    </MenuItemLink>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink>
                        MIS RESERVAS
                    </MenuItemLink>
                </MenuItem>
            </Menu>
            <MobileIcon>
                <FaBars/>
            </MobileIcon>
            </IconContext.Provider>
        </Wrapper>
    </Container>
    )
}
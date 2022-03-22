import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../theme';

export const Container = styled.div`
    width: 100%;
    height: 90px;
    background-color: ${colors.fivth}; 
`;

export const Wrapper = styled.div`
    width: 100%;
    max-width: 1300px;
    height: inherit;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;

    @media screen and (max-width: 960px){
        justify-content: center;
    }
`;

export const LogoContainer = styled.div`
    margin-top: 20px;
    height: 70px;
    display: flex;
    align-items: center;
    font-family: sans-serif;
    justify-content: left;
`;

export const Menu = styled.ul`
    height: 100%;
    display: flex;
    justify-content: space-between;
    list-style: none;

    @media screen and (max-width: 960px){
        z-index: 2;
        position: absolute;
        top: 90px;
        left: ${({open}) => open ? "0" : "-100%"};
        width: 100%;
        height: 113vh;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        transition: 0.5s all ease;
        background-color: ${colors.fourth};
        padding: 0;
    }
`;

export const MenuItem = styled.li`
    height: 100%;

    @media screen and (max-width:960px){
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const MenuItemLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0.5rem 2.5rem;
    color: ${colors.sixth};
    font-family: sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.5s all ease;
    text-decoration: none;

    &:hover{
        color: #fff;
        background-color: ${colors.third};
        text-decoration: underline;
        transition: 0.5s all ease;

        svg{
            fill: ${colors.fourth};
        }
    }

    svg{
        display: none;
    }

    @media screen and (max-width:960px){
        width: 100%;

        svg{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 1rem;
            fill: ${colors.fivth};
        }
    }
`;

export const ParkinnTitle = styled.p`
    margin: 0;
    text-decoration: none;
    height: 100%;
    font-weight:1000;
    color: #fff;
    font-size: 2.1rem;
`

export const LinkTitle = styled.a`
    text-decoration: none;
    color: #fff;
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 960px){
        margin-left: 2rem;
        display: flex;
        height:inherit;
        align-items: center;
        cursor: pointer;
        svg{
            fill: ${colors.fourth};
        }
    }
`;

export const ProfileIcon = styled.div`
    
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem 2rem 1rem 2rem;
    size: 100;
    svg{
        fill: ${colors.fourth};
        cursor: pointer;
    }

    @media screen and (max-width: 960px){
        display: none;
    }
`;
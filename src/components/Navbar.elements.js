import styled from 'styled-components';
import { colors } from '../theme';

export const Container = styled.div`
    width: 100%;
    height: 90px;
    background-color: ${colors.fourth}; 
`;

export const Wrapper = styled.div`
    width: 100%;
    max-width: 1300px;
    height: inherit;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;
`;

export const LogoContainer = styled.div`
margin-top: 20px;
    height: 70px;
    display: flex;
    align-items: center;
    font-family: sans-serif;
`;

export const Menu = styled.ul`
    height: 100%;
    display: flex;
    justify-content: space-between;
    list-style: none;

    @media screen and (max-width: 900px){
        position: absolute;
        top: 90px;
        left: 0;
        width: 100%;
        height: 90vh;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        transition: 0.5s all ease;
        background-color: ${colors.fourth};
    }
`;

export const MenuItem = styled.li`
    height: 100%;
`;

export const MenuItemLink = styled.a`
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

    @media screen and (max-width: 900px){
        display: flex;
        height:inherit;
        align-items: center;
        cursor: pointer;
        svg{
            fill: ${colors.fivth};
            margin-right: 0.5rem;
        }
    }
`;
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { colors } from '../theme';

export const Global = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Wrapper = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content:center;
    flex-direction: row;
    padding-top: 20px;
    @media screen and (max-width: 800px){
        flex-direction: column;
        padding-top: 20px;
        padding-left: 25px;
    }
`;

export const Down = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 50px;
`;

export const NuevaPlaza = styled(Link)`
    padding: 10px;
    border-radius: 10px;
    width: 50%;
    background-color: ${colors.fourth};
    border-style: solid;
    text-decoration: none;
    color: white;
    border-color: black;
    font-weight: bold;

    &:hover{
        background-color: ${colors.third};
        transition: all 0.5s ease;
        color: white;
    }
`;

export const Enlace = styled(Link)`
    color: #fff;
    text-decoration: none;
`;

export const Title = styled.h2`
    width: 100%;
`;
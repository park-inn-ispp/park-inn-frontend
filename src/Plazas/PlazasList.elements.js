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
    width: 100%;
    height: 100%;
    background-image: url(https://pixelperfect.com.ar/wp-content/uploads/2017/03/Material-design.jpg);
    background-size: cover;
`;

export const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 70px;
    
    @media screen and (max-width: 800px){
        flex-direction: column;
        justify-content:left;
        margin-top: 40px;
        padding: 0;
    }
`;

export const Down = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const NuevaPlaza = styled(Link)`
    padding: 10px;
    border-radius: 10px;
    width: 40%;
    background-color: ${colors.fourth};
    border-style: solid;
    text-decoration: none;
    color: white;
    border-color: black;
    border-width: 1px;
    font-weight: bold;
    font-family: monospace;
    font-size: 18px;
    margin-top: 50px;

    &:hover{
        background-color: ${colors.third};
        transition: all 0.5s ease;
        color: white;
    }

    @media screen and (max-width:600px){
        width: 78%;
    }
`;

export const Enlace = styled(Link)`
    color: #fff;
    text-decoration: none;
`;

export const Title = styled.h2`
    width: 100%;
`;
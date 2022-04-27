import styled from 'styled-components'
import { colors } from '../theme';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    color: white;
    width: 100%;
    height: 100%;
    background-color: ${colors.background};
    display: flex;
    flex-direction: column;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Etiqueta = styled.label`
    font-family: sans-serif;
    font-size: 22px;
    font-weight: bold;

    @media screen and (max-width: 500px){
        font-size: 18px;
    }
`;

export const Parrafo = styled.p`
    font-family: sans-serif;
    font-size: 22px;

    @media screen and (max-width: 500px){
        font-size: 18px;
    }
`;

export const BotonCalendario = styled(Link)`
    border-style: solid;
    background-color: ${colors.fourth};
    border-radius: 10px;
    padding: 10px;
    color: white;
    width: 100%;
`;
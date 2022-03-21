import styled from 'styled-components'
import { colors } from '../theme';

export const Container = styled.div`
    color: white;
    width: 110%;
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
`;

export const Etiqueta = styled.label`
    font-family: sans-serif;
    font-size: 22px;
    font-weight: bold;
`;

export const Parrafo = styled.p`
    font-family: sans-serif;
    font-size: 22px;
    display: inline-block;
`;
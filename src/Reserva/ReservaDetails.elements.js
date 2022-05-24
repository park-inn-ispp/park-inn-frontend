import styled from 'styled-components'
import { colors } from '../theme';

export const Etiqueta = styled.label`
    font-family: sans-serif;
    font-size: 22px;
    font-weight: bold;
`;

export const Container = styled.div`
    color: white;
    width: 110%;
    height: 100%;
    background-color: ${colors.background};
    display: flex;
    flex-direction: column;
`;

export const Parrafo = styled.p`
    font-family: sans-serif;
    font-size: 22px;
    display: inline-block;
`;

export const Wrapper2 = styled.div`
    width: 70%;
    height: auto;
    background-color: ${colors.second};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(0 0 0.55);
    margin-top: 120px;
    padding-bottom: 20px;

    @media screen and (max-width:600px){
        width: 90%;
    }
`;
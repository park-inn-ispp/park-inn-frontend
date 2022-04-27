import styled from 'styled-components'
import { colors } from '../theme';

export const Etiqueta = styled.label`
    font-family: sans-serif;
    font-size: 22px;
    font-weight: bold;
    width: 50%;
`;

export const Parrafo = styled.div`
    font-family: sans-serif;
    font-size: 22px;
    width: 50%;
    overflow: scroll;
`;

export const Global = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(https://media.istockphoto.com/vectors/parking-in-city-vector-id1130876494?k=20&m=1130876494&s=612x612&w=0&h=aEZAWPkszgjmki_nyFtskUGsKUv_IOw6Ue-MTyOo7tc=);
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
`;

export const Wrapper = styled.div`
    width: 60%;
    height: 100%;
    background-color: lightblue;
    border-radius: 20px;
    margin-bottom: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 15px;
    border-style: solid;
    border-color: ${colors.fivth};
    border-width: 4px;

    @media screen and (max-width:600px){
        margin-top: 40%;
        width: 100%;
    }
`;

export const Editar = styled.input`
    width: 60%;
    padding: 5px;
    border-style: solid;
    background-color: ${colors.fourth};
    color: white;
    border-radius: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
    &:hover{
        background-color: ${colors.fivth};
        transition: all 0.5s ease;
    }
`;

export const Title = styled.h1`
    padding: 10px;
    width: 100%;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    border-style: solid;
    background-color: ${colors.fourth};
    border-color: ${colors.fourth};
    color: white;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`;

export const Global2 = styled.div`
    width: 100%;
    height: 90vh;
    background-image: url(https://media.istockphoto.com/vectors/parking-in-city-vector-id1130876494?k=20&m=1130876494&s=612x612&w=0&h=aEZAWPkszgjmki_nyFtskUGsKUv_IOw6Ue-MTyOo7tc=);
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;
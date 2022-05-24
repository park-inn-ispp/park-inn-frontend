import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { colors } from '../theme';

export const Global = styled.div`
    width: 100%;
    height: 89%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`;

export const Wrapper = styled.div`
    padding-top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(https://media.istockphoto.com/vectors/parking-in-city-vector-id1130876494?k=20&m=1130876494&s=612x612&w=0&h=aEZAWPkszgjmki_nyFtskUGsKUv_IOw6Ue-MTyOo7tc=);
    background-size: contain;
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
        padding-left: 25px;
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
    font-weight: bold;

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
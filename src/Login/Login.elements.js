import styled from "styled-components";
import {colors} from "../theme";
import { Link } from "react-router-dom";

<link href="https://fonts.googleapis.com/css2?family=Radio+Canada&family=Roboto:ital,wght@1,500&display=swap" rel="stylesheet"></link>

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-image: url(https://img.freepik.com/foto-gratis/vista-aerea-abejon-carretera-trafico-urbano-ciudad-moderna-atasco-trafico-arriba_136401-3205.jpg);
    background-size: cover;
    
`;

export const Wrapper = styled.div`
    background-color: ${colors.second};
    border-radius: 20px;
    width: 60vh;
    height: 90vh;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.53);
    @media screen and (max-width: 600px){
        width: 40vh;
    }
`;

export const Icon = styled.div`
    width: 100%;
    height: 33%;
`;

export const LoginInputs = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: monospace;
`;

export const InputInicio = styled.input`
    height: 20%;
    width: 70%;
    margin-bottom: 30px;
    border-radius: 20px;
    border-style: solid;
    border-color: #bbb;
    
`;

export const Submit = styled.button`
    padding: 7px;
    background-color: ${colors.fourth};
    color: #fff;
    border-radius: 20px;
    width: 60%;
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 10px;
    font-family: monospace;
    border: none;

    &:hover{
        background-color: ${colors.third};
        transition: all 0.5s ease;
    }
`;

export const Label = styled.label`
    font-size: 18px;
    color: ${colors.fivth};
    font-family: monospace;
`;

export const Registro = styled(Link)`
    font-family: monospace;
`;

export const Title = styled.p`
    margin-top: 40px;
    font-size: 50px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
    color: ${colors.fivth};
`;
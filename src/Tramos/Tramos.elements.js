import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../theme";

export const Enlace = styled(Link)`
    color: white;
    background-color: ${colors.fourth};
    border-style: solid;
    border-radius: 10px;
    padding: 15px;
    width: 70%;
    text-decoration: none;
    font-weight: bold;

    &:hover{
        color: white;
        background-color: ${colors.fivth};
        transition: all 0.5s ease;
    }
`;

export const Full = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    @media screen and (max-width:800px){
        margin-top: 40px;
    }
    
`;

export const Frase = styled.div`
    font-size: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    padding: 15px;
`;

export const Tabla = styled.table`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width:800px){
        width: 90%;
        display: block;
    }
`;
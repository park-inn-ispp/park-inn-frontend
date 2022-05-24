import styled from "styled-components";
import { colors } from "../theme";
import { Link } from "react-router-dom";

export const Principal = styled.div`
    width: auto;
    height: auto;
    display: inline-block;
    //flex-wrap: wrap;
    //justify-content: space-between;
    //align-items: right;

    @media screen and (max-width: 600px){
        margin-left: 10px;
    }
`;

export const Tarjeta = styled(Link)`
    width: 500px;
    height: auto;
    background-color: white;
    border-width: 3px;
    border-radius: 20px;
    margin-bottom: 30px;

    cursor: pointer;
    text-decoration: none;
    box-shadow: 6px 8px 6px -6px black;

    &:hover{
        transition: all 0.5s ease;
    }

    @media screen and (max-width: 600px){
        height: auto;
        width: 90vw;
        margin-right: 10px;
        margin-top: 0;
    }
`;
export const Direccion = styled.header`
    background-color: ${colors.fourth};
    font-weight: 400;
    font-family: monospace;
    font-size: 20px;
    font-weight: 300;
    color: white;
    border-top: #3368AD;
    border-top-right-radius: 18px;
    border-top-left-radius: 18px;
    width: 100%;
    border-color: ${colors.fivth};
    padding: 6px;
`;

export const Datos = styled.p`
    color: ${colors.fivth};
    font-size: 19px;
    font-family: monospace;
    padding-top: 15px;
`;

export const Botones = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

export const Editar = styled(Link)`
    padding: 10px;
    border-radius: 10px;
    width: 30%;
    background-color: ${colors.fourth};
    text-decoration: none;
    color: white;
    border-color: black;
    border-width: 3px;
    font-family: monospace;
    font-size: 18px;

    &:hover{
        color: white;
        transform: scale(1.05);
        transition: all 0.5s ease;
    }
`;

export const Eliminar = styled(Link)`
    padding: 10px;
    border-radius: 10px;
    width: 30%;
    background-color: rgb(193 42 70);
    text-decoration: none;
    color: white;
    border-color: black;
    border-width: 3px;
    font-family: monospace;
    font-size: 18px;

    &:hover{
        color: white;
        transform: scale(1.05);
        transition: all 0.5s ease;
    }
`;

export const Reservas = styled(Link)`
    padding: 10px;
    border-radius: 10px;
    width: 30%;
    background-color: ${colors.third};
    text-decoration: none;
    color: white;
    border-color: black;
    border-width: 3px;
    font-family: monospace;
    font-size: 18px;

    &:hover{
        color: white;
        transform: scale(1.05);
        transition: all 0.5s ease;
    }
`;
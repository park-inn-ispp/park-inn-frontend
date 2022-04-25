import styled from "styled-components";
import { colors } from "../theme";
import { Link } from "react-router-dom";

export const Principal = styled.div`
    width: 350px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: right;
`;

export const Tarjeta = styled.div`
    width: 390px;
    height: 53%;
    background-color: lightblue;
    border-width: 3px;
    border-radius: 20px;
    border-style: solid;
    border-color: ${colors.fivth};
    margin-bottom: 50px;
    justify-content: center;
    margin-right: 30px;

    @media screen and (max-width: 500px){
        height: 280px;
        width: 315px;
    }
    @media screen and (min-width: 1300px){
        height: 295px;
        width: 315px;
    }
`;
export const Direccion = styled.header`
    background-color: #3368AD;
    font-weight: 400;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 18px;
    color: white;
    border-top: #3368AD;
    border-top-right-radius: 18px;
    border-top-left-radius: 18px;
    border-bottom-style: solid;
    width: 100.5%;
    border-color: ${colors.fivth};
`;

export const Datos = styled.p`
    color: ${colors.fivth};
    font-weight: 400;
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding: 5px;
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
    border-style: solid;
    text-decoration: none;
    color: white;
    border-color: black;
    border-width: 3px;

    &:hover{
        color: white;
        transform: scale(1.05);
    }
`;

export const Eliminar = styled(Link)`
    padding: 10px;
    border-radius: 10px;
    width: 30%;
    background-color: rgb(193 42 70);
    border-style: solid;
    text-decoration: none;
    color: white;
    border-color: black;
    border-width: 3px;

    &:hover{
        color: white;
        transform: scale(1.05);
    }
`;

export const Reservas = styled(Link)`
    padding: 10px;
    border-radius: 10px;
    width: 30%;
    background-color: ${colors.third};
    border-style: solid;
    text-decoration: none;
    color: white;
    border-color: black;
    border-width: 3px;

    &:hover{
        color: white;
        transform: scale(1.05);
    }
`;
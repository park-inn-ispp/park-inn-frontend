import styled from "styled-components";
import { colors } from "../theme";
import { Link } from "react-router-dom";

export const  Cover = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 50px;
  border-style: solid;
  border-radius: 20px;
  background-color: #edf7f8;

  @media screen and (max-width: 600px) {
      width: 90%;
    }
`;

export const Reserva = styled.h1`
    width: 100%;
    background-color: ${colors.fivth};
    color: white;
    padding: 5px;
    border-style: solid;
    border-top-right-radius: 17px;
    border-top-left-radius: 17px;
    border-color: ${colors.fivth};
    margin: 0;
`;

export const Tabla = styled.table`
    width: 100%;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
`;

export const Columna = styled.thead`
    @media screen and (max-width: 600px) {
      display: none;
    }
`;

export const TR = styled.tr`
    
    @media screen and (max-width: 600px) {
        background-color: inherit;
        width: 10%;
    }
`;

export const TH = styled.th`
    font-weight: 500;
    color: #2b686e;
    background-color:  #edf7f8;

    @media screen and (max-width: 600px) {
       display: flex;
       flex-direction: column;
    }
`;


export const TD = styled.td`
    border-bottom-right-radius: 17px;
    border-bottom-left-radius: 17px;
    padding: 0;
    

    @media screen and (max-width: 600px) {
        display: block;
        text-align:center;
        width: 100%;
        margin-bottom: 10px;
    }

`;

export const Fila = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: auto;
`;

export const Enlace = styled(Link)`
    color: white;
    background-color: ${colors.fourth};
    border-style: solid;
    border-radius: 10px;
    padding: 7px;
    width: 70%;
`;
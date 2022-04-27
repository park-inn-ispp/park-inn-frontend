import styled from "styled-components";
import { colors } from "../theme";

export const Global = styled.div`
  width:  100%;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
`;

export const Formulario = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 60%;
  margin: auto;
  background:  #f1f7fe;
  border-radius: 30px;
  border-style: solid;

  @media screen and (max-width:800px){
      width: 100%;
  }
`;

export const Title = styled.h1`
    width: 100%;
    border-top-right-radius: 27px;
    border-top-left-radius: 27px;
    border-style: solid;
    background-color: ${colors.fivth};
    border-color: ${colors.fivth};
    color: white;
    padding: 10px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`;

export const Line = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
    border-bottom-style: solid;
    border-width: 0.5px;
    border-color: gray;
    padding-bottom: 10px;
    margin-top: 10px;
`;

export const Datos = styled.input`
    width: 60%;
    border-radius: 20px;
    font-size: 18px;
    text-align: center;
    margin-left: 10px;
    border-style: solid;
    border-color: ${colors.fivth};
    padding: 5px;

    @media screen and (max-width:800px){
      width: 65%;
  }
`;

export const Etiqueta = styled.label`
    font-size: 18px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    width: 30%;

    @media screen and (max-width:800px){
        font-size: 16px;
        width: 25%;
        margin-right: 15px;
    }
    
`;

export const Selector = styled.select`
    width: 60%;
    border-radius: 20px;
    font-size: 20px;
    text-align: center;
    margin-left: 10px;
`;

export const EnvioForm = styled.input`
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
    &:hover{
        background-color: ${colors.fivth};
        transition: all 0.5s ease;
    }
`;


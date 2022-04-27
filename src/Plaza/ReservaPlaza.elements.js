import styled from 'styled-components'
import { colors } from '../theme';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width:  100%;
  height: 100%;
  border-radius: 10px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  margin-top: 20px;
  margin-bottom: 20px;
  //padding: 15px;

  @media screen and (max-width:800px){
      width: 90%;
  }
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

export const Line = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
    border-bottom-style: solid;
    border-width: 0.5px;
    border-color: gray;
    padding-bottom: 12px;
    margin-top: 10px;  
`;

export const Etiqueta = styled.label`
    font-family: sans-serif;
    font-size: 22px;
    font-weight: bold;
    width: 60%;

    @media screen and (max-width: 500px){
        font-size: 18px;
    }
`;

export const Title = styled.h1`
    width: 100%;
    border-style: solid;
    background-color: #1A5097;
    border-color: ${colors.fivth};
    color: white;
    padding: 10px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`;

export const Parrafo = styled.div`
    font-family: sans-serif;
    font-size: 22px;
    width: 40%;
    
    @media screen and (max-width: 600px){
        font-size: 18px;
        overflow: scroll;
    }
`;

export const Precio = styled.div`
    font-family: sans-serif;
    font-size: 35px;
    width: 40%;
    overflow: scroll;
    color: green;
    font-weight: bolder;
    
    @media screen and (max-width: 500px){
        font-size: 35px;
    }
`;

export const BotonCalendario = styled(Link)`
    border-style: solid;
    background-color: ${colors.fourth};
    border-radius: 10px;
    padding: 10px;
    color: white;
    text-decoration: none;
    width: 70%;
    font-weight: bold;

    &:hover{
        color: white;
        background-color: ${colors.fivth};
        transition: all 0.5s ease;
    }
`;

export const EnvioForm = styled.input`
    width: 60%;
    padding: 5px;
    border-style: solid;
    background-color: ${colors.fourth};
    color: white;
    border-radius: 30px;
    margin-top: 13px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
    &:hover{
        background-color: ${colors.fivth};
        transition: all 0.5s ease;
    }
`;

export const Back = styled.button`
    padding: 5px;
    background-color: ${colors.fivth};
    color: white;
    font-weight: bold;
    font-size: 20px;
    width: 50%;
    border-radius: 30px;

    &:hover{
        background-color: ${colors.fourth};
        transition: all 0.5s ease;
    }
`;
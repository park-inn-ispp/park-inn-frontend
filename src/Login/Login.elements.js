import styled from "styled-components";
import {colors} from "../theme";
import { Link } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
`;

export const Wrapper = styled.div`
    background-color: #F1F7FE;
    border-radius: 20px;
    width: 60vh;
    height: 90vh;

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
    background-color: ${colors.fivth};
    color: #fff;
    border-radius: 25px;
    width: 60%;
    font-weight: bold;
    font-size: large;
    font-family: sans-serif;
    margin-bottom: 10px;

    &:hover{
        background-color: ${colors.fourth};
        transition: all 0.5s ease;
    }
`;

export const Label = styled.label`
    font-size: 18px;
    color: ${colors.fivth};
    font-family: sans-serif;
`;

export const Registro = styled(Link)`
    font-family: sans-serif;
`;

export const Title = styled.p`
    margin-top: 40px;
    font-size: 50px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: ${colors.fivth};
`;
import styled from "styled-components";

export const Title = styled.h2`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
`;

export const Wrapper = styled.div`
    height: 100%;
    padding: 30px;
	background: #b4d7f3;
	border-radius: 6px;
`;

export const StyledForm = styled.form` 
    font-family: monospace;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:60%;
	padding:30px;
	margin:auto;
	background: lightblue;
	border-radius: 10px;
	-webkit-border-radius:10px;
	-moz-border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
	-moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
	-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);

    @media screen and (max-width: 650px){
        width: 100%;
    }
`;

export const InputForm = styled.input`
    width: 80%;
    padding: 5px;
    border-radius: 15px;
    @media screen and (max-width: 650px){
        width: 100%;
    }
`;

export const CheckBox = styled.input`
    width: 1.4em;
    height: 1.4em;
    margin-top: 0.25em;
    margin-right: 30px;
    vertical-align: top;
    background-color: #fff;
`;

export const Etiqueta = styled.label`
    flex-direction: row;
    font-family: monospace;
    font-size: 18px;
`;

export const ErrorMessage = styled.span`
    margin-top: -5px;
    color: red;
`;

export const Div = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;



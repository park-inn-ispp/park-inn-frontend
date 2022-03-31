import styled from 'styled-components'

export const Container = styled.div`
`;

export const Wrapper = styled.div`
    height: 100%;
    padding: 30px;
	background: #b4d7f3;
	border-radius: 6px;
    
`;

export const StyledForm = styled.form`
    
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
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);

    @media screen and (max-width: 650px){
        width: 100%;
    }
`;

export const InputForm = styled.input`
    width: 80%;
    padding: 5px;
    border-radius: 15px;
    margin-bottom: 20px;
    @media screen and (max-width: 650px){
        width: 100%;
    }
`;

export const CheckBox = styled.input`
    transform: scale(1.7);
    margin-right: 15px;
    margin-top: 20px;
    transition: 0.5s all ease;
`;

export const Etiqueta = styled.label`
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell;
    font-size: 18px;
`;

export const ErrorMessage = styled.span`
    color: red;
`;

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;


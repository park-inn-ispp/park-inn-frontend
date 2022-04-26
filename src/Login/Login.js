import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import call from "../Util/Caller";
import Logo from "../components/Logo";
import displayNotification from "../Util/Notifications";
import { Container, Wrapper, Icon, LoginInputs, Submit, InputInicio, Label, Registro, Title } from "./Login.elements";

const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            email: '',
            password: '',
            recuerdame: false
        },
      
        user_password : undefined
  
    }

    handleChange=async e=>{
        if(e.target.name==="recuerdame"){
            await this.setState({
                form:{
                    ...this.state.form,
                    [e.target.name]: e.target.checked
                }
            });
        }else{
            await this.setState({
                form:{
                    ...this.state.form,
                    [e.target.name]: e.target.value
                }
            });
        }
       
    }

    
     iniciarSesion=async()=>{
        const data= {
            nameOrEmail: this.state.form.email,
            password:this.state.form.password
        }
        call(`/api/auth/signin`,"POST",data)
            .then(async response  =>  {

                if(response !== undefined && response.ok){
                let respuestaTexto= await response.text()
                let auth_token = await respuestaTexto.split(" ")[1]
                let emailLogeado =  await respuestaTexto.split(" ")[0]
                

                cookies.set("AuthToken",auth_token)

                call('/clients/usuariopormail/'+emailLogeado, 'GET').then(async response => {

                    if(response !== undefined && response.ok){
                        const usuario = await response.json()               
                        cookies.set("UserData",usuario);
                        window.location.href="./";     

                    }else{
                        cookies.remove("AuthToken");
                        localStorage.removeItem("AuthToken");
                    }


                });
                    

             }else{

                if(data.nameOrEmail &&  data.password){
                    displayNotification("Error","Usuario o contraseña incorrectos","danger")
    
                }else{
                    displayNotification("Error","Debes de rellenar los datos","danger")
                }
             }
        })
   
     }

    componentDidMount() {
        document.getElementById("navbar-parkinn").setAttribute("hidden",true)
    }
    

    render() {
        return (
            <Container>
                <Wrapper className="container_body">
                    <Title>PARK-INN</Title>
                    <Icon className='parkinn-icon'>
                        <Logo className="logo"/>
                    </Icon>
                    <LoginInputs>
                        <Label>Correo electrónico:</Label>
                        <InputInicio type="text" name="email" placeholder="usuario@gmail.com" onChange={this.handleChange}/>
                        <Label>Contraseña:</Label>
                        <InputInicio type="password" name="password" placeholder="*********" onChange={this.handleChange}/>
                    </LoginInputs>
                    <div>
                        <Submit onClick={()=> this.iniciarSesion()}>Iniciar Sesión</Submit>
                    </div>
                    <Registro to="/register">Registrarme</Registro>
                </Wrapper>
            </Container>
        );
    }
}

export default Login;
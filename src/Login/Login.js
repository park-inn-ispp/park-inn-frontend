import React, { Component } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import call from '../Util/Caller';
import Logo from '../components/Logo';
import Input from '../components/Input/Input';
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            email: '',
            password: ''
        }
    }

    
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    
     iniciarSesion=async()=>{
    //     const data= {
    //         "email": this.state.form.email,
    //         "password":this.state.form.password
    //     }

      
    //     call(`/clients/login`,"POST",data)
    //         .then(async response  =>  {
    //         if(response.ok && await response.json()==="SUCCESS"){
    //             cookies.set('email', data.email, {path: "/"});
    //             window.location.href="./";           
    //             console.log("cookie en navegador")

    //         }
    //         return response.data;
    //     })
    //     .catch(error=>{
    //         console.log(error);
    //     })
        console.log("hola")
     }

    componentDidMount() {
        // if(cookies.get('email')){
        //     window.location.href="./";
        // }
        document.getElementById("navbar-parkinn").setAttribute("hidden",true)
        document.getElementById("footer-parkinn").setAttribute("hidden",true)
    }
    

    render() {
        return (
            <div className='login'>
                <div className="container_body">
                    <div className='parkinn-icon'>
                        <Logo className="logo" margin-top="500px" />
                    </div>
                    <div className='login-inputs'>
                    
                    <div className='input'>
                        <div className='label'>Dirección mail</div>
                        <input type="text" name="email" placeholder="alguien@gmail.com" onChange={this.handleChange}></input>
                    </div>   

                    <div className='input'>
                        <div className='label'>Contraseña</div>
                        <input type="password" name="password" placeholder="password123" onChange={this.handleChange}></input>
                    </div>    

                    </div>
                    <div className='login-footer'>
                        <button className='button-login' onClick={()=> this.iniciarSesion()}>Log In</button>
                        <div className='signup'>
                            <span className='span-signup'>Registrame</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
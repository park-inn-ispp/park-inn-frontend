import React, { Component } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import call from '../Util/Caller';
import Logo from '../components/Logo';
import Input from '../components/Input/Input';
import jwt_decode from 'jwt-decode';
import displayNotification from '../Util/Notifications';
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
        if(e.target.name=="recuerdame"){
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
            email: this.state.form.email,
            password:this.state.form.password,
            recuerdame : this.state.form.recuerdame
        }

      
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
        
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

        if(data.email=="admin" && data.password=="123"){
            cookies.set("AuthToken",token)
            
            if(data.recuerdame){
                localStorage["AuthToken"] = token
            }
            window.location.href="./"
        }else{
            if(data.email &&  data.password){
                displayNotification("Error","Usuario o contraseña incorrectos","danger")

            }else{
                displayNotification("Error","Debes de rellenar los datos","danger")
            }
            
        }
       
   
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

                    <input className="checkb-input" name="recuerdame" type="checkbox" onChange={this.handleChange}  />
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
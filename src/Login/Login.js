import React, { Component } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import call from '../Util/Caller';
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
        const data= {
            "email": this.state.form.email,
            "password":this.state.form.password
        }
        

        call(`/clients/login`,"POST",data)
            .then(async response  =>  {
            if(response.ok && await response.json()==="SUCCESS"){
                cookies.set('email', data.email, {path: "/"});
                window.location.href="./";           
                console.log("cookie en navegador")

            }
            return response.data;
        })
        .catch(error=>{
            console.log(error);
        })

    }
    
    componentDidMount() {
        if(cookies.get('email')){
            window.location.href="./";
        }
    }
    

    render() {
        return (
    <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Email: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
        );
    }
}

export default Login;
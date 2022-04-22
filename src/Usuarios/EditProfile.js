import React, { useState,useEffect } from 'react';
import { useParams, Navigate, useNavigate, renderMatches } from 'react-router-dom';
import FormErrorMessage from '../Util/FormErrorMessage';
import { Store } from 'react-notifications-component'
import { ReactNotifications } from 'react-notifications-component'
import displayNotification from '../Util/Notifications';
import 'react-notifications-component/dist/theme.css'
import call from '../Util/Caller';
import Cookies from 'universal-cookie';
import ValidateProfileForm from './ValidateProfileForm';


const cookies = new Cookies();

export default function EditProfile(){

    let navigate = useNavigate();
    const[form, setForm] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        surname:""
    })

    const [miPerfil, setMiPerfil] = useState(false);
    const id = parseInt(useParams().id)

    useEffect(() => {
        DetallesPerfil()
    }, []);

    const DetallesPerfil = async () => {
        const data = await call(`/clients/${id}`, "GET")
        if(data.ok){
            setMiPerfil(true)
        }

        const perfil = await data.json();
        setForm({
            ["name"]: "" + perfil.name,
            ["email"]: "" + perfil.email,
            ["password"]: "" + perfil.password,
            ["phone"]: "" + perfil.phone,
            ["surname"]: "" + perfil.surname,
        })
        console.log("1========", form["name"])
    }

        const [errors, setErrors] = useState({})

        const handleSubmit = evt => {
            evt.preventDefault()
            var nuevosErrores = ValidateProfileForm(form)
            setErrors(nuevosErrores)

            const usuario = cookies.get('UserData');
            var numeroErrores = Object.keys(nuevosErrores).length;
            //console.log("Numero errores ", numeroErrores)
            if(numeroErrores===0){
                const data2 = {
                    "id": id,
                    "name": form.name,
                    "email": form.email,
                    "password": form.password,
                    "phone": form.phone,
                    "surname": form.surname
                }
                console.log("XXXXX", data2["phone"])
                call(`/clients/${id}`, "PUT", data2)
                .then(response => {
                    if(response.ok){
                        displayNotification("Éxito", "Perfil editado correctamente", "success")
                        navigate(`/clients/view/${id}`)
                    }

                })
                console.log("===Data====",data2["email"])
            }
        }

        const handleChange = evt => {
            const target = evt.target
            const name = target.name

            var value = target.value

            if(target.type == 'select-one'){
                value = target.value == 'true' ? true : false
            }
            setForm({...form,[name]: value})
        }

        if(miPerfil){
            return(
                <div class="form-style-10">
                    <h1>Editar perfil</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="section"><span>1</span>Dirección</div>
                        <div className="inner-wrap">
                            <label>
                                Nombre:
                                <input onChange={handleChange} name="name" type="text" value={form.name}/>
                                <FormErrorMessage jsonErrors={errors} errorName="name"/>

                            </label>

                            <label>
                                Email:
                                <input onChange={handleChange} name="email" type="text" value={form.email}/>
                                <FormErrorMessage jsonErrors={errors} errorName="email"/>
                            </label>

                            <label>
                                Contraseña
                                <input onChange={handleChange} name="password" type="text" value={form.password}/>
                                <FormErrorMessage jsonErrors={errors} errorName="password"/>
                            </label>

                            <label>
                                Telefono
                                <input onChange={handleChange} name="phone" type="text" value={form.phone}/>
                                <FormErrorMessage jsonErrors={errors} errorName="phone"/>
                            </label>

                            <label>
                                Apellidos
                                <input onChange={handleChange} name="surname" type="text" value={form.surname}/>
                                <FormErrorMessage jsonErrors={errors} errorName="surname"/>
                            </label>
                        </div>
                        <input type="submit" value="Editar perfil"/>
                        
                    </form>
                

                </div>
            );
        }else{
            return(<></>)
        }

    
}   
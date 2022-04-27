import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormErrorMessage from '../Util/FormErrorMessage';
import displayNotification from '../Util/Notifications';
import 'react-notifications-component/dist/theme.css'
import call from '../Util/Caller';
import ValidateProfileForm from './ValidateProfileForm';
import Loading from '../components/Loading';
import { Datos, EnvioForm, Etiqueta, Formulario, Line, Title } from '../Plaza/EditPlaza.elements';
import { Global2 } from './ViewProfileElements';

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
            var numeroErrores = Object.keys(nuevosErrores).length;
            if(numeroErrores===0){
                const data2 = {
                    "id": id,
                    "name": form.name,
                    "email": form.email,
                    "password": form.password,
                    "phone": form.phone,
                    "surname": form.surname
                }
                call(`/clients/${id}`, "PUT", data2)
                .then(response => {
                    if(response.ok){
                        displayNotification("Éxito", "Perfil editado correctamente", "success")
                        navigate(`/clients/view/${id}`)
                    }
                })
            }
        }

        const handleChange = evt => {
            const target = evt.target
            const name = target.name

            var value = target.value

            if(target.type === 'select-one'){
                value = target.value === 'true' ? true : false
            }
            setForm({...form,[name]: value})
        }

        if(miPerfil){
            return(
                <Global2>
                    <Formulario onSubmit={handleSubmit}>
                        <Title>Editar Perfil</Title>
                        <Line>
                            <Etiqueta>Nombre:</Etiqueta>
                            <Datos onChange={handleChange} name= "name" type="text" value={form.name}/>
                            <FormErrorMessage jsonErrors={errors} errorName="name"/>
                        </Line>

                        <Line>
                            <Etiqueta>Apellidos:</Etiqueta>
                            <Datos onChange={handleChange} name= "surname" type="text" value={form.surname}/>
                            <FormErrorMessage jsonErrors={errors} errorName="surname"/>
                        </Line>

                        <Line>
                            <Etiqueta>Teléfono:</Etiqueta>
                            <Datos onChange={handleChange} name= "phone" type="text" value={form.phone}/>
                            <FormErrorMessage jsonErrors={errors} errorName="phone"/>
                        </Line>

                        <Line>
                            <Etiqueta>Correo:</Etiqueta>
                            <Datos onChange={handleChange} name= "email" type="text" value={form.email}/>
                            <FormErrorMessage jsonErrors={errors} errorName="email"/>
                        </Line>

                        <Line>
                            <Etiqueta>Contraseña:</Etiqueta>
                            <Datos onChange={handleChange} name= "password" type="text" value={form.password}/>
                            <FormErrorMessage jsonErrors={errors} errorName="password"/>
                        </Line>
                        
                        <EnvioForm type="submit" value="Guardar cambios" />      
                    </Formulario>
                </Global2>
            );
        } else{
            return(
                <Loading></Loading>
            )
        }   
}   
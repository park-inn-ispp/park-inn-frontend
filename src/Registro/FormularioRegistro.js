import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario/Formulario";
import Terminos from "../components/Terminos y Condiciones/Terminos";
import call from "../Util/Caller";

export default function FormularioRegistro(){
    let template = {
        title: "Registro nuevo usuario",
        fields: [{
            title: "Nombre:",
            type: "text",
            name: "name",
            placeholder: "Nombre",
            validationProps: { required: "El nombre es un campo obligatorio"}
        },
        {
            title: "Apellidos::",
            type: "text",
            name: "surname",
            placeholder: "Apellidos",
            validationProps: { required: "Los apellidos es un campo obligatorio"}
        },
        {
            title: "Teléfono:",
            type: "tel",
            name: "phone",
            placeholder: "+34 000 000 000",
            validationProps: { required: "El teléfono es un campo obligatorio"}
        },
        {
            title: "Correo electrónico:",
            type: "email",
            name: "email",
            placeholder: "usuario@dominio.com",
            validationProps: { required: "El correo electrónico es un campo obligatorio"}
        },
        {
            title: "Contraseña:",
            type: "password",
            name: "password",
            validationProps: { required: "La contraseña es un campo obligatorio"}
        },
        {
            title: "Confirmar contraseña:",
            type: "password",
            name: "confirm",
            validationProps: { required: "No coincide con la contraseña original"}
        },
        {
            title: "",
            type: "checkbox",
            name: "terms",
            validationProps: { required: "Debe aceptar los términos y condiciones de uso"}
        }
    ]   
    }

    let navigate = useNavigate();
    const onSubmit= evt => {
        call('/api/auth/signup', "POST", evt)
        .then (response => { 
            if (response.ok){ 
            navigate('/')
        }
        })
    }

    function validate(watchValues, errorMethods){
        let {errors, setError, clearErrors} = errorMethods
        //Validación nombre no puede ser admin
        if ( watchValues["name"] === "admin"){
            if(!errors['name']){
                setError('name', {
                    type: 'manual',
                    message: 'No puedes usar este nombre de usuario'
                });
            }
        } else{
            if (errors['name'] && errors['name']['type'] === 'manual'){
                clearErrors('name');
            }
        }
        //Validación de contraseñas iguales  
        if ( watchValues["password"] !== watchValues["confirm"]){
            if(!errors['confirm']){
                setError('confirm', {
                    type: 'manual',
                    message: 'No coinciden las contraseñas'
                }); 
            }   
        } else{
            if (errors['confirm'] && errors['confirm']['type'] === 'manual'){
                clearErrors('confirm');
            }
        }
    }

    return(
        <>
        <Formulario validate={validate} watchFields={["name","phone","password", "confirm"]} 
        template={template} onSubmit={onSubmit}/>   
        </>
    )   


}
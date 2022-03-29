import React from "react";
import Formulario from "../components/Formulario/Formulario";

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
            title: "Confirmar correo electrónico:",
            type: "email",
            name: "confirmEmail",
            validationProps: {required: "No coincide con el correo original"} 
        },
        {
            title: "Contraseña:",
            type: "password",
            name: "password",
            validationProps: { required: "La contraseña debe contener 7 caracteres o más"}
        },
        {
            title: "Confirmar contraseña:",
            type: "password",
            name: "confirmPassword",
            validationProps: { required: "No coincide con la contraseña original"}
        },
        {
            title: "",
            type: "checkbox",
            name: "acceptTerms",
            validationProps: { required: "Debe aceptar los términos y condiciones de uso"}
        }
    ]   
    }

    function onSubmit(values){
        console.log(values)
    }

    return(
        <Formulario template={template} onSubmit={onSubmit}/>
    )   
}
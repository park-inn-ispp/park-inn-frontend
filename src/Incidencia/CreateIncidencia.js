import React, { useState } from 'react';
import ValidateIncidenciaForm from './ValidateIncidenciaForm';
import { useParams, useNavigate } from 'react-router-dom';
import FormErrorMessage from '../Util/FormErrorMessage';
import {Etiqueta, Parrafo} from '../Plaza/ReservaPlaza.elements';
import { ReactNotifications } from 'react-notifications-component'
import call from '../Util/Caller';
import Cookies from 'universal-cookie';
import { Global2 } from '../Usuarios/ViewProfileElements';
import { Title, Wrapper } from '../Plazas/PlazasList.elements';
import { EnvioForm, Formulario, Line } from '../Plaza/EditPlaza.elements';
import { Datos } from '../components/CardReservas.elements';
const cookies = new Cookies();
const email = cookies.get('user_mail');

export default function CreateIncidencia() {
    const reservaId = parseInt(useParams().id)
    let navigate = useNavigate();
    const [form, setForm]= useState({
        titulo: "",
        descripcion: "",
        estado: "",
        fecha: "",
        email: "",
        idReserva: "",
    })
    const[errors, setErrors]= useState({})
    const handleSubmit= evt => {
        evt.preventDefault()
        var nuevosErrores= ValidateIncidenciaForm(form)
        setErrors(nuevosErrores)
        var numeroErrores = Object.keys(nuevosErrores).length;
        if(numeroErrores===0){
            const data= {
            "titulo": form.titulo,
            "descripcion": form.descripcion,
            "estado": "pendiente",
            "fecha": new Date(),
            "email": {
              "email" : email
            },
            "reserva": {
              "id" : reservaId
            }
            }
            call('/incidencias',"POST", data)
                .then(response => {
                if (response.ok){
                  call('/reservas/'+reservaId+'/denegar','GET').then(response=>{console.log(response.ok)}).then(navigate(`/mis-reservas`))
                }
            })
        }
    }
    
    const handleChange= evt => {
      const target = evt.target
      const name = target.name
      var value= target.value
      setForm({...form,[name]: value})
    }

  return (
    
  <Global2>
    
    <ReactNotifications />
    <Formulario onSubmit={handleSubmit}>
      <Title>Crear incidencia</Title>
      <Line>
        <Etiqueta>Título:</Etiqueta>
        <input onChange={handleChange} name= "titulo" type="text" value={form.titulo}/>
        <FormErrorMessage jsonErrors={errors} errorName="titulo"/>
      </Line>

      <Line>
        <Etiqueta>Descripción:</Etiqueta>
        <textarea onChange={handleChange} name= "descripcion" type="text" value={form.descripcion}/>
        <FormErrorMessage jsonErrors={errors} errorName="descripcion"/>
      </Line>
      
      <EnvioForm type="submit" value="Crear incidencia"/>
    </Formulario>
  </Global2>
  );
}
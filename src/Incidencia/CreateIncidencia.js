import React, { useState } from 'react';
import ValidateIncidenciaForm from './ValidateIncidenciaForm';
import { useParams, useNavigate } from 'react-router-dom';
import FormErrorMessage from '../Util/FormErrorMessage';
import {Etiqueta, Parrafo, Formulario} from '../Plaza/ReservaPlaza.elements';
import { ReactNotifications } from 'react-notifications-component'
import call from '../Util/Caller';
import Cookies from 'universal-cookie';
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
            "user": {
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
    
  <div className="form-style-10">
    <h1>Crear incidencia</h1>
    <ReactNotifications />
    <Formulario onSubmit={handleSubmit}>
      <div class="inner-wrap">
        <Etiqueta>Título:</Etiqueta>
        <Parrafo>
          <input onChange={handleChange} name= "titulo" type="text" value={form.titulo}/>
          <FormErrorMessage jsonErrors={errors} errorName="titulo"/>
        </Parrafo>
        <Etiqueta>Descripción:</Etiqueta>
        <Parrafo>
          <textarea onChange={handleChange} name= "descripcion" value={form.descripcion}/>
          <FormErrorMessage jsonErrors={errors} errorName="descripcion"/>
        </Parrafo>
      </div>
      <input type="submit" value="Crear incidencia"/>
    </Formulario>
  </div>
  );
}
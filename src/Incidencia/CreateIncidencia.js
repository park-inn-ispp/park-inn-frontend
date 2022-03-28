import React, { useState } from 'react';
import ValidateIncidenciaForm from './ValidateIncidenciaForm';
import { useParams, useNavigate } from 'react-router-dom';
import FormErrorMessage from '../Util/FormErrorMessage';
import call from '../Util/Caller';

export default function CreateIncidencia() {
    const reservaId = parseInt(useParams().id)
    let navigate = useNavigate();
  
    const [form, setForm]= useState({
        fecha: "",
        titulo: "",
        descripcion: "",
        idUsuario: "",
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
            //"idIncidencia"
            "fecha": new Date(),
            "titulo": form.titulo,
            "descripcion": form.descripcion,
            "idUsuario": '',
            //"estado": '', //abierta,cerrada, pending
            "idReserva": reservaId,
            }
      
            call('/incidencia/new',"POST", data)
                .then(response => {
                console.log(response.ok)
                if (response.ok){
                    navigate(`/mis-plazas`)
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
    <form onSubmit={handleSubmit}>

    <div className="inner-wrap">
      <label>
      Título:
        <input onChange={handleChange} name= "titulo" type="text" value={form.titulo} />
        <FormErrorMessage jsonErrors={errors} errorName="titulo"/>
      </label>
      <br/>
      <label>
      Descripción:
        <textarea  onChange={handleChange} name= "descripcion" value={form.descripcion}/>
        <FormErrorMessage jsonErrors={errors} errorName="descripcion"/>
      </label>
      </div>
      <input type="submit" value="Crear incidencia" />
    </form>
  </div>
  );
}
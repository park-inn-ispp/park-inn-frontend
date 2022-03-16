import React, { useState } from 'react';
import validateParkingForm from './ValidateParkingForm';

export default function CreateParking() {
 

  const [form, setForm]= useState({
    direccion:'',
    precioHora:'',
    fianza: '0',
    ancho:'2.22',
    largo:'4.50',
    exterior:false,
    descripcion:''
  })

  const[errors, setErrors]= useState({})
  
  const handleSubmit= evt => {
   
    evt.preventDefault()
    setErrors(validateParkingForm(form))
     //llamar a la API pasando el form como cuerpo del POST
   
  }

  const handleChange= evt => {
    const target = evt.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
   
    setForm({...form,[name]: value})
    console.log(form)
  }
  
  return (
  <form onSubmit={handleSubmit}>
    <label>
    Dirección:
      <input onChange={handleChange} name= "direccion" type="text" value={form.direccion}/>
    </label>
    <br/> 
    <label>
        Precio/Hora (€):
        <input onChange={handleChange} name="precioHora" type="number" step="0.01" value={form.precioHora}/>
    </label>
    <br/>
    <label>
        Fianza (€):
        <input onChange={handleChange} name="fianza" type="number" step="0.01" value={form.fianza}/>
    </label>
    <br/>
    <label>
        Ancho (metros):
        <input onChange={handleChange} name="ancho" type="number" step="0.01" value={form.ancho}/>
    </label>
    <br/>
    <label>
        Largo (metros):
        <input onChange={handleChange} name="largo" type="number" step="0.01" value={form.largo}/>
    </label>
    <br/>
    <label>
      Exterior:
      <input onChange={handleChange} name="exterior"  type="radio" value={form.exterior}/>
    </label>
    <label>
      Interior:
      <input onChange={handleChange} name="exterior" type="radio" value={form.exterior} checked />
    </label>
    <br/>
    <label>
    Descripción:
      <input  onChange={handleChange} name= "descripcion" type="text" value={form.descripcion}/>
    </label>
    <br/>
    + Añadir horarios de disponibilidad
    <br/>
    <input type="submit" value="Submit" />
  </form>
  );
}
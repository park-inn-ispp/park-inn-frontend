import React, { useState } from 'react';
import validateParkingForm from './ValidatePlazaForm';
import FormErrorMessage from '../Util/FormErrorMessage';

export default function CreatePlaza() {
 

  const [form, setForm]= useState({
    calle:"",
    numero:"",
    ciudad:"",
    provincia:"",
    codigoPostal:"",
    precioHora:"",
    fianza: "0",
    ancho:"2.22",
    largo:"4.50",
    exterior:false,
    descripcion:'',
  })

  const[errors, setErrors]= useState({})
  
  

  const handleSubmit= evt => {
   
    evt.preventDefault()
    var nuevosErrores= validateParkingForm(form)
    setErrors(nuevosErrores)

    var numeroErrores = Object.keys(nuevosErrores).length;
    if(numeroErrores===0){
      
      
      const data= {
        "direccion": "" + form.calle + "," + form.numero + "," + form.ciudad + "," + form.provincia + "," + form.codigoPostal,
        "precioHora": form.precioHora,
        "fianza": form.fianza,
        "ancho": form.ancho,
        "largo": form.largo,
        "estaDisponible": true,
        "esAireLibre": form.exterior,
        "descripcion": form.descripcion,
        "administrador": {
            "id": 7,
            "name": "Sòng",
            "email": "jcaudle6@blogspot.com"
        }
      }
      console.log(data)
      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'https://park-inn-ispp-fe.herokuapp.com/', "mode": "cors"},
        body: (JSON.stringify(data))
      };
      
      fetch('https://park-inn-ispp-be.herokuapp.com//plazas/', requestOptions)
        .then(response => {
          console.log(response.ok)
        })
      
    }  
    
   
  }

  

  const handleChange= evt => {
    
    const target = evt.target
    const name = target.name
    console.log(name)
    var value= target.value
    
    if (target.type === 'radio'){
      value= target.id === 'exterior' ? true : false
      console.log(value)
    }
    console.log(value)
    setForm({...form,[name]: value})
    
  }
  

  
  return (
    
  <div className="form-style-10">
  <h1>Crear Plaza</h1>
    <form onSubmit={handleSubmit}>

    <div className="section"><span>1</span>Dirección</div>
    <div className="inner-wrap">
      <label>
      Calle:
        <input onChange={handleChange} name= "calle" type="text" value={form.calle}/>
        <FormErrorMessage jsonErrors={errors} errorName="calle"/>
        

      </label>

      <label>
      Número:
        <input onChange={handleChange} name= "numero" type="text" value={form.numero}/>
        
        <FormErrorMessage jsonErrors={errors} errorName="numero"/>

      </label>

      <label>
      Ciudad:
        <input onChange={handleChange} name= "ciudad" type="text" value={form.ciudad}/>
        <FormErrorMessage jsonErrors={errors} errorName="ciudad"/>

      </label>

      <label>
      Provincia:
        <input onChange={handleChange} name= "provincia" type="text" value={form.provincia}/>
        <FormErrorMessage jsonErrors={errors} errorName="provincia"/>
      </label>

      <label>
      Código Postal:
        <input onChange={handleChange} name= "codigoPostal" type="number" value={form.codigoPostal}/>
        <FormErrorMessage jsonErrors={errors} errorName="codigoPostal"/>
      </label>
    </div>

      <br/> 

    <div className="section"><span>2</span>Precios</div>
    <div className="inner-wrap">
      <label>
          Precio/Hora (€):
          <input onChange={handleChange} name="precioHora" type="number" step="0.01" value={form.precioHora}/>
          <FormErrorMessage jsonErrors={errors} errorName="precioHora"/>

      </label>
      <br/>
      <label>
          Fianza (€):
          <input onChange={handleChange} name="fianza" type="number" step="0.01" value={form.fianza}/>
          <FormErrorMessage jsonErrors={errors} errorName="fianza"/>

      </label>
      </div>
      <br/>
      <div className="section"><span>3</span>Características de la plaza</div>
      <div className="inner-wrap">
      <label>
          Ancho (metros):
          <input onChange={handleChange} name="ancho" type="number" step="0.01" value={form.ancho}/>
          <FormErrorMessage jsonErrors={errors} errorName="ancho"/>

      </label>
      <br/>
      <label>
          Largo (metros):
          <input onChange={handleChange} name="largo" type="number" step="0.01" value={form.largo}/>
          <FormErrorMessage jsonErrors={errors} errorName="largo"/>

      </label>
      <br/>
      <label>
        Exterior:
        <input onChange={handleChange} id="exterior" name="exterior"  type="radio" value={form.exterior}/>
        

      </label>
      <label>
        Interior:
        <input onChange={handleChange} id="interior" name="exterior" type="radio" value={form.exterior} defaultChecked/>
        <FormErrorMessage jsonErrors={errors} errorName="exterior"/>
      </label>
      <br/>
      <label>
      Descripción:
        <input  onChange={handleChange} name= "descripcion" type="text" value={form.descripcion}/>
        <FormErrorMessage jsonErrors={errors} errorName="descripcion"/>
      </label>
      </div>
      <br/>
      <br/>
      <input type="submit" value="Crear plaza" />
    </form>
  </div>
  );
}
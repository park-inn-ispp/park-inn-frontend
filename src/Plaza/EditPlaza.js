import React, { useState,useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import validateParkingForm from './ValidatePlazaForm';
import FormErrorMessage from '../Util/FormErrorMessage';
import { Store } from 'react-notifications-component'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

export default function EditPlaza() {

  let navigate = useNavigate();
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

 
  const id = parseInt(useParams().id)

  useEffect(() => {
    DetallesPlaza()
  }, []);

  const DetallesPlaza = async () => {
    const data = await fetch(`https://park-inn-ispp-be.herokuapp.com/plazas/${id}`)
    const plaza = await data.json()
    var direccion = plaza["direccion"]  // DESCOMENTAR ESTO
    //var direccion= "Calle Castillo de Alcala de Guadaira,25,Sevilla,Sevilla,41013" // ELIMINAR ESTO
    var arrayDireccion= direccion.split(",")
    console.log(arrayDireccion)

    setForm({
      ["calle"]: "" + arrayDireccion[0],
      ["numero"]: "" + arrayDireccion[1],
      ["ciudad"]: "" + arrayDireccion[2],
      ["provincia"]: "" + arrayDireccion[3],
      ["codigoPostal"]: "" + arrayDireccion[4],
      ["precioHora"]: "" + plaza["precioHora"],
      ["fianza"]: "" + plaza["fianza"],
      ["ancho"]: "" + plaza["ancho"],
      ["largo"]: "" + plaza["largo"],
      ["exterior"]: plaza["esAireLibre"],
      ["descripcion"]:"" + plaza["descripcion"],
    })
    
}

  const[errors, setErrors]= useState({})
  
  

  const handleSubmit= evt => {
    console.log("SUBMIT")
    evt.preventDefault()
    var nuevosErrores= validateParkingForm(form)
    setErrors(nuevosErrores)

    var numeroErrores = Object.keys(nuevosErrores).length;
    if(numeroErrores===0){
      
      
      const data= {
        "id": id,
        "direccion": "" + form.calle + "," + form.numero + "," + form.ciudad + "," + form.provincia + "," + form.codigoPostal,
        "precioHora": form.precioHora,
        "fianza": form.fianza,
        "ancho": form.ancho,
        "largo": form.largo,
        "estaDisponible": true,
        "esAireLibre": form.exterior,
        "descripcion": form.descripcion,
        "administrador": {
            "id": 0,
            "name": "sergio",
            "email": "admin@admin.com"
        }
      }
      
      
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'https://park-inn-ispp-fe.herokuapp.com/', "mode": "cors"},
        body: (JSON.stringify(data))
      };
      
      fetch(`https://park-inn-ispp-be.herokuapp.com/plazas/${id}`, requestOptions).then(response => {
        console.log(response.ok)

        if (response.ok){
          console.log("EDITADA")
          navigate(`/mis-plazas`)
        }
        
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
  
  
  const deletePlaza= evt => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Access-Control-Allow-Origin' : 'https://park-inn-ispp-fe.herokuapp.com/', "mode": "cors"}
    };
    
    fetch(`https://park-inn-ispp-be.herokuapp.com/plazas/${id}`, requestOptions)
      .then(response => {
        console.log(response.ok)

        if (response.ok){
          console.log("ELIMINADA")
          navigate(`/mis-plazas`)
        }
      })
  }
  
  return (
    
  <div class="form-style-10">
  <ReactNotifications />
  <h1>Crear Plaza</h1>
    <form onSubmit={handleSubmit}>

    <div class="section"><span>1</span>Dirección</div>
    <div class="inner-wrap">
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

    <div class="section"><span>2</span>Precios</div>
    <div class="inner-wrap">
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
      <div class="section"><span>3</span>Características de la plaza</div>
      <div class="inner-wrap">
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
      <input type="submit" value="Guardar plaza" />  &nbsp; &nbsp;
      <button type="button" class="deleteButton" onClick={deletePlaza}> Eliminar plaza </button>
    </form>
  </div>
  );
}
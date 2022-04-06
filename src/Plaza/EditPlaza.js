import React, { useState,useEffect } from 'react';
import { useParams, Navigate, useNavigate, renderMatches } from 'react-router-dom';
import validateParkingForm from './ValidatePlazaForm';
import FormErrorMessage from '../Util/FormErrorMessage';
import { Store } from 'react-notifications-component'
import { ReactNotifications } from 'react-notifications-component'
import displayNotification from '../Util/Notifications';
import 'react-notifications-component/dist/theme.css'
import call from '../Util/Caller';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

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
  
  const [miPlaza,setMiPlaza]= useState(false);
 
  const id = parseInt(useParams().id)

  useEffect(() => {
    DetallesPlaza()
  }, []);

  const DetallesPlaza = async () => {

    const data = await call(`/plazas/${id}`,"GET")
    if(data.ok){
      setMiPlaza(true)
    }
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
    
    const usuario = cookies.get('UserData');
    console.log(usuario);

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
        "descripcion": form.descripcion
      }
      console.log("DATOS ENVIADOS:")
      console.log(data)
      call(`/plazas/${id}`,"PUT", data)
      .then(response => {
        console.log(response.ok)

        if (response.ok){
          displayNotification("Éxito","Plaza guardada correctamente","success")
          navigate(`/mis-plazas`)
        }
        
      })
     

     
     
     
      
    }  
    
   
  }

  

  const handleChange= evt => {
    
    const target = evt.target
    const name = target.name
    
    var value= target.value
    
   
    if (target.type === 'select-one'){
      value= target.value === 'true' ? true : false
     
    }
    setForm({...form,[name]: value})
    
  }
  
  
    
    /*const borrarPlaza = evt => {
        
      call(`/plazas/`+id, 'DELETE')
        .then(response => {
          console.log(response.ok)
  
          if (response.ok){
            console.log("ELIMINADA")
            navigate(`/mis-plazas`)
          }
        })
    }*/
  
  console.log(miPlaza)
  if(miPlaza){
  return (
    
  
  
  <div class="form-style-10">
   <h1>Editar Plaza</h1>
    <form onSubmit={handleSubmit}>
    
    <div className="section"><span>1</span>Dirección</div>
    <div className="inner-wrap">
    
      <label>
      Dirección:
        <input onChange={handleChange} name= "calle" type="text" value={form.calle} placeholder="Calle Bami"/>
        <FormErrorMessage jsonErrors={errors} errorName="calle"/>
        

      </label>

      <label>
      Número:
        <input onChange={handleChange} name= "numero" type="text" value={form.numero} placeholder="4"/>
        
        <FormErrorMessage jsonErrors={errors} errorName="numero"/>

      </label>

      <label>
      Ciudad:
        <input onChange={handleChange} name= "ciudad" type="text" value={form.ciudad}/>
        <FormErrorMessage jsonErrors={errors} errorName="ciudad" placeholder="Sevilla"/>

      </label>

      <label>
      Provincia:
        <input onChange={handleChange} name= "provincia" type="text" value={form.provincia} placeholder="Sevilla"/>
        <FormErrorMessage jsonErrors={errors} errorName="provincia"/>
      </label>

      <label>
      Código Postal:
        <input onChange={handleChange} name= "codigoPostal" type="number" value={form.codigoPostal} placeholder="41004"/>
        <FormErrorMessage jsonErrors={errors} errorName="codigoPostal"/>
      </label>
    </div>

      <br/> 

    <div className="section"><span>2</span>Precios</div>
    <div className="inner-wrap">
      <label>
          Precio/Hora (€):
          <input onChange={handleChange} name="precioHora" type="number"  value={form.precioHora} placeholder="1.20"/>
          <FormErrorMessage jsonErrors={errors} errorName="precioHora"/>

      </label>
      <br/>
      <label>
          Fianza (€):
          <input onChange={handleChange} name="fianza" type="number"  value={form.fianza} placeholder="10"/>
          <FormErrorMessage jsonErrors={errors} errorName="fianza"/>

      </label>
      </div>
      <br/>
      <div className="section"><span>3</span>Características de la plaza</div>
      <div className="inner-wrap">
      <label>
          Ancho (metros):
          <input onChange={handleChange} name="ancho" type="number"  value={form.ancho}/>
          <FormErrorMessage jsonErrors={errors} errorName="ancho"/>

      </label>
      <br/>
      <label>
          Largo (metros):
          <input onChange={handleChange} name="largo" type="number" value={form.largo}/>
          <FormErrorMessage jsonErrors={errors} errorName="largo"/>

      </label>
      <br/>
      <label>
        Ubicación:
      <select onChange={handleChange} value={form.exterior}  name="exterior" id="exterior">
          <option value="false" selected>Interior</option>
          <option value="true">Exterior</option>
    </select>
      </label>
      <br/>
      <label>
      Descripción:
        <input  onChange={handleChange} name= "descripcion" type="text" value={form.descripcion}/>
        <FormErrorMessage jsonErrors={errors} errorName="descripcion"/>
      </label>
     
      </div>
      <br/>
     
      <input type="submit" value="Guardar plaza" />
    </form>
  </div>
  
    );
  }else{
    return(<></>)
  }
}
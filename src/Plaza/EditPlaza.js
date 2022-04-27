import React, { useState,useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import validateParkingForm from './ValidatePlazaForm';
import FormErrorMessage from '../Util/FormErrorMessage';
import displayNotification from '../Util/Notifications';
import 'react-notifications-component/dist/theme.css'
import call from '../Util/Caller';

import Cookies from 'universal-cookie';
import { Datos, EnvioForm, Etiqueta, Formulario, Global, Line, Selector, Title } from './EditPlaza.elements';
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
    fecha:'',
    horaInicio:'',
    horaFin:''
  })
  
  const [miPlaza,setMiPlaza]= useState(false);
 
  const id = parseInt(useParams().id)

  useEffect(() => {
    DetallesPlaza()
  }, []);

  const DetallesPlaza = async () => {

    const data = await call(`/plazas/${id}/formularioEditar`,"GET")
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
    if (plaza.horarios!==[]) {
      var horario1=plaza.horarios[0]
      var fechaHoraInicio1=horario1[0].split('T')
      var horaFin=horario1[1].split('T')
      setForm({
      ["fecha"]: "" + fechaHoraInicio1[0],
      ["horaInicio"]: "" + fechaHoraInicio1[1],
      ["horaFin"]: "" + horaFin[1],
      })

    }
    console.log(plaza)

    
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
  
  console.log(miPlaza)
  if(miPlaza){
  return (
    
  <Global>
   
    <Formulario onSubmit={handleSubmit}>
      <Title>Editar Plaza</Title>

      <Line>
        <Etiqueta>Dirección:</Etiqueta>
        <Datos onChange={handleChange} name= "calle" type="text" value={form.calle} placeholder="Calle Bami"/>
        <FormErrorMessage jsonErrors={errors} errorName="calle"/>
      </Line>
      
      
      <Line>
        <Etiqueta>Número:</Etiqueta>
        <Datos onChange={handleChange} name= "numero" type="text" value={form.numero} placeholder="4"/>
        <FormErrorMessage jsonErrors={errors} errorName="numero"/>
      </Line>

      <Line>
        <Etiqueta>Ciudad:</Etiqueta>
        <Datos onChange={handleChange} name= "ciudad" type="text" value={form.ciudad}/>
        <FormErrorMessage jsonErrors={errors} errorName="ciudad"/>
      </Line>

      <Line>
        <Etiqueta>Provincia:</Etiqueta>
        <Datos onChange={handleChange} name= "provincia" type="text" value={form.provincia}/>
        <FormErrorMessage jsonErrors={errors} errorName="provincia"/>
      </Line>

      <Line>
        <Etiqueta>Código Postal:</Etiqueta>
        <Datos onChange={handleChange} name= "codigoPostal" type="text" value={form.codigoPostal}/>
        <FormErrorMessage jsonErrors={errors} errorName="codigoPostal"/>
      </Line>
      
      <Line>
        <Etiqueta>Precio/Hora:</Etiqueta>
        <Datos onChange={handleChange} name= "precioHora" type="text" value={form.precioHora}/>
        <FormErrorMessage jsonErrors={errors} errorName="precioHora"/>
      </Line>
      
      <Line>
        <Etiqueta>Provincia:</Etiqueta>
        <Datos onChange={handleChange} name= "provincia" type="text" value={form.provincia}/>
        <FormErrorMessage jsonErrors={errors} errorName="provincia"/>
      </Line>

      <Line>
        <Etiqueta>Fianza:</Etiqueta>
        <Datos onChange={handleChange} name= "fianza" type="text" value={form.fianza}/>
        <FormErrorMessage jsonErrors={errors} errorName="fianza"/>
      </Line>

      <Line>
        <Etiqueta>Ancho:</Etiqueta>
        <Datos onChange={handleChange} name= "ancho" type="text" value={form.ancho}/>
        <FormErrorMessage jsonErrors={errors} errorName="ancho"/>
      </Line>

      <Line>
        <Etiqueta>Largo:</Etiqueta>
        <Datos onChange={handleChange} name= "largo" type="text" value={form.largo}/>
        <FormErrorMessage jsonErrors={errors} errorName="largo"/>
      </Line>

      <Line>
        <Etiqueta>Ubicación:</Etiqueta>
        <Selector onChange={handleChange} name= "exterior" value={form.exterior}>
          <option value="false" selected>Interior</option>
          <option value="true">Exterior</option>
        </Selector>
        <FormErrorMessage jsonErrors={errors} errorName="largo"/>
      </Line>
     
      <Line>
        <Etiqueta>Descripción:</Etiqueta>
        <Datos onChange={handleChange} name= "descripcion" type="text" value={form.descripcion}/>
        <FormErrorMessage jsonErrors={errors} errorName="descripcion"/>
      </Line>
      <EnvioForm type="submit" value="Guardar cambios" />
    </Formulario>
  </Global>
  
    );
  }else{
    return(<></>)
  }
}
import React, { useState,useEffect } from 'react';
import validateParkingForm from './ValidatePlazaForm';
import { useNavigate } from 'react-router-dom';
import FormErrorMessage from '../Util/FormErrorMessage';
import displayNotification from '../Util/Notifications';
import call from '../Util/Caller';

import Cookies from 'universal-cookie';
import { Datos, EnvioForm, Etiqueta, Formulario, Global, Line, Selector, Title } from './EditPlaza.elements';
const cookies = new Cookies();

export default function CreatePlaza() {
 
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

  const[errors, setErrors]= useState({})
  /*
  const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      const Users = async () => {
          const data = await call('/clients/usuariopormail/'+cookies.get('user_mail'), 'GET');
          const usuarios = await data.json()
          setUsuarios(usuarios);
      }
      Users();
      
      
  });
  */


  const handleSubmit= evt => {
   
    evt.preventDefault()
    var nuevosErrores= validateParkingForm(form)
    setErrors(nuevosErrores)

    const usuario = cookies.get('UserData');
    console.log(usuario);

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
        "tramos":false,
        "administrador": {
          "id": usuario.id,
          "name": usuario.name,
          "email": usuario.email,
		      "password": usuario.password,
          "loggedIn": usuario.loggedIn,
          "phone": usuario.phone,
          "surname": usuario.surname,
          "acceptedTerms": usuario.acceptedTerms,
          "roles": [
            {
              "id": 3,
              "name": 'ROLE_USER'
            }
          ]

        }
      }
      
      call('/plazas',"POST", data)
        .then(response => {
          console.log(response)
          if (response.ok){
            displayNotification("Éxito","Plaza creada correctamente","success")
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
  
  console.log(form)
  
  return (
    
  <Global>
 
    <Formulario onSubmit={handleSubmit}>
      <Title>Crear Plaza</Title>

      <Line>
        <Etiqueta>Dirección:</Etiqueta>
        <Datos onChange={handleChange} name= "calle" type="text" value={form.calle} placeholder="Calle Real"/>
        <FormErrorMessage jsonErrors={errors} errorName="calle"/>
      </Line>

      <Line>
        <Etiqueta>Número:</Etiqueta>
        <Datos onChange={handleChange} name= "numero" type="text" value={form.numero} placeholder="4"/>
        <FormErrorMessage jsonErrors={errors} errorName="numero"/>
      </Line>

      <Line>
        <Etiqueta>Ciudad:</Etiqueta>
        <Datos onChange={handleChange} name= "ciudad" type="text" value={form.ciudad} placeholder="Chiclana"/>
        <FormErrorMessage jsonErrors={errors} errorName="ciudad"/>
      </Line>

      <Line>
        <Etiqueta>Provincia:</Etiqueta>
        <Datos onChange={handleChange} name= "provincia" type="text" value={form.provincia} placeholder="Cádiz"/>
        <FormErrorMessage jsonErrors={errors} errorName="provincia"/>
      </Line>

      <Line>
        <Etiqueta>Codigo Postal:</Etiqueta>
        <Datos onChange={handleChange} name= "codigoPostal" type="text" value={form.codigoPostal} placeholder="00000"/>
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
        <Datos onChange={handleChange} name= "fianza" type="text" placeholder='>5'/>
        <FormErrorMessage jsonErrors={errors} errorName="fianza"/>
      </Line>

      <Line>
        <Etiqueta>Ancho:</Etiqueta>
        <Datos onChange={handleChange} name= "ancho" type="text" placeholder='metros'/>
        <FormErrorMessage jsonErrors={errors} errorName="ancho"/>
      </Line>

      <Line>
        <Etiqueta>Largo:</Etiqueta>
        <Datos onChange={handleChange} name= "largo" type="text" placeholder='metros'/>
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
      <EnvioForm type="submit" value="Crear plaza" />
    </Formulario>
  </Global>
  );
}
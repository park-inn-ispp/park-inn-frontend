import React, { useState,useEffect } from 'react';
import validateParkingForm from './ValidatePlazaForm';
import { useNavigate } from 'react-router-dom';
import FormErrorMessage from '../Util/FormErrorMessage';
import displayNotification from '../Util/Notifications';
import call from '../Util/Caller';

import Cookies from 'universal-cookie';
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
    
  <div className="form-style-10">
  <h1>Crear Plaza</h1>
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
      <br/>
      <input type="submit" value="Crear plaza" />
    </form>
  </div>
  );
}
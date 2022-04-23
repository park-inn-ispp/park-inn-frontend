import React, { useState,useEffect } from 'react';
import validateParkingForm from './ValidatePlazaForm';
import { useNavigate } from 'react-router-dom';
import FormErrorMessage from '../Util/FormErrorMessage';
import displayNotification from '../Util/Notifications';
import call from '../Util/Caller';
import { Etiqueta, Parrafo } from './ReservaPlaza.elements';
import Cookies from 'universal-cookie';
import moment from "moment";

const cookies = new Cookies();

export default function CreatePlaza() {
 
  let navigate = useNavigate();
  const [segundoTramo, setSegundoTramo] = useState(false)
  const [tercerTramo, setTercerTramo] = useState(false)
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
    tramos:false,
    tramo2:false,
    tramo3:false,
    fecha:'',
    horaInicio:'',
    horaFin:'',
    fecha2:'',
    horaInicio2:'',
    horaFin2:'',
    fecha3:'',
    horaInicio3:'',
    horaFin3:''
  })

  const[errors, setErrors]= useState({})
  const[horaInicio,setHoraInicio] = useState(moment())
  const[horaFin,setHoraFin] = useState(moment())
  const idUsuario = cookies.get('UserData').id;


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
        "tramos":form.tramos,
        "horarios": {
          "primerTramo": {
            "fechaInicio":form.fecha+'T'+form.horaInicio+':00',
            "fechaFin":form.fecha+'T'+form.horaFin+':00'
          },
          "segundoTramo": {
            "fechaInicio":form.fecha2+'T'+form.horaInicio2+':00',
            "fechaFin":form.fecha2+'T'+form.horaFin2+':00'
          },
          "tercerTramo": {
            "fechaInicio":form.fecha3+'T'+form.horaInicio3+':00',
            "fechaFin":form.fecha3+'T'+form.horaFin3+':00'
          }
        },
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
      console.log(data)

      
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
  
   
  function AñadirTramo() {
    if (form.horaInicio2!==''&&form.horaFin2!=='' && form.fecha2 && tercerTramo===false && segundoTramo===true) {
      setTercerTramo(true);
      form.tramo3=true
    }
    if (form.horaInicio!==''&&form.horaFin!=='' && form.fecha && segundoTramo===false) {
      setSegundoTramo(true);
      form.tramo2=true
    }
    
  }

  function EliminarTramo() {
    if(tercerTramo===true) {
      setTercerTramo(false)
      form.tramo3=false
    } else if (segundoTramo===true) {
      setSegundoTramo(false)
      form.tramo2=false

    }
  }




  
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

      <div className="section"><span>4</span>Tramos horarios</div>
    <div className="inner-wrap">
    <select onChange={handleChange} value={form.tramos}  name="tramos" id="tramos">
          <option value="false" selected>Disponibilidad total</option>
          <option value="true">Tramos horarios</option>
    </select>
    <br/>
  { form.tramos === true ? (
    <><div className='inner-wrap'>
            <label>Crea tramos:</label>
            <button class="botonAzul" onClick={() => { window.open(`http://localhost:3000/tramos-horarios/`+idUsuario); } }> Añadir tramos </button>
            <label>Selecciona los tramos que deseas:<br/><br/>
            <div className="section"><span>4.1</span>Primer tramo</div>
            <Etiqueta>Fecha: </Etiqueta>
              <Parrafo>
                <input onChange={handleChange} name="fecha" type="date" value={form.fecha} />
                <FormErrorMessage jsonErrors={errors} errorName="fecha" />
              </Parrafo>
              <Etiqueta>Hora Inicio: </Etiqueta>
              <Parrafo>
                <input onChange={handleChange} name="horaInicio" type="time" step="600" value={form.horaInicio} />
                <FormErrorMessage jsonErrors={errors} errorName="horaInicio" />
              </Parrafo>
              </label>
              <Etiqueta>Hora Fin: </Etiqueta>
              <Parrafo>
                <input onChange={handleChange} name="horaFin" type="time" value={form.horaFin} />
                <FormErrorMessage jsonErrors={errors} errorName="horaFin" />
              </Parrafo>
              </div>
            {segundoTramo===true ? (<>
              <div className='inner-wrap'>
              <div className="section"><span>4.2</span>Segundo tramo</div>
              <Etiqueta>Fecha: </Etiqueta>
              <Parrafo>
                <input onChange={handleChange} name="fecha2" type="date" value={form.fecha2} />
                <FormErrorMessage jsonErrors={errors} errorName="fecha2" />
              </Parrafo>
              <Etiqueta>Hora Inicio: </Etiqueta>
              <Parrafo>
                <input onChange={handleChange} name="horaInicio2" type="time" step="600" value={form.horaInicio2} />
                <FormErrorMessage jsonErrors={errors} errorName="horaInicio2" />
              </Parrafo>
              <Etiqueta>Hora Fin: </Etiqueta>
              <Parrafo>
                <input onChange={handleChange} name="horaFin2" type="time" value={form.horaFin2} />
                <FormErrorMessage jsonErrors={errors} errorName="horaFin2" />
              </Parrafo>
              <button class="deleteButton" onClick={() => { EliminarTramo(); } }> Eliminar Tramo </button>
              </div>
              
              {tercerTramo===true ? (
                <div className='inner-wrap'>
                <div className="section"><span>4.3</span>Tercer tramo</div>
                <Etiqueta>Fecha: </Etiqueta>
              <Parrafo>
                <input onChange={handleChange} name="fecha3" type="date" value={form.fecha3} />
                <FormErrorMessage jsonErrors={errors} errorName="fecha3" />
              </Parrafo>
                <Etiqueta>Hora Inicio: </Etiqueta>
                <Parrafo>
                  <input onChange={handleChange} name="horaInicio3" type="time" step="600" value={form.horaInicio3} />
                  <FormErrorMessage jsonErrors={errors} errorName="horaInicio3" />
                </Parrafo>
                <Etiqueta>Hora Fin: </Etiqueta>
                <Parrafo>
                  <input onChange={handleChange} name="horaFin3" type="time" value={form.horaFin3} />
                  <FormErrorMessage jsonErrors={errors} errorName="horaFin3" />
                </Parrafo>
                <button class="deleteButton" onClick={() => { EliminarTramo(); } }> Eliminar Tramo </button>
                </div>
                
                ) 
                :(<><div><input type="button" class="botonAzul" onClick={() => { AñadirTramo(); } } value="Añadir otro Tramo" /></div></>)}
              
              
              </>):(<><div><input type="button" class="botonAzul" onClick={() => { AñadirTramo(); } } value="Añadir otro Tramo" /></div></>)}
            
            </>
  ): 
    <div>
     Tu plaza estará disponible a todas horas
    </div>
}
    </div>
    

      <br/>
      <br/>
      <input type="submit" value="Crear plaza" />
    </form>
    

  </div>
  );
}
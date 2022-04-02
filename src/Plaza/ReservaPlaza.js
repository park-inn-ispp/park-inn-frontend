import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import validateReserva from './validateReserva';
import FormErrorMessage from '../Util/FormErrorMessage';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {Etiqueta, Parrafo, Formulario, Wrapper} from '../Plaza/ReservaPlaza.elements';
import call from '../Util/Caller';
import Loading from '../components/Loading';
import Pagar from '../Payments/Pagar';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Reserva(){

    //Estados con Hooks 
    const [errors, setErrors] = useState(0);
    const [plaza, setPlaza] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [fechaInicio, setFechaInicio] = useState(0)
    const [fechaFin, setFechaFin] = useState(0)
    const [idReserva, setIdReserva] = useState(0)
    const [pagando, setPagando] = useState(false)
    

    //Navigate para redirigir con react-router-dom
    let navigate = useNavigate();

    const id = parseInt(useParams().id)

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      
      const DetallesPlaza = async () => {
        const data = await call(`/plazas/${id}`,"GET")
        const plazas = await data.json()
        setPlaza(plazas)
        setIsLoading(false)
      }
        DetallesPlaza()

    },[id]);

    const usuario = cookies.get('UserData');

    let horas = fechaFin-fechaInicio
    const [form, setForm]= useState({
        fechaInicio:'',
        fechaFin:'',
        horaInicio:'',
        horaFin:'',
        precioTotal:''
    })


    const body = {
            
      "comentarios":null,
      "estado": "pendiente",
      "fechaSolicitud":"2022-03-22T14:30:40",
      "incidencias":null,
      "plaza": {
        "id": plaza.id,
        "direccion": plaza.direccion,
        "precioHora": plaza.precioHora,
        "fianza": plaza.fianza,
        "ancho": plaza.ancho,
        "largo": plaza.largo,
        "estaDisponible": true,
        "esAireLibre": true,
        "descripcion": plaza.descripcion,
        "administrador": plaza.administrador,
      },
      "precioTotal": horas*24*plaza.precioHora + plaza.fianza,
      "user":{
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
            "id": usuario.roles.id,
            "name": usuario.roles.name
          }
        ]

      },
      "fechaInicio": form.fechaInicio.toString()+'T00:00:00',
      "fechaFin": form.fechaFin.toString()+'T00:00:00'
          
      }

      const handleSubmit= async evt => {
        evt.preventDefault()
        setErrors(validateReserva(form))
         
        var numeroErrores = Object.keys(validateReserva(form)).length;
        if (numeroErrores===0) {
          setPagando(true)
        }
    }

    
    
      const handleChange= evt => {
        const target = evt.target
        const name = target.name
        var value= target.value.toString()
        setForm({...form,[name]: value})
        var sp = value.split('-')
        var dia = sp[2]
        if (name==='fechaInicio') {
          setFechaInicio(dia)
        } else if (name==='fechaFin') {
          setFechaFin(dia)
        }
        setForm({...form,[name]: value})


      }
      //Pantalla de carga
      if (isLoading) {
        return <Loading/>;
      }

    return (
        <>
        {pagando ? <> <Pagar precio={body.precioTotal} reserva={body}/>
         <button class="botonAzul" type="submit" onClick={()=> {setPagando(false)}}> Atrás </button> </>
         : 
        
        <div className="form-style-10">
          <h1>Reservar Plaza</h1>
          <ReactNotifications />
          <div class="section"><span>1</span>Propiedades de la plaza</div>
          <div class="inner-wrap">
          
          <Etiqueta>Propietario:</Etiqueta><Parrafo>{plaza.administrador.name}</Parrafo>
          <Etiqueta>Direccion:</Etiqueta><Parrafo>{plaza.direccion}</Parrafo> 
          <Etiqueta>Largo:</Etiqueta><Parrafo>{plaza.largo} m</Parrafo>
          <Etiqueta>Ancho:</Etiqueta><Parrafo>{plaza.ancho} m</Parrafo>
          </div>
        <Formulario onSubmit={handleSubmit}>
        <div class="section"><span>2</span>Fecha de reserva</div>
        <div class="inner-wrap">
            <Etiqueta>Fecha Inicio:</Etiqueta>
            <Parrafo>
              <input onChange={handleChange} name= "fechaInicio" type="date" value={form.fechaInicio}/>
              <FormErrorMessage jsonErrors={errors} errorName="fechaInicio"/>
            </Parrafo>

            <Etiqueta>Fecha Fin:</Etiqueta>
            <Parrafo>
              <input onChange={handleChange} name= "fechaFin" type="date" value={form.fechaFin}/>
              <FormErrorMessage jsonErrors={errors} errorName="fechaFin"/>
            </Parrafo>
          <Wrapper>
            <Etiqueta>Hora Inicio: </Etiqueta>
            <Parrafo>
              <input disabled onChange={handleChange} name= "horaInicio" type="time" value={form.horaInicio}/>
              <FormErrorMessage jsonErrors={errors} errorName="horaInicio"/>
            </Parrafo>
            
            <Etiqueta>Hora Fin: </Etiqueta>
            <Parrafo>
              <input disabled onChange={handleChange} name= "horaFin" type="time" value={form.horaFin}/>
              <FormErrorMessage jsonErrors={errors} errorName="horaFin"/>
            </Parrafo>
          </Wrapper>
          </div>
          <div class="section"><span>3</span>Precios</div>
          <div class="inner-wrap">
          <Etiqueta>Precio por hora:</Etiqueta><Parrafo>{plaza.precioHora} €</Parrafo>
          <Etiqueta>Precio de la fianza:</Etiqueta><Parrafo>{plaza.fianza} €</Parrafo>  
          <Etiqueta>Precio estacionamiento:</Etiqueta><Parrafo>{horas*24*plaza.precioHora} €</Parrafo>  
          <Etiqueta>Precio total con fianza:</Etiqueta><Parrafo>{horas*24*plaza.precioHora + plaza.fianza} €</Parrafo>
          </div>  
          <input type="submit" value="Siguiente"/>
        </Formulario>
        </div>
        }

        
        </>
    );
}
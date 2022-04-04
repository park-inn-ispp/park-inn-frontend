import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import validateReserva from './validateReserva';
import FormErrorMessage from '../Util/FormErrorMessage';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {Etiqueta, Parrafo, Formulario} from '../Plaza/ReservaPlaza.elements';
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
    const [pagando, setPagando] = useState(false)

    const id = parseInt(useParams().id)


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

    const [form, setForm]= useState({
        fechaInicio:'',
        fechaFin:'',
        horaInicio:'',
        horaFin:'',
        precioTotal:''
    })
    
    //Cálculo de la diferencia entre las fechas
    let FechaYHoraInicio = new Date(form.fechaInicio.toString()+'T'+form.horaInicio.toString())
    let FechaYHoraFin = new Date(form.fechaFin.toString()+'T'+form.horaFin.toString())
    let FechaHoy = new Date()
    let fS = FechaHoy.toLocaleString().split(",")
    let año = format(fS[0].split("/")[2])
    let mes = format(fS[0].split("/")[1])
    let dia = format(fS[0].split("/")[0])
    let hora = format(fS[1].split(":")[0].trim())
    let minuto = format(fS[1].split(":")[1])
    let segundo = format(fS[1].split(":")[2])
    let FechaYHoraSolicitud = año+'-'+mes+'-'+dia+'T'+hora+':'+minuto+':'+segundo

    function format(num) {
      if (num.length===1) {
        return "0"+num
      } else return num
    }

    let horas = 0
    let precioEstacionamiento = 0;
    let precioTotalConFianza=plaza.fianza;
    
    if (FechaYHoraFin>FechaYHoraInicio) {
       horas = ((FechaYHoraFin-FechaYHoraInicio)/(1000 * 60 * 60))
       precioEstacionamiento = (horas*plaza.precioHora).toFixed(2)
       precioTotalConFianza = Number((plaza.fianza + horas*plaza.precioHora).toFixed(2))

    }

    //Cuerpo de la petición
    const body = {
        "comentarios": null,
        "estado": "pendiente",
        "fechaSolicitud": FechaYHoraSolicitud,
        "incidencias": null,
        "plaza": {
            "id": plaza.id,
            "direccion": plaza.direccion,
            "precioHora": plaza.precioHora,
            "fianza": plaza.fianza,
            "ancho": plaza.ancho,
            "largo": plaza.largo,
            "estaDisponible": plaza.estaDisponible,
            "esAireLibre": plaza.esAireLibre,
            "descripcion": plaza.descripcion,
            "administrador": plaza.administrador
        },
        "precioTotal": precioTotalConFianza,
        "user": {
            "id": usuario.id,
            "name": usuario.name,
            "email": usuario.email,
            "password": usuario.password,
            "loggedIn": usuario.loggedIn,
            "roles": [
                {}
            ]
        },
        "fechaInicio": form.fechaInicio.toString()+'T'+form.horaInicio.toString()+':00',
        "fechaFin": form.fechaFin.toString()+'T'+form.horaFin.toString()+':00',
    
    }


      const handleSubmit= async evt => {
        evt.preventDefault()
        setErrors(validateReserva(form))
        var numeroErrores = Object.keys(validateReserva(form)).length;
        if (numeroErrores===0) {
          setPagando(true)
          console.log(body)
        }
    }

    const handleChange = evt => {
      const target = evt.target
      const name = target.name
      var value= target.value.toString()
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
            <p/>
            <Etiqueta>Fecha Fin:</Etiqueta>
            <Parrafo>
              <input onChange={handleChange} name= "fechaFin" type="date" value={form.fechaFin}/>
              <FormErrorMessage jsonErrors={errors} errorName="fechaFin"/>
            </Parrafo>
            
            <Etiqueta>Hora Inicio: </Etiqueta>
            <Parrafo>
              <input  onChange={handleChange} name= "horaInicio" type="time" step="600" value={form.horaInicio}/>
              <FormErrorMessage jsonErrors={errors} errorName="horaInicio"/>
            </Parrafo>
            <Etiqueta>Hora Fin: </Etiqueta>
            <Parrafo>
              <input  onChange={handleChange} name= "horaFin" type="time" value={form.horaFin}/>
              <FormErrorMessage jsonErrors={errors} errorName="horaFin"/>
    </Parrafo>
          </div>
          <div class="section"><span>3</span>Precios</div>
          <div class="inner-wrap">
          <Etiqueta>Precio por hora:</Etiqueta><Parrafo>{plaza.precioHora} €</Parrafo>
          <Etiqueta>Precio de la fianza:</Etiqueta><Parrafo>{plaza.fianza} €</Parrafo>  
          <Etiqueta>Precio estacionamiento:</Etiqueta><Parrafo>{precioEstacionamiento} €</Parrafo>  
          <Etiqueta>Precio total con fianza:</Etiqueta><Parrafo>{precioTotalConFianza} €</Parrafo>
          </div>  
          <input type="submit" value="Siguiente"/>
        </Formulario>
        </div>
        }

        
        </>
    );
}
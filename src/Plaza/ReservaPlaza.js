import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import validateReserva from './validateReserva';
import FormErrorMessage from '../Util/FormErrorMessage';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {Etiqueta, Parrafo, Formulario, BotonCalendario, Container, Line, Title, Datos, Wrapper, EnvioForm, Precio, Back} from '../Plaza/ReservaPlaza.elements';
import call from '../Util/Caller';
import Loading from '../components/Loading';
import Pagar from '../Payments/Pagar';
import Cookies from 'universal-cookie';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import displayNotification from '../Util/Notifications';
require('moment/locale/es.js');
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
        console.log(plazas)
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



    console.log("PREICO CON FIANZA" + precioTotalConFianza)
    const [precioDescuento, setValue] = useState(0);
    const [cuponAplicado, setCuponAplicado] = useState(false);
    const [valorCupon, setValorCupon] = useState("");

  
  
    const handleChangeInputEnviar= evt => {
      
      const target = evt.target
      const name = target.name
      var value= target.value
      setValorCupon(value)
    }
    function enviarDescuento(){
      if(valorCupon==="" ||valorCupon==null ||valorCupon==undefined){
        if(cuponAplicado){
          displayNotification("⚠","Ya has aplicado un cupón","warning")

        }else{
          displayNotification("⚠","Debes de introducir un cupón","warning")

        }

      }else{
        call("/descuento/name/"+valorCupon,"GET").then(async res =>{
          let descuento = await res.json()
          
          if(cuponAplicado){
            displayNotification("⚠","Ya has aplicado un cupón","warning")
  
          }else if(res.ok){
            setValue((Math.round(((precioTotalConFianza*(descuento.descuento / 100))) * 100) / 100))
            displayNotification("Exito","Se ha aplicado el cupón correctamente","success")
            setCuponAplicado(true)
            setValorCupon("")
  
          }
        })
      }
     
      }

      function refreshDescuento(){
        setCuponAplicado(false)
        setValue(0)
        displayNotification("ⓘ","Se ha desaplicado el cupon","info")
        
        }


    //Cuerpo de la petición
    const body = {
        "comentarios": null,
        "estado": "pendiente",
        "fechaSolicitud": FechaYHoraSolicitud,
        "incidencias": null,
        "fianza": plaza.fianza,
        "direccion": plaza.direccion,
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
        "precioTotal":Math.round((precioTotalConFianza-precioDescuento) * 100) / 100,
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
          // Validación en backend reservas solapadas
          call(`/plazas/${body.plaza.id}/validateReservaAntesPago`,"POST",body).then(response => {
            console.log(response)
            if (response.ok){
              setPagando(true)
            }
          }) 
          
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
        {pagando ? <Wrapper> <Pagar precio={body.precioTotal} reserva={body}/>
        <Back class="botonAzul" type="submit" onClick={()=> {setPagando(false)}}> Atrás </Back> </Wrapper>
         : 
        
        <Container>
            <Wrapper>
              <Title>Reservar Plaza</Title>
              <ReactNotifications />
              <Line><Etiqueta>Propietario:</Etiqueta><Parrafo>{plaza.administrador.name}</Parrafo></Line>
              <Line><Etiqueta>Direccion:</Etiqueta><Parrafo>{plaza.direccion}</Parrafo></Line> 
              <Line><Etiqueta>Largo:</Etiqueta><Parrafo>{plaza.largo} m</Parrafo></Line>
              <Line><Etiqueta>Ancho:</Etiqueta><Parrafo>{plaza.ancho} m</Parrafo></Line>
              <Line><Etiqueta>Calendario:</Etiqueta>
              <BotonCalendario to={'/calendar/'+id}>Ver disponibilidad</BotonCalendario></Line>
          
            <Formulario onSubmit={handleSubmit}>
        
        
                <Line><Etiqueta>Fecha Inicio:</Etiqueta>
                  <Datos onChange={handleChange} name= "fechaInicio" type="date" value={form.fechaInicio}></Datos>
                  <FormErrorMessage jsonErrors={errors} errorName="fechaInicio"/>
                </Line>

                <Line><Etiqueta>Fecha Fin:</Etiqueta>
                  <Datos onChange={handleChange} name= "fechaFin" type="date" value={form.fechaFin}></Datos>
                  <FormErrorMessage jsonErrors={errors} errorName="fechaFin"/>
                </Line>

                <Line><Etiqueta>Hora Inicio:</Etiqueta>
                  <Datos onChange={handleChange} name= "horaInicio" type="time" step="600" value={form.horaInicio}></Datos>
                  <FormErrorMessage jsonErrors={errors} errorName="horaInicio"/>
                </Line>
              
                <Line><Etiqueta>Hora Fin:</Etiqueta>
                  <Datos onChange={handleChange} name= "horaFin" type="time" step="600" value={form.horaFin}></Datos>
                  <FormErrorMessage jsonErrors={errors} errorName="horaFin"/>
                </Line>

              <Line><Etiqueta>Precio por hora:</Etiqueta><Parrafo>{plaza.precioHora} €</Parrafo></Line>
              <Line><Etiqueta>Precio de la fianza:</Etiqueta><Parrafo>{plaza.fianza} €</Parrafo></Line>  
              <Line><Etiqueta>Precio estacionamiento:</Etiqueta><Parrafo>{precioEstacionamiento} €</Parrafo></Line>  
              <Line><Etiqueta>Precio total:</Etiqueta><Precio>{Math.round((precioTotalConFianza-precioDescuento) * 100) / 100} €</Precio></Line>
              <div className='cabeceraCrearCupon plazaFormCupon'>Cupón</div>
              <div className='crearCupon plazaFormCupon'>
              <input type="text" placeholder="Nombre del cupón" className='inputNombreCupon' onChange={handleChangeInputEnviar} value={valorCupon}></input>
              <button className='inputBotonEnviarCupon' type="button" onClick={() => enviarDescuento()}>&#8594;</button>
              <button className='refreshDescuentoButton' type="button" onClick={() => refreshDescuento()}>&#8634;</button>

            </div> 
              <EnvioForm type="submit" value="Siguiente"/>
              
            </Formulario>
          </Wrapper>
        </Container>
        }
        
        </>
    );
}
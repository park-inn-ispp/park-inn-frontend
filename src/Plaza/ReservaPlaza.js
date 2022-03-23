import { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import validateReserva from './validateReserva';
import FormErrorMessage from './FormErrorMesage';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component'
import {Etiqueta, Parrafo, Container, Formulario, Wrapper} from '../Plaza/ReservaPlaza.elements';
import Calendario from '../components/Calendario'
import displaySucessNotification from '../Util/Notifications'
import Cookie from 'universal-cookie'
import email from '../components/email';


const cookies = new Cookie()

export default function Reserva(){

    const [errors, setErrors] = useState(0);

    const [plaza, setPlaza] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [fechaInicio, setFechaInicio] = useState(0)
    const [fechaFin, setFechaFin] = useState(0)

    const [idReserva, setIdReserva] = useState(0)
    let navigate = useNavigate();


    useEffect(() => {
        DetallesPlaza()
    }, []);

    const id = parseInt(useParams().id)
    const DetallesPlaza = async () => {
        const data = await fetch(`https://park-inn-ispp-be.herokuapp.com/plazas/${id}`)
        const plazas = await data.json()
        setPlaza(plazas)
        setIsLoading(false)
    }
    var horas = fechaFin-fechaInicio
    const [form, setForm]= useState({
        fechaInicio:'',
        fechaFin:'',
        horaInicio:'',
        horaFin:'',
        precioTotal:''
    })

    // const [cliente, setCLiente] = useState()

    // useEffect(()=>{
    //   email().then(cliente => setCLiente(cliente))
    // },[])
    

    const data = {
            
      "comentarios":null,
      "estado": "pendiente",
      "fechaSolicitud":"2022-03-22T14:30:40",
      "incidencias":null,
      "plaza": {
        "id": plaza.id,
        "direccion": " Carberry Street,58885,Cadiz,Andalucia,11130",
        "precioHora": plaza.precioHora,
        "fianza": plaza.fianza,
        "ancho": plaza.ancho,
        "largo": plaza.largo,
        "estaDisponible": true,
        "esAireLibre": true,
        "descripcion": "Fexofenadine Hydrochloride",
          "administrador": {
          "id": 0,
          "name": 'sergio',
          "email": 'admin@admin.com'
        }
      },
      "precioTotal": horas*24*plaza.precioHora + plaza.fianza,
      "user":null,
      "fechaInicio": form.fechaInicio.toString()+'T00:00:00',
      "fechaFin": form.fechaFin.toString()+'T00:00:00'
          
      }

      const handleSubmit= async evt => {
        evt.preventDefault()
        setErrors(validateReserva(form))
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'https://park-inn-ispp-fe.herokuapp.com', "mode": "cors"},
          body: (JSON.stringify(data))
        };
         
        console.log(idReserva)
        var numeroErrores = Object.keys(validateReserva(form)).length;
        console.log(numeroErrores)
        if (numeroErrores===0) {
          const id = await getData(requestOptions)
          setIdReserva(await getData(requestOptions));
          if(id!="undefined"){
            navigate(`/reservas/${id}`)

          }else{
            navigate("/")
          }
        }
    }

     async function getData(requestOptions) {
      const data = await fetch(`https://park-inn-ispp-be.herokuapp.com/plazas/${id}/reservar`, requestOptions)
      const response = await data.json()
      if (data.ok){
        Store.addNotification({
          title: "RESERVA CONFIRMADA!",
          message: "Tu reserva se ha realizado con éxito, ahora puedes ver los detalles o cancelarla antes de 24 horas",
          type: "success",
          insert: "top",
          container: "top-left",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      }
      return response.id
    } 
    
      const handleChange= evt => {
        const target = evt.target
        const name = target.name
        var value= target.value.toString()
        setForm({...form,[name]: value})
        console.log(name)
        var sp = value.split('-')
        var dia = sp[2]
        console.log(parseInt(sp[2]))
        if (name==='fechaInicio') {
          setFechaInicio(dia)
        } else if (name==='fechaFin') {
          setFechaFin(dia)
        }
        setForm({...form,[name]: value})
        console.log(fechaInicio)
        console.log(fechaFin)

        console.log(form.fechaFin.toString()+'T00:00:00')
      }
      
      //Cálculo de horas
      if (isLoading) {
        return <p>Loading...</p>;
      }

    return (
        <Container>
          <ReactNotifications />
          <Etiqueta>Propietario:</Etiqueta><Parrafo>{plaza.administrador.name}</Parrafo>
          <Etiqueta>Direccion:</Etiqueta><Parrafo>{plaza.direccion}</Parrafo> 
          <Etiqueta>Largo:</Etiqueta><Parrafo>{plaza.largo} m</Parrafo>
          <Etiqueta>Ancho:</Etiqueta><Parrafo>{plaza.ancho} m</Parrafo>
        <Formulario onSubmit={handleSubmit}>
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
          <Etiqueta>Precio por hora:</Etiqueta><Parrafo>{plaza.precioHora} €</Parrafo>
          <Etiqueta>Precio de la fianza:</Etiqueta><Parrafo>{plaza.fianza} €</Parrafo>  
          <Etiqueta>Precio estacionamiento:</Etiqueta><Parrafo>{horas*24*plaza.precioHora} €</Parrafo>  
          <Etiqueta>Precio total con fianza:</Etiqueta><Parrafo>{horas*24*plaza.precioHora + plaza.fianza} €</Parrafo>   
          <input type="submit" value="Confirmar Reserva"/>
        </Formulario>
        </Container>
    );
}
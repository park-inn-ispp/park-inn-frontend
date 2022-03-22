import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import validateReserva from './validateReserva';
import FormErrorMessage from './FormErrorMesage';
import { ReactNotifications } from 'react-notifications-component'
import {Etiqueta, Parrafo, Container, Formulario, Wrapper} from '../Plaza/ReservaPlaza.elements';
import Calendario from '../components/Calendario'
export default function Reserva(){

    const[errors, setErrors] = useState({});
    const [plaza, setPlaza] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [fechaInicio, setFechaInicio] = useState(0)
    const [fechaFin, setFechaFin] = useState(0)
    const [hora, setHora] = useState(0)


    useEffect(() => {
        DetallesPlaza()
    }, []);

    const id = parseInt(useParams().id)
    const DetallesPlaza = async () => {
        const data = await fetch(`https://park-inn-ispp-be.herokuapp.com/${id}`)
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
    const data = {
            
      "comentarios":null,
      "estado": "pendiente",
      "fechaSolicitud":"2022-03-22T14:30:40",
      "id":"4",
      "incidencias":null,
      "plaza": {
        "id": 4,
        "direccion": "58885 Carberry Street",
        "precioHora": 2,
        "fianza": 50,
        "ancho": 4.86,
        "largo": 2.53,
        "estaDisponible": true,
        "esAireLibre": true,
        "descripcion": "Fexofenadine Hydrochloride",
          "administrador": {
          "id": 7,
          "name": "Sòng",
          "email": "jcaudle6@blogspot.com"
        }
      },
      "precioTotal": horas*24*plaza.precioHora + plaza.fianza,
      "user":null,
      "fechaInicio": form.fechaInicio.toString()+'T00:00:00',
      "fechaFin": form.fechaFin.toString()+'T00:00:00'
          
      }
    const handleSubmit= evt => {
        evt.preventDefault()
        setErrors(validateReserva(form))
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'https://park-inn-ispp-fe.herokuapp.com/', "mode": "cors"},
          body: (JSON.stringify(data))
        };
        
        fetch(`https://park-inn-ispp-be.herokuapp.com/${id}/reservar`, requestOptions)
          .then(response => {
            console.log(response.ok)
          })
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
        console.log(hora)
        console.log(form.fechaFin.toString()+'T00:00:00')
      }
      
      //Cálculo de horas
      
      if (isLoading) {
        return <p>Loading...</p>;
      }

    return (
        <Container>
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
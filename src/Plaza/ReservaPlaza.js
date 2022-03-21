import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import validateReserva from './validateReserva';
import FormErrorMessage from './FormErrorMesage';
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
        const data = await fetch(`http://localhost:8080/plazas/${id}`)
        const plazas = await data.json()
        setPlaza(plazas)
        setIsLoading(false)
    }

    const [form, setForm]= useState({
        fechaInicio:'',
        fechaFin:'',
        horaInicio:'',
        horaFin:'',
        precioTotal:''
    })

    const handleSubmit= evt => {
        evt.preventDefault()
        setErrors(validateReserva(form))
        console.log(errors)
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
      }
      
      //Cálculo de horas
      var horas = fechaFin-fechaInicio
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
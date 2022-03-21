import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getPlaza from '../Plaza/getPlazas';
import Plaza from './Plaza';

export default function Reserva(){

    

    const [plaza, setPlaza] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [fechaInicio, setFechaInicio] = useState(0)
    const [fechaFin, setFechaFin] = useState(0)
    const [hora, setHora] = useState(0)


    useEffect(() => {
        ObtenerDatos()
    }, []);

    const ObtenerDatos = async () => {
        const data = await fetch('http://localhost:8080/plazas/all')
        const plazas = await data.json()
        setPlaza(plazas)
        setIsLoading(false)
    }

    console.log(plaza);
    console.log(isLoading)
    const id = useParams().id
    console.log(id)

    function Filter(id) {
        return plaza.filter(p=>p.id===id)
    }
    console.log(plaza)

    const DetallesPlaza = Filter(parseInt(id))

    //console.log(DetallesPlaza[0].id)

    const [form, setForm]= useState({
        fechaInicio:'',
        fechaFin:'',
        horaInicio:'',
        horaFin:'',
        precioTotal:'',
      })

    const handleSubmit= evt => {
        evt.preventDefault()
        //setErrors(validateParkingForm(form))
      }

      const handleChange= evt => {

        const target = evt.target
        const name = target.name
        console.log(name)
        var value= target.value.toString()
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
      
      console.log(horas)
      
      if (isLoading) {
        return <p>Loading...</p>;
    }
   

    return (
        <div>
          Propietario: {DetallesPlaza[0].administrador.name}
            <br/>
          Direccion: {DetallesPlaza[0].direccion}
            <br/>
          Largo: {DetallesPlaza[0].largo} metros
            <br/>
          Ancho: {DetallesPlaza[0].ancho} metros
            <br/>
        <form onSubmit={handleSubmit}>
            <label>
            Fecha de Inicio:
                <input onChange={handleChange} name= "fechaInicio" type="date" value={form.fechaInicio}/>
            </label>
            <br/> 

            <label>
            Fecha de Fin:
               <input onChange={handleChange} name= "fechaFin" type="date" value={form.fechaFin}/>
            </label>
            <br/> 

            <label>
            Hora de inicio:
               <input disabled onChange={handleChange} name= "horaInicio" type="time" value={form.horaInicio}/>
            </label>
            <br/> 

            <label>
            Hora de fin:
               <input disabled onChange={handleChange} name= "horaFin" type="time" value={form.horaFin}/>
            </label>
            <br/> 
            Precio por hora: {DetallesPlaza[0].precioHora} €
            <br/>
            
            Precio de la fianza: {DetallesPlaza[0].fianza} €
            <br/>
            Precio total: {DetallesPlaza[0].fianza + DetallesPlaza[0].precioHora*horas} €
            <br/>
            Horas: {horas}
            <input type="submit" value="Submit" />
        </form>
        </div>
    );
}
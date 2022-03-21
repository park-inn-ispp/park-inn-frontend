import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import validateReserva from './validateReserva';
import FormErrorMessage from './FormErrorMesage';

export default function Reserva(){

    const[errors, setErrors] = useState({});
    const [plaza, setPlaza] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        ObtenerDatos()
    }, []);

    const ObtenerDatos = async () => {
        const data = await fetch('http://localhost:8080/plazas/all')
        const plazas = await data.json()
        setPlaza(plazas)
        setIsLoading(false)
    }

    const ID = parseInt(useParams().id);

    function Filter(){
      return plaza.filter(p=>p.id===ID)
    }

    const id = useParams().id
    const DetallesPlaza = Filter(parseInt(id))

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
        var value= target.value
        setForm({...form,[name]: value})
      }
      
      //Cálculo de horas
      const horas = 4
      
      console.log(plaza)
      
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
                <FormErrorMessage jsonErrors={errors} errorName="fechaInicio"/>
            </label>
            <br/> 

            <label>
            Fecha de Fin:
               <input onChange={handleChange} name= "fechaFin" type="date" value={form.fechaFin}/>
               <FormErrorMessage jsonErrors={errors} errorName="fechaFin"/>
            </label>
            <br/> 

            <label>
            Hora de inicio:
               <input disabled onChange={handleChange} name= "horaInicio" type="time" value={form.horaInicio}/>
               <FormErrorMessage jsonErrors={errors} errorName="horaInicio"/>
            </label>
            <br/> 

            <label>
            Hora de fin:
               <input disabled onChange={handleChange} name= "horaFin" type="time" value={form.horaFin}/>
               <FormErrorMessage jsonErrors={errors} errorName="horaFin"/>
            </label>
            <br/> 
            Precio por hora: {DetallesPlaza[0].precioHora} €
            <br/>
            Precio de la fianza: {DetallesPlaza[0].fianza} €
            <br/>
            Precio total: {DetallesPlaza[0].fianza + DetallesPlaza[0].precioHora*horas} €
            <br/>
            <input type="submit" value="Confirmar" />
        </form>
        </div>
    );
}
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import validateReserva from './validateReserva';
import Plaza from './Plaza';
import FormErrorMessage from './FormErrorMesage';

export default function Reserva(){

    const[errors, setErrors] = useState({});
    const [plaza, setPlaza] = useState([]);

    useEffect(() => {
        ObtenerDatos()
    }, []);

    const ObtenerDatos = async () => {
        const data = await fetch('http://localhost:8080/plazas/all')
        const plazas = await data.json()
        //console.log(plazas);
        setPlaza(plazas)
    }

    const ID = parseInt(useParams().id);

    function Filter(id){
      return plaza.filter(p=>p.id===id)
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
        var value= target.value
        setForm({...form,[name]: value})
      }
      
      


    return (
        <div>
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
               <input onChange={handleChange} name= "horaInicio" type="time" value={form.horaInicio}/>
               <FormErrorMessage jsonErrors={errors} errorName="horaInicio"/>
            </label>
            <br/> 

            <label>
            Hora de fin:
               <input onChange={handleChange} name= "horaFin" type="time" value={form.horaFin}/>
               <FormErrorMessage jsonErrors={errors} errorName="horaFin"/>
            </label>
            <br/> 
            Precio por hora:


            <input type="submit" value="Confirmar" />
        </form>
        </div>
    );
}
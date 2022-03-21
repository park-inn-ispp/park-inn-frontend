import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getPlaza from '../Plaza/getPlazas';
import Plaza from './Plaza';

export default function Reserva(){

    

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

    const id = useParams()
    console.log(id)

    function Filter(id) {
        return plaza.filter(p=>p.id==`id: ${id}`)
    }


    console.log(Filter(useParams()))

    const [form, setForm]= useState({
        fechaInicio:'',
        fechaFin:'',
        horaInicio:'',
        horaFin:'',
        precioTotal:''
      })

    const handleSubmit= evt => {
        evt.preventDefault()
        //setErrors(validateParkingForm(form))
      }

      const handleChange= evt => {

        const target = evt.target
        const name = target.name
        console.log(name)
        var value= target.value

        if (target.type === 'radio'){
          value= target.id === 'exterior' ? true : false
          console.log(value)
        }
        console.log(value)
        setForm({...form,[name]: value})

      }
      
      


    return (
        <div>
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
               <input onChange={handleChange} name= "horaInicio" type="time" value={form.horaInicio}/>
            </label>
            <br/> 

            <label>
            Hora de fin:
               <input onChange={handleChange} name= "horaFin" type="time" value={form.horaFin}/>
            </label>
            <br/> 
            Precio por hora: <Plaza />


            <input type="submit" value="Submit" />
        </form>
        </div>
    );
}
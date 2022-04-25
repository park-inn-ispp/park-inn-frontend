import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {Etiqueta, Parrafo, Formulario} from '../Plaza/ReservaPlaza.elements';
import FormErrorMessage from '../Util/FormErrorMessage';
import validateTramoForm from './validateCreateTramoForm';
import call from '../Util/Caller';
import Loading from '../components/Loading';



export default function CreateTramo() {

    let navigate = useNavigate();

    const idPlaza = parseInt(useParams().id)
    const [plaza, setPlaza] = useState();
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
      
        const DetallesPlaza = async () => {
          const data = await call(`/plazas/${idPlaza}`,"GET")
          const plazas = await data.json()
          console.log(plazas)
          setPlaza(plazas)
          setIsLoading(false)
        }
          DetallesPlaza()
  
      },[idPlaza]);

    const[errors, setErrors]= useState({})
    const [form, setForm]= useState({
        fechaInicio:"",
        fechaFin:"",
        horaInicio:"",
        horaFin:""
    })

    const handleChange= evt => {
    
        const target = evt.target
        const name = target.name
        var value= target.value
      
        if (target.type === 'select-one'){
          value= target.value === 'true' ? true : false
         
        }
        
        setForm({...form,[name]: value})
        
      }


      //Cuerpo de la petición
    
      console.log(form.horaInicio.toString())
        const handleSubmit= async evt => {

        const body = {
            "fechaInicio":form.fechaInicio.toString()+"T"+form.horaInicio.toString()+":00",
            "fechaFin":form.fechaFin.toString()+"T"+form.horaFin.toString()+":00",
            "activo":false,
            "plaza": {
                "id": plaza.id,
                "direccion": plaza.direccion,
                "precioHora": plaza.precioHora,
                "fianza": plaza.fianza,
                "ancho": plaza.ancho,
                "largo": plaza.largo,
                "tramos":plaza.tramos,
                "estaDisponible": plaza.estaDisponible,
                "esAireLibre": plaza.esAireLibre,
                "descripcion": plaza.descripcion,
                "administrador": plaza.administrador
            }
        }

      evt.preventDefault()
      setErrors(validateTramoForm(form))
      var numeroErrores = Object.keys(validateTramoForm(form)).length;
      if (numeroErrores===0) {
          call(`/plazas/`+idPlaza+`/crearHorarios`,"POST", body).then(response => {
          console.log(response)
          if (response.ok) {
            navigate(`/disponibilidad/${idPlaza}`)
          }
      }) 
       
      }
    }

    if (isLoading) {
        return <Loading/>;
      }

    return(
    <div className="form-style-10">
    <h1>Crear Tramo Horario</h1>
    <form onSubmit={handleSubmit}>
    
    <div className="section"><span>1</span>Horarios</div>
    <div className="inner-wrap"></div>
            <Etiqueta>Fecha de Inicio: </Etiqueta>
            <Parrafo>
                <input onChange={handleChange} name="fechaInicio" type="date" value={form.fechaInicio} />
                <FormErrorMessage jsonErrors={errors} errorName="fechaInicio" />
            </Parrafo>
            <Etiqueta>Fecha de Fin: </Etiqueta>
            <Parrafo>
                <input onChange={handleChange} name="fechaFin" type="date" value={form.fechaFin} />
                <FormErrorMessage jsonErrors={errors} errorName="fechaFin" />
            </Parrafo>
            <Etiqueta>Hora Inicio: </Etiqueta>
            <Parrafo>
                <input onChange={handleChange} name="horaInicio" type="time" step="600" value={form.horaInicio} />
                <FormErrorMessage jsonErrors={errors} errorName="horaInicio" />
            </Parrafo>
            <Etiqueta>Hora Fin: </Etiqueta>
            <Parrafo>
                <input onChange={handleChange} name="horaFin" type="time" value={form.horaFin} />
                <FormErrorMessage jsonErrors={errors} errorName="horaFin" />
            </Parrafo>

            <input type="submit" value="Crear Tramo" />

    </form> </div>
    )
}
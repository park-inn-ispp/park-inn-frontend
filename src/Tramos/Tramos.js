import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import call from '../Util/Caller';
import Loading from '../components/Loading';



export default function MisTramos() {

    const[listaHorarios, setListaHorarios] = useState()
    const[isLoading, setIsLoading] = useState(true)
    const[plaza, setPlaza] = useState()
    const id = parseInt(useParams().id)

    let navigate = useNavigate();

    useEffect(() => {
        const ListaHorarios = async () => {
            const data = await  call(`/plazas/`+id+`/horarios`,"GET")
            const dataPlaza = await call(`/plazas/${id}`,"GET")
            const list = await data.json()
            const plaza = await dataPlaza.json()
            setPlaza(plaza)
            setListaHorarios(list)
            setIsLoading(false)            
        }
        ListaHorarios()
    }, []);

    function seleccionarHorario(idHorario,fechaInicio,fechaFin,activo) {
         const body = {
            "fechaInicio":fechaInicio,
            "fechaFin":fechaFin,
            "activo":activo,
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
        call(`/horarios/`+idHorario, 'PUT',body)
          .then(response => {
            console.log(response)
            if (response.ok){
                window.location.reload();
            }
          })
    }

    function eliminarHorario(id) {
       
        call(`/horarios/`+id, 'DELETE')
          .then(response => {
            if (response.ok){
              window.location.reload();
            }
          })
    }

    function disponibilidadTotal(id,str) {
         call(`/plazas/`+id+`/cambiarDisponibilidad/`+str, 'PUT')
        .then(response => {
          if (response.ok){
            window.location.reload();
          }
        })

    }

    //Pantalla de carga
    if (isLoading) {
        return <Loading/>;
      } else if (listaHorarios.length===0) {
        return (
        <><div>Aún no tienes horarios creados para tu plaza</div><div><input type="button" class="botonAzul" onClick={() => { window.open(`/disponibilidad/`+id+`/create`); } } value="Crear Horario" /></div></>)
    }else
    return (
        <body>
            <br/><input type="button" class="botonAzul" onClick={() => { navigate(`/disponibilidad/`+id+`/create`); } } value="Crear Tramo Horario" />
        <div className="tablas">
            <table>
                <tr>
                    <th>Fecha de Inicio</th>
                    <th>Hora de Inicio</th>
                    <th>Fecha de Finalización</th>
                    <th>Hora de Finalización</th>
                    <th>Opciones</th>
                </tr>
                {listaHorarios.map((horario) => {
                    var fechaInicio=horario.fechaInicio.split("T");
                    var fechaFin=horario.fechaFin.split("T");
                    return <tr>
                    <td>{fechaInicio[0]}</td>
                    <td>{fechaInicio[1]}</td>
                    <td>{fechaFin[0]}</td>
                    <td>{fechaFin[1]}</td>
                    <td>
                        {horario.activo===true ? (<div>Has seleccionado este horario<button type="button" className='deleteButton' onClick={() => seleccionarHorario(horario.id,horario.fechaInicio, horario.fechaFin,false)}>Deseleccionar</button></div>) : 
                        (<><button type="button" className='editButton' onClick={() => seleccionarHorario(horario.id,horario.fechaInicio, horario.fechaFin,true)}>Seleccionar</button>
                        <button type="button" className='deleteButton' onClick={() => eliminarHorario(horario.id)}>Eliminar</button></>
                        )}
                        
                    </td>                        
                    </tr>
})
}
            </table><br/>
            {plaza.tramos===false ? (<><div>Tu plaza está disponible siempre. Haz click en el siguiente botón para establecer la disponibilidad únicamente en los horarios seleccionados</div><br /><input type="button" class="botonAzul" onClick={() => { disponibilidadTotal(id,"true"); } } value="Establecer horarios" /></>):
            (<><div>Tu plaza está disponible en los horarios seleccionados. Haz click en el siguiente botón para hacer que siempre esté disponible</div><br /><input type="button" class="botonAzul" onClick={() => { disponibilidadTotal(id, "false"); } } value="Disponibilidad total" /></>)}
            <br/>


            
            
            </div></body>


    )


}
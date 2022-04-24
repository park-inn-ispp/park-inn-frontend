import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import call from '../Util/Caller';
import Loading from '../components/Loading';



export default function MisTramos() {

    const[listaHorarios, setListaHorarios] = useState()
    const[isLoading, setIsLoading] = useState(true)
    const id = parseInt(useParams().id)

    useEffect(() => {
        const ListaHorarios = async () => {
            const data = await  call(`/plazas/`+id+`/horarios`,"GET")
            const list = await data.json()
            console.log(list)
            setListaHorarios(list)
            setIsLoading(false)            
        }
        ListaHorarios()
    }, []);

    function seleccionarHorario() {
        /* const body = {
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
        }*/
        call()
    }

    function eliminarHorario(id) {
       
        call(`/horarios/`+id, 'PUT')
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
                    <td><button type="button" className='editButton' onClick={() => seleccionarHorario()}>Seleccionar</button>
                        <button type="button" className='deleteButton' onClick={() => eliminarHorario(horario.id)}>Eliminar</button>
                    </td>                        
                    </tr>
})
}
            </table>
            <input type="button" class="botonAzul" onClick={() => { window.open(`/disponibilidad/`+id+`/create`); } } value="Crear Tramo" />
            
            </div></body>


    )


}
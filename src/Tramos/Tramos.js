import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import call from '../Util/Caller';


export default function MisTramos() {

    const[listaTramos, setListaTramos] = useState()
    const id = parseInt(useParams().id)

    useEffect(() => {
        const ListaTramos = async () => {
            const data = await  call(``,"GET")
            const list = await data.json()
            setListaTramos(list)
            
        }
        ListaTramos()
    }, []);

    


    if (listaTramos===[]) {
        <div><input type="button" class="botonAzul" onClick={() => { window.open(`/disponibilidad/create`+id); } } value="Crear Tramo" /></div>
    }
    return (
        <body>
        <div className="tablas">
            <table>
                <tr>
                    <th>Fecha</th>
                    <th>Hora de Inicio</th>
                    <th>Hora de Finalización</th>
                    <th>Opciones</th>
                </tr>
            </table>
            <input type="button" class="botonAzul" onClick={() => { window.open(`/disponibilidad/`+id+`/create`); } } value="Crear Tramo" />
            
            </div></body>


    )


}
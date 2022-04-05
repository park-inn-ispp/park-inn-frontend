import ListComponent from "../components/ListComponent";
import call from "../Util/Caller";
import {useEffect, useState} from "react";
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import Cookies from 'universal-cookie';

const cookies = new Cookies();



export default function ReservaClientList(){
    let navigate = useNavigate();

    const id = useParams().id;
    const [reservas, setReservas] = useState(['loading']);
     
    console.log(id);
    useEffect(() => {
        call(`/mis-reservas/usuario/${id}`,"GET")
        .then(response => response.json())
        .then((res) => setReservas(res));
    },[id]);

    console.log(reservas);
    if (reservas[0] === 'loading'){
        return(
            <Loading></Loading>
        )
    }
    if (reservas === 'undefined' || reservas.length === 0){
        return(
            <h2>No hay reservas asociadas a este usuario</h2>
        )
    }

   
      function cancelarReserva(reservaId) {
        call(`/reservas/`+reservaId+'/cancelar', 'GET')
          .then(response => {
            console.log(response)
    
            if (response.ok){
              navigate(`/mis-reservas`)
            }
          })
      }

    return(
        <body>
        <div className="tablas">
            <table>
                <tr>
                    <th>Propietario</th>
                    <th>Direccion</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Precio total</th>
                    <th>Estado</th>
                </tr>
                {reservas.map((reserva) => {
                    //var estadoReserva = reserva.estado=="pendiente";
                    var cancelacionReserva = reserva.estado=="aceptada" || reserva.estado=="rechazada";
                    return <tr>
                        <td>{reserva.plaza.administrador.name}</td>
                        <td>{reserva.plaza.direccion}</td>

                        <td>{reserva.fechaInicio}</td>
                        <td>{reserva.fechaFin}</td>
                        <td>{reserva.precioTotal}</td>
                        <td>
                        {
                    cancelacionReserva ? (
                        <><button type='button' class='deleteButton' onClick={() => cancelarReserva(reserva.id)}>Cancelar reserva</button></>

                    ) : (reserva.estado)}
                        </td>
                    </tr>
                })}
            </table>
        </div>
        </body>
        
    );
}

import ListComponent from "../components/ListComponent";
import call from "../Util/Caller";
import {useEffect, useState} from "react";
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export default function ReservaOwnerList(){
    let navigate = useNavigate();

    const id = useParams().id;
    const [reservas, setReservas] = useState(['loading']);
     
    console.log(id);
    useEffect(() => {
        call(`/reservas/plaza/${id}`,"GET")
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
            <h2>Esta plaza no existe o no está disponible en este momento</h2>
        )
    }

    function aceptarReserva(reservaId) {
        call(`/reservas/`+reservaId+'/aceptar', 'GET')
          .then(response => {

    
            if (response.ok){
              navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
            }
          })
      }

      function rechazarReserva(reservaId) {
        call(`/reservas/`+reservaId+'/rechazar', 'GET')
          .then(response => {
            console.log(response)
    
            if (response.ok){
              navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
            }
          })
      }

    return(
        <body>
        <div className="tablas">
            <table>
                <tr>
                    <th>Cliente</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Precio total</th>
                    <th>Estado</th>
                </tr>
                {reservas.map((reserva) => {
                    var estadoReserva = reserva.estado=="pendiente";
                    var cancalacionReserva = reserva.estadoo=="aceptada" || reserva.estado=="rechazada";
                    return <tr>
                        <td>{reserva.user.name}</td>
                        <td>{reserva.fechaInicio}</td>
                        <td>{reserva.fechaFin}</td>
                        <td>{reserva.precioTotal}</td>
                        <td>
                        {
                    estadoReserva ? (
                        <><button type='button' class='deleteButton' onClick={() => rechazarReserva(reserva.id)}>Rechazar reserva</button><button type='button' class='editButton' onClick={() => aceptarReserva(reserva.id)}>Aceptar reserva</button></>

                    ) : (reserva.estado)}
                        </td>
                    </tr>
                })}
            </table>
        </div>
        </body>
        
    );
}
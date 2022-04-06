import ListComponent from "../components/ListComponent";
import call from "../Util/Caller";
import {useEffect, useState} from "react";
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import Cookies from 'universal-cookie';
import { BsWindowSidebar } from "react-icons/bs";

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
            <h2>Esta plaza no existe, no está disponible en este momento o no tiene reservas asociadas</h2>
        )
    }

    function aceptarReserva(reservaId) {
        call(`/reservas/`+reservaId+'/aceptar', 'GET')
          .then(response => {

    
            if (response.ok){
              //navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
              window.location.reload()
            }
          })
      }

      function rechazarReserva(reservaId) {
        call(`/reservas/`+reservaId+'/rechazar', 'GET')
          .then(response => {
            console.log(response)
    
            if (response.ok){
              //navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
              window.location.reload()
            }
          })
      }
  function cancelarReserva(reservaId) {
        call(`/reservas/`+reservaId+'/cancelar', 'GET')
          .then(response => {
            console.log(response)
    
            if (response.ok){
              //navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
              window.location.reload()
            }
          })
      }

      function verDetallesReserva(reservaId) {
        navigate(`/reservas/`+reservaId)
}

    return(
        <body>
        <div className="tablas">
            <table>
                <tr>
                    <th>Direccion</th>
                    <th>Cliente</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Precio total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                    <th>Detalles</th>
                </tr>
                {reservas.map((reserva) => {
                    var estadoReserva = reserva.estado=="pendiente";
                    var cancelacionReserva = reserva.estado=="aceptada";
                    return <tr>
                        <td>{reserva.plaza.direccion}</td>
                        <td>{reserva.user.name}</td>
                        <td>{reserva.fechaInicio}</td>
                        <td>{reserva.fechaFin}</td>
                        <td>{reserva.precioTotal}</td>
                        <td>{reserva.estado}</td>
                        <td>
                        {
                    estadoReserva ? (
                        <><button type='button' class='deleteButton' onClick={() => rechazarReserva(reserva.id)}>Rechazar reserva</button><button type='button' class='editButton' onClick={() => aceptarReserva(reserva.id)}>Aceptar reserva</button></>

                    ) : ("")}
                        
                        {
                    cancelacionReserva ? (
                        <button type='button' class='deleteButton' onClick={() => cancelarReserva(reserva.id)}>Cancelar reserva</button>

                    ) : ("")}
                        </td>
                        <td>
                        <button type='button' class='editButton' onClick={() => verDetallesReserva(reserva.id)}>Ver detalles</button>  
                        </td>
                    </tr>
                })}
            </table>
        </div>
        </body>
        
    );

}
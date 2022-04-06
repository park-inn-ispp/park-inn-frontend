import ListComponent from "../components/ListComponent";
import call from "../Util/Caller";
import {useEffect, useState} from "react";
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import Cookies from 'universal-cookie';

const cookies = new Cookies();



export default function ReservaClientList(){
    let navigate = useNavigate();
    const [reservas, setReservas] = useState(['loading']);
    const usuario = cookies.get('UserData');
     
    useEffect(() => {
        call(`/reservas/usuario/`+usuario.id,"GET")
        .then(response => response.json())
        .then((res) => setReservas(res));
    },[usuario.id]);

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
              //navigate(`/mis-reservas`)
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
                    <th>Propietario</th>
                    <th>Direccion</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Precio total</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
                {reservas.map((reserva) => {
                    //var estadoReserva = reserva.estado=="pendiente";
                    var cancelacionReserva = reserva.estado=="aceptada";
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

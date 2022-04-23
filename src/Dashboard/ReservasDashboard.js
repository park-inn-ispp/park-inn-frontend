import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';


import call from '../Util/Caller'


export default function ReservasDashboard(){
    const [reservas, setReservas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const id = parseInt(useParams().id);
    var totalReservas = Object.keys(reservas).length;
    var pendientes = Object.keys(reservas.filter(x => x.estado==="pendiente")).length;
    var aceptadas = Object.keys(reservas.filter(x => x.estado==="aceptada")).length;
    var rechazadas = Object.keys(reservas.filter(x => x.estado==="rechazada")).length;

    useEffect(() => {
        const Dashboard = async () => {
            const data = await call('/reservas/all', 'GET');
            const reservas = await data.json()
            setReservas(reservas);
            setIsLoading(false);
        }
        Dashboard();
    }, []);


    function borrarReservas(id) {
        call(`/reservas/`+id, 'DELETE')
          .then(response => {
            if (response.ok){
              window.location.reload();
            }
          })
      }

      function aceptarReserva(reservaId) {
        call(`/reservas/`+reservaId+'/aceptar', 'GET')
          .then(response => {
            if (response.ok){
              window.location.reload();
            }
          })
      }

      function rechazarReserva(reservaId) {
        call(`/reservas/`+reservaId+'/rechazar', 'GET')
          .then(response => {
            if (response.ok){
              window.location.reload();
            }
          })
      }

      function cancelarReserva(reservaId) {
        call(`/reservas/`+reservaId+'/cancelar', 'GET')
          .then(response => {
            if (response.ok){
              window.location.reload();
            }
          })
      }

    if (isLoading) {
        return <Loading/>;
      } 
      console.log(reservas)
      return (
        <div className='tablas'>
            <table >
                <tr>
                    <th>Propietario</th>
                    <th>Cliente</th>
                    <th>Dirección</th>
                    <th>Fecha Solicitud</th>
                    <th>Precio total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                    <th>Detalles</th>
                </tr>
                {reservas.map((reserva) => {
                    console.log(reserva.plaza)
                    var estadoReserva = reserva.estado==="pendiente";
                    var cancelacionReserva = reserva.estado==="aceptada";
                    if(reserva.plaza){
                      return <tr>
                      <td>{reserva.plaza.administrador.name}</td>
                      <td>{reserva.user.name}</td>
                      <td>{reserva.plaza.direccion}</td> 
                      <td>{reserva.fechaSolicitud}</td>
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
                      <td><a type="button" className="editButton" href={'/reservas/'+reserva.id}>Ver detalles</a></td>

                  </tr>
                    }
                    
                })
            }
            </table>

            <div className='form-style-10'>
    <table>
    <tr>

        <tr>
        <td scope='row' abbr='numReservas'>Número total de reservas realizadas</td>
        <td>{totalReservas}</td>
        </tr>

        <tr>
            <td scope='row' abbr='numReservasPendiente'>Número total de reservas pendientes</td>
            <td>{pendientes}</td>
        </tr>

        <tr>
            <td scope='row' abbr='numReservasAceptada'>Número total de reservas aceptadas</td>
            <td>{aceptadas}</td>
        </tr>

        <tr>
            <td scope='row' abbr='numReservasRechazada'>Número total de reservas rechazadas</td>
            <td>{rechazadas}</td>
        </tr>
    </tr>
    </table>
    </div>

        </div>


    
              

)
        }
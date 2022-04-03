import React, {Component, useEffect, useState} from 'react';
import Loading from '../components/Loading';
import { useParams, Navigate, useNavigate } from 'react-router-dom';


import call from '../Util/Caller'


export default function ReservasDashboard(){
    let navigate = useNavigate();

    const [reservas, setReservas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const id = parseInt(useParams().id);
    var totalReservas = Object.keys(reservas).length;
    var pendientes = Object.keys(reservas.filter(x => x.estado=="pendiente")).length;
    var aceptadas = Object.keys(reservas.filter(x => x.estado=="aceptada")).length;
    var rechazadas = Object.keys(reservas.filter(x => x.estado=="rechazada")).length;

    useEffect(() => {
        const Dashboard = async () => {
            const data = await call('/reservas/all', 'GET');
            const reservas = await data.json()
            setReservas(reservas);
            setIsLoading(false);
            
        }
        Dashboard();
    });


    function borrarReservas(id) {
        call(`/reservas/`+id, 'DELETE')
          .then(response => {

    
            if (response.ok){
              navigate(`/dashboard-reservas`)
            }
          })
      }

    if (isLoading) {
        return <Loading/>;
      }

      return (
        <div className='tablas'>
            <table >
                <tr>
                    <th>Propietario</th>
                    <th>Cliente</th>
                    <th>Fecha Solicitud</th>
                    <th>Fecha inicio</th>
                    <th>Fecha fin</th>
                    <th>Precio total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                {reservas.map((reserva) => {
                    return <tr>
                        <td>{reserva.plaza.administrador.name}</td>
                        <td>{reserva.user.name}</td>
                        <td>{reserva.fechaSolicitud}</td>
                        <td>{reserva.fechaInicio}</td>
                        <td>{reserva.fechaFin}</td>
                        <td>{reserva.precioTotal}</td>
                        <td>{reserva.estado}</td>
                        <td><a type="button" className="editButton" href={'/reservas/edit/'+reserva.id}>Editar/ver detalles</a>
                        <button type='button' class='deleteButton' onClick={() => borrarReservas(reserva.id)}>Eliminar reserva</button></td>

                    </tr>
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
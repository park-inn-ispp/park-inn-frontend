import React, {Component, useEffect, useState} from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavBar from '../AppNavBar';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ListComponent from '../components/ListComponent';
import call from '../Util/Caller'
import {Etiqueta, Parrafo} from '../Reserva/ReservaDetails.elements';


export default function Dashboard(){
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
            console.log(reservas);
            
        }
        Dashboard();
    });

    if (isLoading) {
        return <Loading/>;
      }

      return (
          <div className='form-style-10'>
              <tr>
                  <th></th>

                  <tr>
                    <th scope='row' abbr='numReservas'>Número total de reservas realizadas</th>
                    <td>{totalReservas}</td>
                  </tr>

                  <tr>
                      <th scope='row' abbr='numReservasPendiente'>Número total de reservas pendientes</th>
                      <td>{pendientes}</td>
                  </tr>

                  <tr>
                      <th scope='row' abbr='numReservasAceptada'>Número total de reservas aceptadas</th>
                      <td>{aceptadas}</td>
                  </tr>

                  <tr>
                      <th scope='row' abbr='numReservasRechazada'>Número total de reservas rechazadas</th>
                      <td>{rechazadas}</td>
                  </tr>
              </tr>
          </div>
      )
}
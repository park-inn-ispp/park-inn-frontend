import React, {Component, useEffect, useState} from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar';
import { Link, useParams } from 'react-router-dom'


export default function ReservaDetails() {

    const [reserva, setReserva] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        DetallesReserva()
    }, []);

    const id = parseInt(useParams().id)
    const DetallesReserva = async () => {
        const data = await fetch(`http://localhost:8080/reservas/${id}`)
        const reserva = await data.json()
        setReserva(reserva)
        setIsLoading(false)
        console.log(reserva)
    }

    if (isLoading) {
        return <p>Loading...</p>;
      }

    return (
            <div>
                <div><h3>Reserva {reserva.plaza.direccion}</h3></div>

                <Container fluid>
                    <div className="Details">
                        Estado: {reserva.estado}<p/>
                        Precio total: {reserva.precioTotal} €<p/>
                        Fecha de inicio: {reserva.fechaInicio}<p/>
                        Fecha de fin: {reserva.fechaFin}<p/>
                        Fecha de solicitud: {reserva.fechaSolicitud}<p/>
                        Propietario: {reserva.plaza.administrador.name}<p/>
                        Comentarios: {reserva.comentarios}
                    </div>
                </Container>
            </div>



    );

}


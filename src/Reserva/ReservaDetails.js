import React, {Component, useEffect, useState} from 'react';
import { Button, ButtonGroup, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar';
import { Link, useParams } from 'react-router-dom'
import {Etiqueta, Container, Parrafo} from '../Reserva/ReservaDetails.elements';
import { Store } from 'react-notifications-component'
import call from '../Util/Caller';


export default function ReservaDetails() {



    const [reserva, setReserva] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        DetallesReserva()
    }, []);

    const id = parseInt(useParams().id)
    const DetallesReserva = async () => {
       
        const data = await  call(`/reservas/${id}`,"GET")
        const reserva = await data.json()
        setReserva(reserva)
        setIsLoading(false)
        console.log(reserva)
    }

    if (isLoading) {
        return <p>Loading...</p>;
      }

    return (   

        <Container>
            <h3>Reserva</h3>
                <div className="Details">
                <Etiqueta>Estado:</Etiqueta><p/> 
                <Parrafo>{reserva.estado}</Parrafo><p/>
                <Etiqueta>Precio total:</Etiqueta><p/> 
                <Parrafo>{reserva.precioTotal}€</Parrafo><p/>
                <Etiqueta>Fecha de inicio:</Etiqueta> <p/>
                <Parrafo>{reserva.fechaInicio.split('T')[0]}</Parrafo><p/>
                <Etiqueta>Fecha de fin:</Etiqueta> <p/>
                <Parrafo>{reserva.fechaFin.split('T')[0]}</Parrafo><p/>
                <Etiqueta>Fecha de solicitud:</Etiqueta> <p/>
                <Parrafo>{reserva.fechaSolicitud.split('T')[0]}</Parrafo><p/>
                <Etiqueta>Propietario:</Etiqueta> <p/>
                <Parrafo>{reserva.plaza.administrador.name}</Parrafo><p/>
                <Etiqueta>Comentarios:</Etiqueta> <p/>
                <Parrafo>{reserva.comentarios}</Parrafo>
                </div>
        </Container>
         



    );

}


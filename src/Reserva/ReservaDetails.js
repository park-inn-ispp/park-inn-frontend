import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading';
import {Etiqueta, Parrafo} from '../Reserva/ReservaDetails.elements';
import call from '../Util/Caller';
import Cookies from 'universal-cookie';
import { StyledButton } from '../components/GeneralButton/GeneralButton.elements';
import { Store } from 'react-notifications-component';


export default function ReservaDetails() {

    const [reserva, setReserva] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fechaFin, setFechaFin] = useState(new Date())
    const id = parseInt(useParams().id)
    const today = new Date()
    const cookies = new Cookies();
    const usuario = cookies.get('UserData');
    const [esCliente, setEsCliente] = useState(false);
    const [esPropietario, setEsPropietario] = useState(false);
    const [estado, setEstado] = useState(false);

    let navigate = useNavigate();
    



    useEffect(() => {
        const DetallesReserva = async () => {
            const data = await  call(`/reservas/${id}`,"GET")
            const reserva = await data.json()
            setReserva(reserva)
            setFechaFin(new Date(reserva.fechaFin))
            const esCli = reserva.user.id===usuario.id;
            const esPro = reserva.plaza.administrador.id===usuario.id;
            setEsCliente(esCli)
            setEsPropietario(esPro)
            setEstado(reserva.estado)
            setIsLoading(false)
        }
        DetallesReserva()
    }, [id]);




    async function confirmarServicio(id) {
        const url = '/reservas/'+id+'/confirmar'
        call(url,'GET').then(response => response.json())
        .then(response=>console.log(response)).then(navigate("/"));
        
        Store.addNotification({
            title: "SERVICIO CONFIRMADO!",
            message: "El servicio se ha confirmado con éxito",
            type: "success",
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          })
    }
        
    function generarIncidencia(id) {
        const url = '/reservas/'+id+'/denegar'
        navigate("/reservas/"+id+"/incidencia/new")      
    }

    //Pantalla de carga
    if (isLoading) {
        return <Loading/>;
      }

    //Validaciones de la confirmación del servicio
    let validaFecha = fechaFin<today
    console.log("Fecha fin:"+fechaFin)
    console.log("Hoy:"+today.toLocaleString())

    let validaEstado = validaFecha && ((reserva.estado!=="confirmadaUsuario" && !esPropietario) 
        || (reserva.estado!=="confirmadaPropietario" && !esCliente)) && reserva.estado!=="confirmadaAmbos"
        
    let unrelated = !esPropietario && !esCliente
    let botones = validaFecha && validaEstado && !unrelated && estado !== "denegada"

    let FInicio = reserva.fechaInicio.split('T')
    let FFin = reserva.fechaFin.split('T')
    let FSolicitud = reserva.fechaSolicitud.split('T')

    console.log(esPropietario)

    return (   
        <div className="form-style-10">
            <h1>Detalles de la Reserva</h1>
                <div className="Details">
                <Etiqueta>Estado:</Etiqueta><p/> 
                <Parrafo>{estado}</Parrafo><p/>
                <Etiqueta>Dirección:</Etiqueta><p/> 
                <Parrafo>{reserva.plaza.direccion}</Parrafo><p/>
                <Etiqueta>Precio de la fianza:</Etiqueta><p/> 
                <Parrafo>{reserva.plaza.fianza} €</Parrafo><p/>
                <Etiqueta>Precio total:</Etiqueta><p/> 
                <Parrafo>{reserva.precioTotal} €</Parrafo><p/>
                <Etiqueta>Fecha de inicio:</Etiqueta> <p/>
                <Parrafo>{FInicio[0]}</Parrafo><p/>
                <Parrafo>{FInicio[1]}</Parrafo><p/>
                <Etiqueta>Fecha de fin:</Etiqueta> <p/>
                <Parrafo>{FFin[0]}</Parrafo><p/>
                <Parrafo>{FFin[1]}</Parrafo><p/>
                <Etiqueta>Fecha de solicitud:</Etiqueta> <p/>
                <Parrafo>{FSolicitud[0]}</Parrafo><p/>
                <Etiqueta>Propietario:</Etiqueta> <p/>
                <Parrafo>{reserva.plaza.administrador.name}</Parrafo><p/>
                <Parrafo>{reserva.plaza.administrador.email}</Parrafo><p/>
                <Etiqueta>Comentarios:</Etiqueta> <p/>
                <Parrafo>{reserva.comentarios}</Parrafo>
                

                {botones ? (
                        <><Etiqueta>Servicio:</Etiqueta>
                        <StyledButton type="button" onClick={() => confirmarServicio(reserva.id)}>Confirmar servicio</StyledButton><br/>
                        <StyledButton type="button" onClick={() => generarIncidencia(reserva.id)}>Generar incidencia</StyledButton></>
                    ) :("") 
                }
                </div>
        </div>
    );
}


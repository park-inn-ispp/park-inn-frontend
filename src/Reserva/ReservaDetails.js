import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading';
import call from '../Util/Caller';
import Cookies from 'universal-cookie';
import { StyledButton } from '../components/GeneralButton/GeneralButton.elements';
import { Store } from 'react-notifications-component';
import { Etiqueta, Global, Parrafo, Title} from '../Usuarios/ViewProfileElements';
import { Line } from '../Plaza/EditPlaza.elements';
import { Wrapper2 } from '../Reserva/ReservaDetails.elements';


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
            const esCli = reserva.reserva.user.id===usuario.id;
            const esPro = reserva.reserva.plaza.administrador.id===usuario.id;
            setEsCliente(esCli)
            setEsPropietario(esPro)
            setEstado(reserva.estado)
            setIsLoading(false)
        }
        DetallesReserva()
    }, [usuario.id, id]);




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
        <Global>
            <Wrapper2>
                <Title>Detalles Reserva</Title>
                <Line><Etiqueta>Estado: </Etiqueta><Parrafo>{estado}</Parrafo></Line>
                <Line><Etiqueta>Dirección: </Etiqueta><Parrafo>{reserva.plaza.direccion}</Parrafo></Line> 
                <Line><Etiqueta>Fianza: </Etiqueta><Parrafo>{reserva.plaza.fianza} €</Parrafo></Line> 
                <Line><Etiqueta>Precio: </Etiqueta><Parrafo>{reserva.precioTotal} €</Parrafo></Line> 
                <Line><Etiqueta>Tramo: </Etiqueta><Parrafo>{FInicio} - {FFin}</Parrafo></Line> 
                <Line><Etiqueta>Fecha Solicitud: </Etiqueta><Parrafo>{FSolicitud[0]}</Parrafo></Line> 
                <Line><Etiqueta>Propietario: </Etiqueta><Parrafo>{reserva.plaza.administrador.name} - {reserva.plaza.administrador.email}</Parrafo></Line> 
                <Line><Etiqueta>Comentarios: </Etiqueta><Parrafo>{reserva.comentarios}</Parrafo></Line>
                {botones ? (
                        <><Etiqueta>Servicio:</Etiqueta>
                        <StyledButton type="button" onClick={() => confirmarServicio(reserva.id)}>Confirmar servicio</StyledButton><br/>
                        <StyledButton type="button" onClick={() => generarIncidencia(reserva.id)}>Generar incidencia</StyledButton></>
                    ) :("") 
                }
            </Wrapper2>
        </Global>
    );
}


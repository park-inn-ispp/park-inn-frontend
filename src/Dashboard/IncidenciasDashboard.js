import React, { useEffect, useState} from 'react';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import call from '../Util/Caller'
import Popup from '../components/Popup'

export default function IncidenciasDashboard(){
    let navigate = useNavigate();
    const [incidencias, setIncidencias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [contenido, setContenido] = useState("");
    var totalIncidencias = Object.keys(incidencias).length;
    var abiertas = Object.keys(incidencias.filter(x => x.estado==="pendiente")).length;
    var cerradas = Object.keys(incidencias.filter(x => x.estado==="resuelta")).length;
    useEffect(() => {
        const Dashboard = async () => {
            const data = await call('/incidencias/all', 'GET');
            const incidencias = await data.json()
            setIncidencias(incidencias);
            setIsLoading(false);
        }
        Dashboard();
    },[]);


    function cerrarIncidencia(id) {
        call(`/incidencias/`+id, 'PUT')
          .then(response => {
            if (response.ok){
              navigate(`/dashboard-incidencias`)
            }
          })
    }

    function popup(content) {
        setContenido(content);
        setButtonPopup(true);
    }

    if (isLoading) {
        return <Loading/>;
    } else if (totalIncidencias === 0) {
        return (
            <div>
                <h1>No hay incidencias</h1>
            </div>
        )   
    }else {
        return (
        <div className='tablas'>
            <table >
                <tr>
                    <th>Id</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Email</th>
                    <th>IdReserva</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                {incidencias.map((incidencia) => {
                    return <tr>
                        <td>{incidencia.id}</td>
                        <td>{incidencia.titulo}</td>
                        <td><button type="button" className='editButton'  onClick={() => popup(incidencia.descripcion)}>Ver descripción</button>
                        </td>
                        <td>{incidencia.fecha}</td>
                        <td>{incidencia.user.email}</td>
                        <td>{incidencia.reserva.id}</td>
                        <td>{incidencia.estado}</td>
                        <td>{incidencia.estado == "pendiente" ?
                            <button type='button' class='deleteButton' onClick={() => cerrarIncidencia(incidencia.id)}>Cerrar Incidencia</button> : 
                            <p>Incidencia cerrada</p>}
                        </td>

                    </tr>
                })
            }
            </table>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup} content={contenido}/>          
            <div className='form-style-10'>
    <table>
    <tr>
        <tr>
        <td scope='row' abbr='numIncidencias'>Número total de incidencias realizadas</td>
        <td>{totalIncidencias}</td>
        </tr>
        <tr>
            <td scope='row' abbr='numIncidenciasAbiertas'>Número total de incidencias abiertas</td>
            <td>{abiertas}</td>
        </tr>
        <tr>
            <td scope='row' abbr='numIncidenciasCerradas'>Número total de incidencias cerradas</td>
            <td>{cerradas}</td>
        </tr>
    </tr>
    </table>
    </div>
        </div>
    )
    }
}
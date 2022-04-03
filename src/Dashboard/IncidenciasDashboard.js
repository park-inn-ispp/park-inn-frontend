import React, { useEffect, useState} from 'react';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import call from '../Util/Caller'

export default function IncidenciasDashboard(){
    let navigate = useNavigate();
    const [incidencias, setIncidencias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    var totalIncidencias = Object.keys(incidencias).length;
    var abiertas = Object.keys(incidencias.filter(x => x.estado==="abierta")).length;
    var cerradas = Object.keys(incidencias.filter(x => x.estado==="cerrada")).length;
    useEffect(() => {
        const Dashboard = async () => {
            const data = await call('/incidencias/all', 'GET');
            const incidencias = await data.json()
            setIncidencias(incidencias);
            setIsLoading(false);
        }
        Dashboard();
    });


    function cerrarIncidencia(id) {
        const data= {
            "estado":"cerrado"
        }
        call(`/incidencias/`+id, 'PUT', data)
          .then(response => {
            if (response.ok){
              navigate(`/dashboard-incidencias`)
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
                        <td>{incidencia.descripcion}</td>
                        <td>{incidencia.fecha}</td>
                        <td>{incidencia.email}</td>
                        <td>{incidencia.idReserva}</td>
                        <td>{incidencia.estado}</td>
                        <td><button type='button' class='deleteButton' onClick={() => cerrarIncidencia(incidencia.id)}>Cerrar Incidencia</button></td>

                    </tr>
                })
            }
            </table>
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
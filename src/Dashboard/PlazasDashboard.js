import React, {Component, useEffect, useState} from 'react';
import Loading from '../components/Loading';
import call from '../Util/Caller'
import { useParams, Navigate, useNavigate } from 'react-router-dom';



export default function PlazasDashboard(){
    let navigate = useNavigate();

    const [plazas, setPlazas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const id = parseInt(useParams().id);
    var totalplazas = Object.keys(plazas).length;
    

    useEffect(() => {
        const Dashboard = async () => {
            const data = await call('/plazas/all', 'GET');
            const plazas = await data.json()
            setPlazas(plazas);
            setIsLoading(false);
            
        }
        Dashboard();

        
    });

    function borrarPlaza(id) {
        
      call(`/plazas/`+id, 'DELETE')
        .then(response => {
          console.log(response.ok)
  
          if (response.ok){
            console.log("ELIMINADA")
            navigate(`/dashboard-plazas`)
          }
        })
    }


    if (isLoading) {
        return <Loading/>;
      }

      return (
          <div className='tablas'>
            <h1 className='titulos'>PLAZAS</h1>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Direccion</th>
                    <th>Precio Hora</th>
                    <th>Fianza</th>
                    <th>Ancho</th>
                    <th>Largo</th>
                    <th>Acciones</th>
                </tr>
                {plazas.map((plaza) => {
    
                    return <tr>
                    <td>{plaza.id}</td>
                    <td>{plaza.direccion}</td>
                    <td>{plaza.precioHora}</td>
                    <td>{plaza.fianza}</td>
                    <td>{plaza.ancho}</td>
                    <td>{plaza.largo}</td>
                    <td><a type="button" className='editButton' href={'/plaza/edit/'+plaza.id}>Editar/Ver detalles</a>
                    <button type="button" class="deleteButton"  onClick={() => borrarPlaza(plaza.id)}> Eliminar plaza </button></td>
                                                            
                </tr>
                })
            }
            </table>
            <table className='form-styled-10'>
              <tr>

                    <tr>
                      <td scope='row' abbr='numPlazas'>Número total de reservas realizadas</td>
                      <td>{totalplazas}</td>
                    </tr>

                </tr>
              </table>

          </div>
          
      )
}
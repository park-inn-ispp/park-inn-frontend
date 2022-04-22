import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import call from '../Util/Caller'
import { useNavigate } from 'react-router-dom';
import displayNotification from '../Util/Notifications';




export default function UsuariosDashboard(){
    let navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    var totalUsuarios = Object.keys(usuarios).length;

    

    useEffect(() => {
        const Dashboard = async () => {
            const data = await call('/clients', 'GET');
            const usuarios = await data.json()
            setUsuarios(usuarios);
            setIsLoading(false);
        }
        Dashboard();
    }, []);

    function loggedInParse(usuario){
        if (usuario.loggedIn===true) {
            return 'Si';
        } else {
            return 'No';
        }
    }


    function borrarUsuario(id) {
        console.log(id)
        call(`/clients/`+id, 'DELETE')
          .then(response => {
            console.log(response.ok)
    
            if (response.ok){
              displayNotification("Éxito","Usuario borrado correctamente","success")
              navigate(`/dashboard-usuarios`)
            }
          })
      }

      function banearUsuario(id) {
        console.log(id)
        call(`/clients/`+id + '/banear', 'PUT')
          .then(response => {
            console.log(response.ok)
    
            if (response.ok){
              displayNotification("Éxito","Usuario baneado correctamente","success")
              navigate(`/dashboard-usuarios`)
            }
          })
      }

    if (isLoading) {
        return <Loading/>;
      }

      return (
          
          <div   className='tablas'>
            <h1 className='titulos'>USUARIOS</h1>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Correo electrónico</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
                {usuarios.map((usuario) => {
    
                    return <tr>
                    <td>{usuario.id}</td>   
                    <td>{usuario.name}</td>
                    <td>{usuario.surname}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.phone}</td> 
                    <td>
                    <button type='button' class='deleteButton' onClick={() => banearUsuario(usuario.id)}>Banear usuario</button>  
                    <button type='button' class='deleteButton' onClick={() => borrarUsuario(usuario.id)}>Eliminar usuario</button>
                    <a type="button" className="editButton" href={'/clients/'+usuario.id}>Editar</a> <span>(meter url real en Editar)</span>
                    
                    </td>
                                                                                                                                                                                                                                               
                </tr>
                })
            }
            </table>
            <table className='form-styled-10'>
              <tr>

                    <tr>
                      <td scope='row' abbr='numUsuarios'>Número total de reservas realizadas</td>
                      <td>{totalUsuarios}</td>
                    </tr>

                </tr>
              </table>

          </div>
          
      )
}
import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import call from '../Util/Caller'
import { useNavigate } from 'react-router-dom';
import displayNotification from '../Util/Notifications';
import validateComision from './ValidateComision';
import FormErrorMessage from '../Util/FormErrorMessage';




export default function ComisionDashboard(){
    let navigate = useNavigate();

    const [comision, setComision] = useState();
    const [editando, setEditando] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const[errors, setErrors]= useState({})


    useEffect(() => {
        const Dashboard = async () => {
            const data = await call('/comision/1', 'GET');
            const comisionBackend = await data.json()
            console.log("COMISIÓN BACKEND")
            console.log(comisionBackend)
            comisionBackend["porcentaje"]=""+Math.round(comisionBackend.porcentaje*100);
            setComision(comisionBackend);
            setIsLoading(false);
        }
        Dashboard();
    }, []);
    
  const handleChange= evt => {
    
    const target = evt.target
    const name = target.name
    var value= target.value
   
    setComision({...comision,[name]: value})
    
  }
  console.log(comision)
  const handleSubmit= evt => {
    
    evt.preventDefault()
    var nuevosErrores= validateComision(comision)
    setErrors(nuevosErrores)
    var numeroErrores = Object.keys(nuevosErrores).length;
    if(numeroErrores===0){
      setComision({...comision,["porcentaje"]: Math.round(comision.porcentaje)})
      
      const data= {
        "id": 1,
        "porcentaje": Math.round(comision.porcentaje)/100
      }
      console.log("DATOS ENVIADOS:")
      console.log(data)
      setEditando(false)
      
      call('/comision/1/editar', 'PUT',data)
        .then(response => {
          if (response.ok){
            setEditando(false)
            
          }
        })
      
    }    
  }

    if (isLoading) {
        return <Loading/>;
      }

      return (
          
          <div   className='tablas'>
            <h1 className='titulos'>COMISIÓN DE PARK-INN</h1>
            
            <table>
            <tr>
              <th>Porcentaje de Comisión</th>
            </tr>
            <tr>
            { editando ? 
              (<> <div class="form-style-10">
                    <form onSubmit={handleSubmit}>
                      <td><input onChange={handleChange} name="porcentaje" type="number"  value={comision.porcentaje} placeholder="10"/> </td>
                      <FormErrorMessage jsonErrors={errors} errorName="porcentaje"/>
                      <td><input type="submit" value="Guardar" /> </td>
                      
                    </form>
                  </div>
              </>)
            :( <>
              <div class="form-style-10">
              <td>{comision.porcentaje} %</td>
              <td><button type='button' class='editButton' onClick={() =>setEditando(true)}>Editar</button></td>
              </div>
              </>
            )}
              
              
            </tr>

              </table>

          </div>
          
      )
}
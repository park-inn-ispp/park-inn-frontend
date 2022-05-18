import React, { useEffect, useState} from 'react';
import call from '../Util/Caller'
import './Cupones.css'
import displayNotification from '../Util/Notifications';

export default function Cupones(){


    const [valorCupon, setValorCupon] = useState("");
    const [descuentoCupon, setDescuentoCupon] = useState("");
    const [cuponAEliminar, setCuponAEliminar] = useState("");
    const [listaCupones, setLista] = useState([]);

    call("/descuento/all").then(async res =>{
      let allCupones = await res.json()
      setLista(allCupones)
    })
    function enviarDescuento(){

        const body = {
            "name" : valorCupon,
            "descuento" : descuentoCupon
        }
        if(valorCupon==="" ||valorCupon==null ||valorCupon==undefined){
          displayNotification("⚠","Debes de introducir un cupón","warning")
  
        }else{
          call("/descuento","POST",body).then(async res =>{
            if(res.ok){
              displayNotification("Exito","Se ha creado el cupon correctamente","success")
  
            }else{
              displayNotification("Error","El cupon no es valido","error")
  
            }
          })
        }
    }
    function eliminarDescuento(){
      if(cuponAEliminar==="" ||cuponAEliminar==null ||cuponAEliminar==undefined){
        displayNotification("⚠","Debes de introducir un cupón a eliminar","warning")

      }else{
        call("/descuento/name/"+cuponAEliminar,"GET").then(async res=>{
          let data = await res.json()
          await call("/descuento/delete/"+data.id,"DELETE").then(async res =>{
            if(res.ok){
              displayNotification("Exito","Se ha borrado el cupon correctamente","success")
              setLista(listaCupones.filter(function(el) { return el.id != data.id; })); 
              
            }
          })
      })
      }

        
        
    }

    const handleChangeInputEnviar= evt => {
    
        const target = evt.target
        const name = target.name
        var value= target.value
        setValorCupon(value)
      }

      const handleChangeInputEnviarValor= evt => {
    
        const target = evt.target
        const name = target.name
        var value= target.value
        setDescuentoCupon(value)
      }
      const handleChangeInputEliminar= evt => {
    
        const target = evt.target
        const name = target.name
        var value= target.value
        setCuponAEliminar(value)
      }

    return(<div className='divCupones'>
        
            <div className='cabeceraCrearCupon'>Crear cupón</div>
            <div className='crearCupon'>
            <input type="text" placeholder="Nombre del cupón" className='inputNombreCupon' onChange={handleChangeInputEnviar}></input>
            <input type="number" min="0" max="100" placeholder="Descuento" className='inputDescuentoCupon' onChange={handleChangeInputEnviarValor}></input>
            <button className='inputBotonEnviarCupon' onClick={() => enviarDescuento()}>&#8594;</button>
            </div>


            <div className='cabeceraCrearCupon'>Eliminar cupón</div>
            <div className='eliminarCupon'>
            <input type="text" placeholder="Nombre del cupón" className='inputNombreCupon' onChange={handleChangeInputEliminar}></input>
            <button className='inputBotonEnviarCupon' onClick={() => eliminarDescuento()}>&#8594;</button>
            </div>

            <div className='cabeceraCrearCupon'>Lista cupones</div>
            <div className='listaCupones'>
              {listaCupones.map(cupon =>{
                return(<div className='rowCupon'>
                <div className='cuponValue'>{cupon.name}</div>
                <div className='cuponValue'>Descuento : {cupon.descuento}%</div>
                </div>
                )
              })}
            </div>
    </div>)
}
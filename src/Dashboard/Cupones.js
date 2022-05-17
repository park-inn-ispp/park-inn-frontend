import React, { useEffect, useState} from 'react';
import call from '../Util/Caller'
import './Cupones.css'
import displayNotification from '../Util/Notifications';

export default function Cupones(){

    let valorCupon="";
    let descuentoCupon="";
    let cuponAEliminar="";

    function enviarDescuento(){
        console.log(valorCupon)
        console.log(descuentoCupon)
        const body = {
            "name" : valorCupon,
            "descuento" : descuentoCupon
        }
        call("/descuento","POST",body).then(async res =>{
          if(res.ok){
            displayNotification("Exito","Se ha creado el cupon correctamente","success")

          }else{
            displayNotification("Error","El cupon no es valido","error")

          }
        })
    }
    function eliminarDescuento(){
        
        
        call("/descuento/name/"+cuponAEliminar,"GET").then(async res=>{
            let data = await res.json()
            await call("/descuento/delete/"+data.id,"DELETE").then(async res =>{
              if(res.ok){
                displayNotification("Exito","Se ha borrado el cupon correctamente","success")
    
              }
            })
        })
    }

    const handleChangeInputEnviar= evt => {
    
        const target = evt.target
        const name = target.name
        var value= target.value
        valorCupon = value
      }

      const handleChangeInputEnviarValor= evt => {
    
        const target = evt.target
        const name = target.name
        var value= target.value
        descuentoCupon = value
      }
      const handleChangeInputEliminar= evt => {
    
        const target = evt.target
        const name = target.name
        var value= target.value
        cuponAEliminar = value
      }

    return(<div className='divCupones'>
        
            <div className='cabeceraCrearCupon'>Crear cupón</div>
            <div className='crearCupon'>
            <input type="text" placeholder="Nombre del cupón" className='inputNombreCupon' onChange={handleChangeInputEnviar}></input>
            <input type="text" placeholder="Descuento" className='inputDescuentoCupon' onChange={handleChangeInputEnviarValor}></input>
            <button className='inputBotonEnviarCupon' onClick={() => enviarDescuento()}>&#8594;</button>
            </div>


            <div className='cabeceraCrearCupon'>Eliminar cupón</div>
            <div className='eliminarCupon'>
            <input type="text" placeholder="Nombre del a eliminar" className='inputNombreCupon' onChange={handleChangeInputEliminar}></input>
            <button className='inputBotonEnviarCupon' onClick={() => eliminarDescuento()}>&#8594;</button>
            </div>
    </div>)
}
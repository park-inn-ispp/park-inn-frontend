import React, { useState } from 'react';
import call from '../Util/Caller';
import { Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { ReactNotifications } from 'react-notifications-component'
import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import Loading from '../components/Loading';
import { useParams, useNavigate } from 'react-router-dom';

export default function Pagar({precio=1.0,reserva}) {
 
  let navigate = useNavigate();
  const initialOptions= {
    "client-id":"Adu4jUtTkaJxNFqufhztoNp-CQuZWJLkvV5FDn_aIpkhbWlSvnPwSq2TNDsT4vFZt-_uEmF_rtH89Mvk",
    currency:"EUR"
    

  }

  
  

  async function getData() {
      
    const data = await call(`/plazas/${reserva.plaza.id}/reservar`,"POST",reserva)
    const response = await data.json()
    console.log(response)
    if (data.ok){
      Store.addNotification({
        title: "RESERVA CONFIRMADA!",
        message: "Tu reserva se ha realizado con éxito, ahora puedes ver los detalles o cancelarla antes de 24 horas",
        type: "success",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      
    }
    
                         
    if(response.id!=="undefined" && response.id!=="NaN"){
     
      navigate(`/reservas/${response.id}`)

     }else{ // Si ha ocurrido algún error, mostrarlo
      navigate("/")
     }
    return response.id
  } 
 
 
   

  return (
   

    
    <div class="form-style-10">
    <ReactNotifications />
    <h1> Realizar pago</h1>

    <div class="section"> Importe total: {precio} € </div>
    <div class="inner-wrap">
    <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                 createOrder={(data, actions) => {
                     return actions.order.create({
                         purchase_units: [
                             {   
                                amount: {
                                     value: precio,
                                 },
                             },
                         ],
                     });
                 }}
                 onApprove={(data, actions) => {
                     return actions.order.capture().then((details) => {
                         
                         reserva["paypal_order_id"]= details.id
                         console.log("PAYPAL_ORDER_ID")
                         console.log(reserva["paypal_order_id"])
                         console.log("NUEVA RESERVA")
                         console.log(reserva)
                         
                         const id =  getData()
                         
                     });
                 }}
                />
    </PayPalScriptProvider>
    </div>

  </div>
  );
}
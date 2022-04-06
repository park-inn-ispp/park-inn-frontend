import React, { useState } from 'react';
import call from '../Util/Caller';
import { Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { ReactNotifications } from 'react-notifications-component'
import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import Loading from '../components/Loading';
import { useParams, useNavigate } from 'react-router-dom';
import displayNotification from '../Util/Notifications';
import {Etiqueta, Parrafo, Formulario} from '../Plaza/ReservaPlaza.elements';



export default function Pagar({precio=1.0,reserva}) {
 
  let navigate = useNavigate();
  const initialOptions= {
    "client-id":"Adu4jUtTkaJxNFqufhztoNp-CQuZWJLkvV5FDn_aIpkhbWlSvnPwSq2TNDsT4vFZt-_uEmF_rtH89Mvk",
    currency:"EUR"
    

  }
 
   

  return (
   

    
    <div class="form-style-10">
    <ReactNotifications />
    <h1> Realizar pago</h1>

    
    <div class="section"> <span>1</span>  Cuenta PayPal de prueba: 
    
    <p> <br/>(Recomendamos copiar las credenciales antes de realizar el pago)</p></div>
    <div class="inner-wrap">
      
    <Etiqueta>Usuario:</Etiqueta><Parrafo>sb-ah4x115239563@personal.example.com</Parrafo>
    <Etiqueta>Contraseña:</Etiqueta><Parrafo>Dv),ev0r</Parrafo>
     </div>
    <div class="section"> <span>2</span> Importe total: {precio} €</div>
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
                         call(`/plazas/${reserva.plaza.id}/reservar`,"POST",reserva).then(response => {
                          console.log(response)
                          if (response.ok ){
                            displayNotification("Éxito","Reserva solicitada correctamente","success")
                          }
                          if(response.id!=="undefined" && response.id!=="NaN"){
                            displayNotification("Éxito","Reserva solicitada correctamente","success")
                            navigate(`/reservas/${response.id}`)
                      
                           }

                        }) 
                         
                        
                         
                     });
                 }}
                />
    </PayPalScriptProvider>
    </div>

  </div>
  );
}
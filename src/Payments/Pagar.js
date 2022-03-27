import React, { useState } from 'react';

import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

export default function Pagar({precio=1.0,reserva}) {
 
  
  const initialOptions= {
    "client-id":"Adu4jUtTkaJxNFqufhztoNp-CQuZWJLkvV5FDn_aIpkhbWlSvnPwSq2TNDsT4vFZt-_uEmF_rtH89Mvk",
    currency:"EUR"

  }

  return (
   
  <div>
  
    <PayPalScriptProvider options={initialOptions} >
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
                         console.log(details)
                         // Llamar a Backend

                         //const name = details.payer.name.given_name;
                         //alert(`Transaction completed by ${name}`);
                         
                     });
                 }}
             />
    </PayPalScriptProvider>

  </div>
  );
}
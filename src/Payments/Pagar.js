import call from '../Util/Caller';
import 'react-notifications-component/dist/theme.css'
import { ReactNotifications } from 'react-notifications-component'
import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import displayNotification from '../Util/Notifications';
import { Precio, Etiqueta} from '../Plaza/ReservaPlaza.elements';
import { Title, Container, Wrapper, Line } from './Pagar.elements';

export default function Pagar({precio=1.0,reserva}) {
 
  let navigate = useNavigate();
  const initialOptions= {
    "client-id":"Adu4jUtTkaJxNFqufhztoNp-CQuZWJLkvV5FDn_aIpkhbWlSvnPwSq2TNDsT4vFZt-_uEmF_rtH89Mvk",
    currency:"EUR"
    

  }
  return (
  
    <Container>
      <Wrapper>
      <ReactNotifications />
      <Title> Realizar pago</Title>

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
                            
                            response.json().then(res => {
                              if(res.id!=="undefined" && res.id!=="NaN"){
                                displayNotification("Éxito","Reserva solicitada correctamente","success")
                                navigate(`/reservas/${res.id}`)
                               }
                            })  
                          }
                        })  
                     });
                 }}
                />
    </PayPalScriptProvider>
     
    </Wrapper>
    <Line><Etiqueta>Precio total:</Etiqueta><Precio>{precio} €</Precio></Line>
  </Container>
  );
}
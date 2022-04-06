import React from "react";
import styled from "styled-components";
import { colors } from "../../theme";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100vh;
  background-color: ${colors.fivth};
  border-radius: 10px;

  @media screen and (max-width: 800px){
    width: 90%;
    height: 80vh;
    margin-bottom: 0;
  }
`;

const Parrafo = styled.div`
  margin: 5px 5px 5px 5px;
  color: #fff;
  padding: 25px;
  overflow: scroll;
  ::-webkit-scrollbar{
  display: block;
  width: 10px ;
}

::-webkit-scrollbar-thumb{
    background-color: lightgray;
    border-radius: 60px;
}
`;

const Resalto = styled.strong`
  text-decoration: underline;
  font-size: 25px;
`;

const Volver = styled(Link)`
  border-style: solid;
  border-radius: 25px;
  padding: 5px;
  background-color: ${colors.fivth};
  color: #fff;
  width: 50%;
  margin-bottom: 20px;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  &:hover{
    background-color: lightblue;
    border-color: ${colors.fourth};
    color: ${colors.fivth};
    transition: 0.3s all ease;
  }
`;

export default function Terminos(){
    return (
        <Container>
          <Parrafo>
            <Resalto>Términos y Condiciones de Uso</Resalto><br/><br/>
            <strong>INFORMACIÓN RELEVANTE</strong><br/>
            Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio, que lea y acepte los siguientes Términos y Condiciones 
            que a continuación se redactan. El uso de nuestros servicios así como la compra de nuestros productos implicará que usted ha leído y aceptado los Términos y 
            Condiciones de Uso en el presente documento. Todas los productos  que son ofrecidos por nuestro sitio web pudieran ser creadas, cobradas, enviadas o 
            presentadas por una página web tercera y en tal caso estarían sujetas a sus propios Términos y Condiciones. En algunos casos, para adquirir un producto, 
            será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña. 
            El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento, en caso de que se haya registrado y 
            que sea necesario para la compra de alguno de nuestros productos. https://herohttps://park-inn-ispp-fe.herokuapp.com no asume la responsabilidad en caso 
            de que entregue dicha clave a terceros.
            
            Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación del stock y disponibilidad de producto, validación de la forma de pago, validación de la factura (en caso de existir) y el cumplimiento de las condiciones requeridas por el medio de pago seleccionado. 
            En algunos casos puede que se requiera una verificación por medio de correo electrónico.
            Los precios de los productos ofrecidos en esta Tienda Online es válido solamente en las compras realizadas en este sitio web.
            <br/>
            <strong>LICENCIA</strong>
            <br/>
            <strong>Park-Inn</strong>
            a través de su sitio web concede una licencia para que los usuarios utilicen los productos que son vendidos en este sitio web de acuerdo a 
            los Términos y Condiciones que se describen en este documento.
            <br/>
            <strong>USO NO AUTORIZADO</strong>
            <br/>
            En caso de que aplique (para venta de software, templetes, u otro producto de diseño y programación) usted no puede colocar uno de nuestros productos,
             modificado o sin modificar, en un CD, sitio web o ningún otro medio y ofrecerlos para la redistribución o la reventa de ningún tipo.
            <br/>
            <strong>PROPIEDAD</strong>
            <br/> 
            Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. 
            Todos los productos son propiedad  de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan  
            sin ningún tipo de garantía, expresa o implícita. En ningún esta compañía será  responsables de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos.
            <br/>
            <strong>POLÍTICA DE REEMBOLSO Y GARANTÍA</strong>
            <br/>
            En el caso de productos que sean  mercancías irrevocables no-tangibles, no realizamos reembolsos después de que se envíe el producto, usted tiene la responsabilidad de entender antes de comprarlo.  Le pedimos que lea cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla cuando la descripción no se ajusta al producto. Hay algunos productos que pudieran tener garantía y posibilidad de reembolso pero este será especificado al comprar el producto. En tales casos la garantía solo cubrirá fallas de fábrica y sólo se hará efectiva cuando el producto se haya usado correctamente. La garantía no cubre averías o daños ocasionados por uso indebido. Los términos de la garantía están asociados a fallas de fabricación y funcionamiento en condiciones normales de los productos y sólo se harán efectivos estos términos si el equipo ha sido usado correctamente. Esto incluye:
            <ul>
              <li>De acuerdo a las especificaciones técnicas indicadas para cada producto.</li>
              <li>En condiciones ambientales acorde con las especificaciones indicadas por el fabricante.</li>
              <li>En uso específico para la función con que fue diseñado de fábrica.</li>
              <li>En condiciones de operación eléctricas acorde con las especificaciones y tolerancias indicadas.</li>
            </ul>
            El reembolso que recibas dependerá del momento en el que canceles tu reserva y también del motivo que indiques (según quién sea el responsable de la cancelación).

            Si cancelas con más de 24 horas de antelación respecto a la reserva de la plaza y eres el responsable de 
            la cancelación: recibirás el reembolso de la aportación que pagaste por los gastos del alquiler con el propietario de la plaza.
            Si cancelas en las últimas 24 horas antes de la salida y eres el responsable de la 
            cancelación: recibirás el 50% del importe que habías pagado para los gastos del trayecto. El otro 50% permite que Park-Inn indemnice a tu administrador de la plaza por esta cancelación de última hora.
            Si cancelas después del viaje o no te presentas a la cita: no recibirás ningún 
            reembolso y el propietario recibirá el 100% del importe que habías pagado por los gastos del trayecto con él, como si hubieras viajado con él. BlaBlaCar recibirá los gastos de gestión que hayas abonado.
            Si se cancela la reserva y el propietario es el responsable, recibirás el 
            reembolso íntegro.
            <br/>
            <strong>COMPROBACIÓN ANTIFRAUDE</strong>
            <br/>
            La compra del cliente puede ser aplazada para la comprobación antifraude. También puede ser suspendida por más tiempo para una investigación más 
            rigurosa, para evitar transacciones fraudulentas.
            <br/>
            <strong>PRIVACIDAD</strong>
            <br/>
            Este https://herohttps://park-inn-ispp-fe.herokuapp.com garantiza que la fc barcelona noticias información personal que usted envía cuenta con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir una validación de los pedidos no serán entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales.
            La suscripción a boletines de correos electrónicos publicitarios es voluntaria y podría ser seleccionada al momento de crear su cuenta.
            Park-Inn reserva los derechos de cambiar o de modificar estos términos sin previo aviso.
            Estas terminos y condiciones se han generado en terminosycondicionesdeusoejemplo.com.
          </Parrafo>
          <Volver to="/register">Volver</Volver>
        </Container>
    )}
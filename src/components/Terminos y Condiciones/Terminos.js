import React from "react";
import styled from "styled-components";
import { colors } from "../../theme";
import { Link } from "react-router-dom";

const Box = styled.div`
  margin:auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100vh;
  
  @media screen and (max-width: 800px){
    width: 90%;
    height: 100%;
    margin-bottom: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
  background-color: ${colors.fourth};
  border-radius: 10px;
  overflow: hidden;

  @media screen and (max-width: 800px){
    width: 100%;
  }
`;

const Parrafo = styled.div`
  margin: 5px 5px 5px 5px;
  color: #fff;
  padding: 30px;
  width: 100%;
  overflow: scroll;
  ::-webkit-scrollbar{
  display: block;
  width: 10px;
}

::-webkit-scrollbar-thumb{
    background-color: ${colors.third};
    border-radius: 60px;
}
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.fivth};
  width: inherit;
  height: 14vh;
  margin-bottom: 30px;
  border-radius: 10px;
`;

const Resalto = styled.p`
  font-size: 25px;
  font-weight: bold;
  @media screen and (max-width: 600px){
    font-size: 20px;
  }
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
      <Box>
        <Container>
          <Parrafo>
            <Header><Resalto>Términos y Condiciones de Uso <br/> PARK-INN</Resalto><br/><br/></Header>
            <strong>INFORMACIÓN RELEVANTE</strong><br/><br/>
            <section>El servicio que proporciona <strong>Park-Inn</strong> consiste en poner en contacto a dos usuarios interesados, uno de ellos que hace alquiler de un parking privado de su 
            propiedad y el otro hace uso de ella mediante un alquiler durante un tiempo especificado. Para ello el usuario interesado en alquiler pagará por este servicio según
            el precio que haya estipulado previamente el propietario. Un usuario registrado puede actuar como cualqueira de estos dos roles mencionados.
            Al aceptar estos términos usted acepta que se guarden sus datos proporcionados en la aplicación, una vez registrado, en nuestra base de datos, así como las plazas que cree y las reservas y 
            pagos que haga. Del mismo usted puede eliminar su cuenta en cualquier momento y por el consiguiente se borrarán sus datos personales tales como nombre, apellidos, correo, etc.
            Sin embargo la información sobre las reservas realizadas y sus plazas sobre las que se hayan realizado alguna reserva serán persistentes en la base de datos para consulta de los demás 
            clientes relacionados con esta información.<br/>
            Al aceptar estos términos y condiciones se compromete, en caso de uso de un parking comuntario, a avisar a los demás propietarios de la comunidad a que usted va a alquilar esa plaza
            para posibles percances que ocurran dentro de dicha propiedad privada. Este tipo de percances es ajeno a Park-Inn pero la empresa se involucrará para resolver dicho conflicto.
            
            </section>
            <br/>
            <strong>PRECIOS Y PAGOS</strong><br/><br/>
            Los pagos que se realicen en Park-Inn son ajenos a la aplicación, ya que se hace mediante la propia cuenta de PayPal de cada uno de los usuarios. El precio del servicio está
            estipulado por el propietario de la plaza además de una fianza que se le suma al precio total. Está fianza sirve para mantener la seguridad del usuario en caso de que se necesite 
            algún tipo de mando, llave para el uso de la plaza o en caso de que ocurra algún percance dentro de la misma durante el uso del otro usuario.
            <strong>LICENCIA</strong>
            <br/>
            <strong>Park-Inn</strong>
            a través de su sitio web concede una licencia para que los usuarios utilicen los servicios que se ofrecen en este sitio web de acuerdo a 
            los Términos y Condiciones que se describen en este documento.
            <br/><br/>
            <strong>USO NO AUTORIZADO</strong>
            <br/><br/>
            Si desea usar la aplicación para fines profesionales donde se vea nuestra marca deberá ponerse antes en contacto con nuestro equipo. El uso de nuestro servicio indebido
            podrá suponer denuncias y procesos judiciles. Esta aplicación consta de Copyright.
            <br/> 
            <br/>
            <strong>POLÍTICA DE REEMBOLSO Y GARANTÍA DE FIANZA</strong><br/>
            <br/>
            El reembolso que recibas dependerá del momento en el que canceles tu reserva y también del motivo que indiques (según quién sea el responsable de la cancelación).
            La devolución del presupuesto del servicio y de la fianza se realizará acorde a las siguientes especificaciones:
            <ul>
              <li>Si cancelas con <strong>más de 24 horas de antelación</strong> respecto a la reserva de la plaza y eres el responsable de 
                  la cancelación: recibirás el reembolso de la aportación que pagaste por los gastos del alquiler de la plaza y de la fianza completa.</li>
              <li>Si cancelas en las últimas 24 horas antes del uso de la plaza se te devolverá el importe íntegro relacionado a la fianza pero no el del importe del servicio de alquiler.</li>
              <li>Si cancelas despúes de la fecha de reserva o no haces uso de la plaza durante el tramo alquilado se te devolverá el importe de la fianza pero no el del servicio de alquiler.</li>
              <li>Si el propietario de la plaza pone una incidencia con pruebas solventes de algun imperfecto o conflicto el importe de la fianza se lo quedará el propietario.</li>
              <li>En caso de incidencia por parte del propietario, el usuario puede alegar con otra incidencia para reclamar dicha fianza. El equipo de Park-Inn evaluará la situación y devolverá el 
                importe a quién considere que tiene razón sujetándonos siempre a las pruebas más reales y concluyentes.</li>
            </ul>
          
            <br/>
            
            <strong>PRIVACIDAD</strong><br/><br/>
            <strong>Park-Inn</strong> garantiza que el tratamiento de los datos personales solo se utilizarán para el uso de la aplicación y que no se transferiran
            a terceros. Se almacenaran en la base de datos los siguientes datos mientras usted tenga una cuenta en la aplicación:
            <ul>
              <li>Nombre y apellidos</li>
              <li>Correo electrónico</li>
              <li>Teléfono</li>
              <li>Dirección de las plazas creadas por usted</li>
              <li>Código Postal</li>
              <li>Todos los datos de las reservas y pagos que haya realizado usted mediante la aplicación.</li> 
            </ul>

            Si usted desea eliminar su cuenta aceptando estos términos accede a que Park-Inn siga almacenando datos sobre sus plazas, reservas y pagos. Los datos personales de
            nombre, apellidos, correo electrónico y teléfono se eliminarán de nuestra base de datos.
            Park-Inn no almacenará su contraseña en ningún momento ni ningún agente se la pedirá nunca, está estará encriptada en la base de datos. Además tampoco guardamos información
            sobre su cuenta de PayPal.

          </Parrafo>
          <Volver to="/register">Volver</Volver>
        </Container>
      </Box>
    )}
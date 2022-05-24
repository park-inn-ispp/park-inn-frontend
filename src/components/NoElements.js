import React from "react";

import "./NoElements.css";
import { StyledButton } from "./GeneralButton/GeneralButton.elements";
function NoElements({ message,buttonMessage,buttonRef }) {
  return (
    <div class="message-no-elements">
    <h2 > {message ?? "No hay contenido disponible" }   </h2>

    {[buttonMessage].map(msg =>{
      if(msg){
        return (<StyledButton onClick={()=>window.location.href=buttonRef} >{buttonMessage}</StyledButton>)
      }else{
        return (<div></div>)
      }
    })}
    

    </div>
  );
}

export default NoElements;
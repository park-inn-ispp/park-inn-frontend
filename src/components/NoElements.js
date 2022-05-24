import React from "react";

import "./NoElements.css";
import { StyledButton } from "./GeneralButton/GeneralButton.elements";
function NoElements({ message,buttonMessage,buttonRef }) {
  return (
    <div class="message-no-elements">
    <h2 > {message ?? "No hay contenido disponible" }   </h2>

    <StyledButton onClick={()=>window.location.href=buttonRef} >{buttonMessage}</StyledButton>

    </div>
  );
}

export default NoElements;
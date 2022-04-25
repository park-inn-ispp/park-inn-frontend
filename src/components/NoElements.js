import React from "react";

import "./NoElements.css";

function NoElements({ message }) {
  return (
    <h2 class="message-no-elements"> {message ?? "No hay contenido disponible" }   </h2>
  );
}

export default NoElements;
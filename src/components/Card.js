import React from "react";
import PropTypes from "prop-types";

import "./card.css";

function Card({ imageSource, title, ancho,largo,precioHora,esAireLibre, urlEdit,urlReserva }) {
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <div className="card-text-div">
        <p className="card-text text-secondary">
          {ancho
            ? "Ancho : " + ancho + "m"
            : "Ancho : -"}
        </p>
        <p className="card-text text-secondary">
          {largo
            ? "Largo : " +largo + "m"
            : "Largo : -"}
        </p>
        <p className="card-text text-secondary">
          {precioHora
            ? "Precio por hora : " + precioHora +"€"
            : "Precio por hora : -"}
        </p>
        <p className="card-text text-secondary">
          {esAireLibre
            ? "Al aire libre : " + esAireLibre
            : "Al aire libre : -"}
        </p>
        <a
          href={urlEdit ? urlEdit : "#!"}
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
          Ver detalles/editar	

        </a>
        <a
          href={urlReserva ? urlReserva : "#!"}
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
          Reservas
        </a>
        </div>
      </div>
    </div>
  );
}


export default Card;
import styled from "styled-components";
import "./leyenda.css";

const Leyend = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

function Leyenda() {
    
  
    return (
      <Leyend>
          <div>
            <div className="texto">Aceptada  </div>
            <div className="a"></div>
          </div>
          <div>
            <div className="texto">Pendiente  </div>
            <div className="p"></div>
          </div>
          <div>
            <div className="texto">Cancelada  </div>
            <div className="c"></div>
          </div>

      </Leyend>
    ); 
  }

export default Leyenda;
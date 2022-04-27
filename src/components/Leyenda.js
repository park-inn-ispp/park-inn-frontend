import styled from "styled-components";
import "./leyenda.css";

const Leyend = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
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
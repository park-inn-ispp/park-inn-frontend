import { Input } from "./Buscador.elements";

export default function Buscador(){
    const handleSubmit= evt => {
        console.log("SUBMIT")
        evt.preventDefault()
        
       
    
         
         
         
          
         
      }
    return (
        <div className="form-style-10">
            <form onSubmit={handleSubmit}></form>
                <input name= "precioHoraMinimo" type="number"/>
                <input type="submit" value="Crear plaza" />
        </div>
    )
}
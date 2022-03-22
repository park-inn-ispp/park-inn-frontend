import { DatePicker, TimePicker } from "@material-ui/pickers"
import { useState } from "react"
import { Container } from "./Calendario.elements";

export default function Calendario(){  
   
    const [selectedDate, setSelectedDate] = useState(new Date());

   return(
    <Container>
        <label>Fecha: </label>
        <DatePicker value={selectedDate} onChange={setSelectedDate}/>
        <label>Hora:</label>
        <TimePicker value={selectedDate} onChange={setSelectedDate}/>
    </Container>  
   )
    
}


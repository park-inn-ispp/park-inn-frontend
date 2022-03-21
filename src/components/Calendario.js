import { DatePicker, TimePicker } from "@material-ui/pickers"
import { useState } from "react"

export default function Calendario(){  
   
    const [selectedDate, setSelectedDate] = useState(new Date());

   return(
    <section className='App-content'>
        <label>Fecha: </label>
        <DatePicker value={selectedDate} onChange={setSelectedDate}/>
        <label>Hora:</label>
        <TimePicker value={selectedDate} onChange={setSelectedDate}/>
    </section>  
   )
    
}


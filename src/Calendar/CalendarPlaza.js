import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import call from '../Util/Caller';
import Loading from '../components/Loading';


require('moment/locale/es.js');



const localizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

export default function CalendarPlaza(){
  

  const [calendarioNoDisp, setCalendarioNoDisp] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const id = parseInt(useParams().id)

  useEffect(() => {
      
    const CalendarioPlaza = async () => {
      const dataNoDisp = await call(`/reservas/${id}/fechasNoDisponibles`,"GET")
      const calendarioNoDisp = await dataNoDisp.json()
      const datosNoDisp = calendarioNoDisp.map(value=>({"title":"No Disponible","start":new Date(value[0]), "end":new Date(value[1])}))
      console.log(datosNoDisp)
      setCalendarioNoDisp(datosNoDisp);
      setIsLoading(false)
    }
      CalendarioPlaza()

  },[]);

 

  //console.log(calendario)


    const { components, defaultDate, max, views } = useMemo(
        () => ({
          components: {
            timeSlotWrapper: ColoredDateCellWrapper,
          },
          defaultDate: new Date(),
        }),
        []
      )

      if (isLoading) {
        return <Loading/>;
      }

      

    return(
        <div style={{height:`${400}px`}} className="bigCalendar-container">

        <Calendar
          components={components}
          defaultDate={defaultDate}
          events={calendarioNoDisp}
          localizer={localizer}
          max={max}
          showMultiDayTimes
          step={60}
          views={views}
          eventPropGetter={title => {
            const Reservado="#DC143C"
            const Libre="3B83BD"
            if(title.title==="No Disponible") {
              return { style: { backgroundColor:"#DC143C" } };
            } else {
              return { style: { backgroundColor:"3B83BD" } };
            }
          }}
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            all_day: "Día Completo"
          }}
          />
          </div>
    )
}

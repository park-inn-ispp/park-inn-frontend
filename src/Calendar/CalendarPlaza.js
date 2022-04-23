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
  const [calendarioDisp, setCalendarioDisp] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const id = parseInt(useParams().id)

  useEffect(() => {
      
    const CalendarioPlaza = async () => {
      const data = await call(`/reservas/${id}/fechasNoDisponibles`,"GET")
      const calendario = await data.json()
      const dataDisp = await call(`/reservas/${id}/fechasDiscponibles`,"GET")
      const calendarioDisp = await dataDisp.json()
      const datosNoDisp = calendario.map(value=>({"title":"Reservado","start":new Date(value[0]), "end":new Date(value[1])}))
      const datosDisp = calendarioDisp.map(value=>({"title":"Reservado","start":new Date(value[0]), "end":new Date(value[1])}))
      console.log(datosDisp)
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
            const backgroundColor="#DC143C"
            if(title.title==="Reservado") {
              return { style: { backgroundColor } };
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

export default function validateReserva(form){

    let errors = {}
    const fechaReserva = new Date();
    let diaReserva = fechaReserva.getDate();
    if (diaReserva.toString().length===1){
        diaReserva="0"+diaReserva
    }
    const fechaActual = fechaReserva.getFullYear() + "-" + 0+(fechaReserva.getMonth() + 1) + "-" + diaReserva;

    //Validación Fecha Incio
    if(!form.fechaInicio.trim()){
        errors.fechaInicio = "La fecha de inicio es un campo obligatorio"
    } else if (form.fechaInicio < fechaActual){
        console.log(fechaActual)
        console.log(form.fechaInicio)
        errors.fechaInicio = "La fecha de Inicio debe ser de hoy en adelante"
    }

    //Validación Fecha Fin
    if(!form.fechaFin.trim()){
        errors.fechaFin = "La fecha de fin es un campo obligatorio"
    } else if (form.fechaFin < form.fechaInicio){
        errors.fechaFin = "La fecha de fin debe ser posterior a la de inicio"
    }
    //Validación de horas para el siguiente Sprint
    
    if(!form.horaInicio.trim()){
        errors.horaInicio = "La hora de inicio es un campo obligatorio"
    } 

    if(!form.horaFin.trim()){
        errors.horaFin = "La hora de fin es un campo obligatorio"
    } /*else if (form.horaFin < form.horaInicio){
        errors.horaFin = "La hora de fin debe ser posterior a la de inicio"
    }*/
    

    return errors
}
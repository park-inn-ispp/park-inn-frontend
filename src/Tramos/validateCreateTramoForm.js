export default function validateTramoForm(form){

    const fechaCreacion=new Date()
    let diaCreacion = fechaCreacion.getDate();
    if (diaCreacion.toString().length===1){
        diaCreacion="0"+diaCreacion;
    }
    const fechaActual = fechaCreacion.getFullYear() + "-" + 0+(fechaCreacion.getMonth() + 1) + "-" + diaCreacion;

    let errors = {}
   
    // Validación fecha inicio
    if(!form.fechaInicio.trim()){
        errors.fechaInicio= "La fecha de inicio es un campo obligatorio" 
    } else if (form.fechaInicio < fechaActual){
        errors.fechaInicio = "La fecha de Inicio debe ser de hoy en adelante"
    }

    //Validación fecha fin
    if(!form.fechaFin.trim()){
        errors.fechaFin= "La fecha de finalización es un campo obligatorio" 
    } else if (form.fechaFin < form.fechaInicio){
        errors.fechaFin = "La fecha de fin debe ser posterior a la de inicio"
    }
    

    return errors
}
export default function validateComision(comision){

    let errors = {}
    // Validacion porcentaje de comisión
    var comisionString= "" + comision.porcentaje
    if(!comisionString.trim()){
        errors.porcentaje= "El porcentaje de comisión es un campo obligatorio" 
    } else if(isNaN(+comisionString)){
        errors.porcentaje= "El porcentaje de comisión debe ser un número"
    } else if (+comisionString > 100){
        errors.porcentaje= "El porcentaje de comisión no puede ser mayor que 100"
    } else if (+comisionString < 0){
        errors.porcentaje= "El porcentaje de comisión no puede ser un número negativo"
    } 
    return errors
}
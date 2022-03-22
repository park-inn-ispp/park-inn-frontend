export default function validateParkingForm(form){

    let errors = {}
   
    // Validación calle
    if(!form.calle.trim()){
        errors.calle= "La calle es un campo obligatorio" 
    } else if (form.calle.length > 250 ){
        errors.calle= "La calle no puede contener más de 250 caracteres"
    }
   
   
    // Validacion precioHora
    if(!form.precioHora.trim()){
        errors.precioHora= "El precio por hora es un campo obligatorio" 
    } else if(isNaN(+form.precioHora)){
        errors.precioHora= "El precio por hora debe ser un número"
    } else if (+form.precioHora > 100){
        errors.precioHora= "El precio por hora no puede ser mayor a 100€"
    } else if (+form.precioHora < 0){
        errors.precioHora= "El precio por hora no puede ser un número negativo"
    }

    // Validación fianza
    if(!form.fianza.trim()){
        errors.fianza= "La fianza es un campo obligatorio" 
    } else if(isNaN(+form.fianza)){
        errors.fianza= "La fianza debe ser un número"
    } else if (+form.fianza > 1000){
        errors.fianza= "La fianza no puede ser mayor a 1000€"
    } else if (+form.fianza < 0){
        errors.fianza= "La fianza no puede ser un número negativo"
    }

    //Validación ancho
    if(!form.ancho.trim()){
        errors.ancho= "El ancho es un campo obligatorio" 
    } else if(isNaN(+form.ancho)){
        errors.ancho= "El ancho debe ser un número"
    } else if(+form.ancho < 0){
        errors.ancho= "El ancho no puede ser un número negativo"
    } else if (+form.ancho > 20){
        errors.ancho= "El ancho no puede ser mayor a 20 metros"
    }

    //Validación largo
    if(!form.largo.trim()){
        errors.largo= "El largo es un campo obligatorio" 
    } else if(isNaN(+form.largo)){
        errors.largo= "El largo debe ser un número"
    } else if(+form.largo <= 0){
        errors.largo= "El largo no puede ser un número negativo"
    } else if (+form.ancho >= 20){
        errors.largo= "El largo no puede ser mayor a 20 metros"
    }

    // Validación número
    if (isNaN(+form.numero)){
        errors.numero= "En caso de incluir este campo, debe ser un número"
    } else if(form.numero.trim() && +form.numero <= 0){
        errors.numero= "El numero no puede ser negativo"
    }

    // Validación ciudad
    if(!form.ciudad.trim()){
        errors.ciudad= "La ciudad es un campo obligatorio" 
    } else if( !(/^\D+$/.test(form.ciudad))){
        errors.ciudad= "La ciudad no puede presentar caracteres numéricos" 
    } else if (form.ciudad.length > 80) {
        errors.ciudad= "La ciudad no puede tener más de 80 caracteres" 
    }

    // Validación Provincia
    if(!form.provincia.trim()){
        errors.provincia= "La provincia es un campo obligatorio" 
    } else if( !(/^\D+$/.test(form.provincia))){
        errors.provincia= "La provincia no puede presentar caracteres numéricos" 
    } else if (form.provincia.length > 80) {
        errors.provincia= "La provincia no puede tener más de 80 caracteres" 
    }

    // Validación Código Postal
    if(!form.codigoPostal.trim()){
        errors.codigoPostal= "El código postal es un campo obligatorio" 
    } else if(!(/^\d{5}$/.test(form.codigoPostal))){
        errors.codigoPostal= "El código postal debe ser un número de exactamente 5 cifras"
    }

    // Validación descripcion
    if(form.descripcion.length > 250){
        errors.descripcion = "La decripción no puede contener más de 250 caracteres"
    }

    // Validación exterior (true or false)
    if (form.exterior != true && form.exterior!= false){
        errors.exterior= "Debe seleccionar si su aparcamiento se encuentra en el exterior o en el interior"
    }

    return errors
}
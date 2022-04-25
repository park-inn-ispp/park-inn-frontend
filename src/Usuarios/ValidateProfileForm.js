
export default function ValidateProfileForm(form){

    let errors = {}

    //Validación nombre
    if(!form.name.trim()){
        errors.name="El nombre es un campo obligatorio"
    } else if(form.name.trim().length>20){
        errors.name = "El nombre introducido es demasiado largo"
    }

    //Validación email
    if(!form.email.trim()){
        errors.email="El email es un campo obligatorio"
    } else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.trim()))){
        errors.email="Dirección no válida"
    }

    //Validacion phone
    if(!form.phone.trim()){
        errors.phone= "El número de teléfono es un campo obligatorio"
    } else if(!form.phone.trim().length === 9){
        errors.phone= "El número introducido no es válido"
    } else if(!/^[679]{1}[0-9]{8}$/.test(form.phone.trim())){
        errors.phone= "El número introducido no es válido"
    }

    //Validacion surname
    if(!form.surname.trim()){
        errors.surname= "El apellido es un campo obligatorio"
    } else if(form.surname.trim()>40){
        errors.surname="Los apellidos introducidos son demasiado largos"
    }

    //Validacion pass
    if(!form.password.trim()){
        errors.password= "La contraseña es un campo obligatorio"
    }
    return errors
}
export default function validateParkingForm(form){

    let errors = {}
    /*
    fianza: null,
    ancho:null,
    largo:null,
    exterior:false,
    descripcion:''
*/
    if(!form.direccion.trim()){
        errors.direccion= "La direccion es un campo obligatorio" 
    }

    if(!form.precioHora.trim()){
        errors.precioHora= "El precio por hora es un campo obligatorio" 
    }


}
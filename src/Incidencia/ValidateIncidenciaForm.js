export default function ValidateIncidenciaForm(form){
    let errors = {};
    // Validación título
    if(!form.titulo.trim()){
        errors.titulo= "El título es un campo obligatorio";
    } else if (form.titulo.length > 100 ) {
        errors.titulo= "El título no puede contener más de 100 caracteres";
    }
    // Validación descripcion
    if(!form.descripcion.trim()){
        errors.descripcion= "La descripción es un campo obligatorio";
    } else if(form.descripcion.length < 10 || form.descripcion.length > 500){
        errors.descripcion = "La decripción debe contener entre 10 y 500 caracteres";
    }
    return errors;
}
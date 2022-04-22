
function parsearFechas(hora){
    let fecha = hora.split("T")[0];
    let _hora = hora.split("T")[1].split(":")[0] + ":" +hora.split("T")[1].split(":")[1];
  
    return fecha +" " + _hora;
  }

export default parsearFechas;
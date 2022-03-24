import call from "../Util/Caller";
export default async function getPlaza() {

    
    return await call(`/plazas/all`,"GET")
        .then(res => res.json())
        .then(plaza => console.log(plaza))
        .catch(error => console.error("Error: ",error));
}

   

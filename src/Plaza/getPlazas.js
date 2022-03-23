export default async function getPlaza() {

    //const apiURL = 'http://localhost:8080/plazas/all';
    return await fetch('http://localhost:8080/plazas/all', {

        method: 'GET',
        credentials:'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(plaza => console.log(plaza))
        .catch(error => console.error("Error: ",error));
}

   

export default async function getPlaza() {

    //const apiURL = 'https://parkinn-api-v1.herokuapp.com/plazas/all';
    return await fetch('https://parkinn-api-v1.herokuapp.com/plazas/all', {

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

   

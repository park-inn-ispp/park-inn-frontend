

const url_backend ="http://localhost:8080"


     async function call(path_to_call,method,body){

        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'http://localhost:3000', "mode": "cors"},
            body: (JSON.stringify(body))
        };
        return await fetch(url_backend+path_to_call, requestOptions)
      
    
    }


export default call
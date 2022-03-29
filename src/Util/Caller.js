

const url_backend ="https://park-inn-ispp-be.herokuapp.com/"
const url_frontend = "https://park-inn-ispp-fe.herokuapp.com/"


     async function call(path_to_call,method,body){

        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : url_frontend, "mode": "cors"},
            body: (JSON.stringify(body))
        };
        return await fetch(url_backend+path_to_call, requestOptions)
      
    
    }


export default call

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const url_backend ="http://localhost:8080"


     async function call(path_to_call,method,body){
        let headers_ = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'http://localhost:3000', "mode": "cors"}
        const token = await cookies.get('AuthToken')

        if(token!=undefined && token!="undefined"){
            headers_ = {'Authorization' : 'Bearer ' + token.toString(),'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'http://localhost:3000', "mode": "cors"}
        }

        const requestOptions = {
            method: method,
            headers: headers_,
            body: (JSON.stringify(body))
        };

        return await fetch(url_backend+path_to_call, requestOptions)
            
      
    
    }


export default call

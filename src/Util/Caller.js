import Cookies from 'universal-cookie';

const cookies = new Cookies();

const urlBackend ="http://localhost:8080";
const urlFrontend = "http://localhost:3000";


     async function call(pathToCall,method,body){
        let headers_ = {"Content-Type": "application/json", "Access-Control-Allow-Origin" : urlFrontend, "mode": "cors"};
        const token = await cookies.get('AuthToken');

        if(token !== undefined && token !== "undefined"){
            headers_ = {"Authorization" : "Bearer " + token.toString(), "Content-Type": "application/json", "Access-Control-Allow-Origin" : urlFrontend, "mode": "cors"};
        }

        const requestOptions = {
            method: method,
            headers: headers_,
            body: (JSON.stringify(body))
        };
        
        return await fetch(urlBackend+pathToCall, requestOptions);
            
      
    
    }
    
export default call

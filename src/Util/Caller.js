import Cookies from "universal-cookie";
const cookies = new Cookies();

const urlBackend ="http://localhost:8080";
const urlFrontend = "http://localhost:3000";


     async function call(pathToCall,method,body){

        let headers_ = {"Content-Type": "application/json", "Access-Control-Allow-Origin" : urlFrontend, "mode": "cors"};
        const token = await cookies.get("AuthToken");

        if(token !== undefined && token !== "undefined"){
            headers_ = {"Authorization" : "Bearer " + token.toString(), "Content-Type": "application/json", "Access-Control-Allow-Origin" : urlFrontend, "mode": "cors"};
        }

        const requestOptions = {
            method: method,
            headers: headers_,
            body: (JSON.stringify(body))
        };

        return await fetch(urlBackend+pathToCall, requestOptions).then( (response) => {

            if(response.ok){
                return response
            }else{
                if(response.status === 500){
                    window.location.href="/500";           

                }else if(response.status === 403){
                    window.location.href="/403";           

                }else{
                    if(window.location.pathname !== '/login'){
                        window.location.href="/404";           
                    }

                }
            }
        }).catch( (exception) => {
            window.location.href="/500";    
        })    
    }   
export default call

import Cookies from "universal-cookie";
import displayNotification from '../Util/Notifications';
import Logout from "../Login/Logout";
import jwt_decode from 'jwt-decode';

const cookies = new Cookies();

const urlBackend ="https://parkinn-api-v4.herokuapp.com";
const urlFrontend = "https://parkinn-app-v4.herokuapp.com/";
// const urlBackend ="http://localhost:8080";
// const urlFrontend = "http://localhost:3000/";


     async function call(pathToCall,method,body){

        let headers_ = {"Content-Type": "application/json", "Access-Control-Allow-Origin" : urlFrontend, "mode": "cors"};
        const token = await cookies.get('AuthToken');


        
        if(token !== undefined && token !== "undefined"){
            
            var decoded = jwt_decode(token);
            if(Date.now() >new Date(decoded.exp*1000) ){ // el token ha expirado y tenemos que logearnos de nuevo
                Logout()        
            }

            headers_ = {"Authorization" : "Bearer " + token.toString(), "Content-Type": "application/json", "Access-Control-Allow-Origin" : urlFrontend, "mode": "cors"};
        }

        const requestOptions = {
            method: method,
            headers: headers_,
            body: (JSON.stringify(body))
        };

        return await fetch(urlBackend+pathToCall, requestOptions).then(response =>{
            if(response.ok){
                return response
            }else{
                response.json().then(res => {

                    if(res.hasOwnProperty("errores")){ // Mostrar errores CONTROLADOS
                        var errores= res.errores
                        for (var i=0; i<errores.length; i++){
                            if(errores[i]=="Este usuario no tiene ninguna plaza"){
                                throw "Este usuario no tiene ninguna plaza"
                            }else{
                                displayNotification("Error",errores[i],"danger")

                            }
                            
                        }
                    } else{ // Errores no controlados

                        if(response.status === 500){
                        
                                window.location.href="/500"; 
                            
                                      
        
                        }else if(response.status === 403){
                           

                            if(/^\/clients\/usuariopormail\//.test(pathToCall)){

                                displayNotification("Error","Este usuario se encuentra baneado o no tiene permisos","danger")
                            }else{
                                    window.location.href="/403"; 

                            }
                            
                        }else if(response.status===404){
                            window.location.href="/404";  
                        }else{
                            
                            console.log(response)    
                            
        
                        }
                    }
                   


                })
            
                
            }
            
        }).catch(exception =>{
           // window.location.href="/500";  
           console.log(exception);  
        })
        

            
      
    
    }
    
export default call

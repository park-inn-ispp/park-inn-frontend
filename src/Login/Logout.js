import  { useEffect } from 'react';
import '../App.css';
import displaySucessNotification from '../Util/Notifications'


import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Logout(){
    useEffect(() => {
        const data= {
            "email": cookies.get(),
        }
        
        const requestOptions = {
            method: 'POST',

            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'https://park-inn-ispp-fe.herokuapp.com', "mode": "cors"},

            body: (JSON.stringify(data))
        };
      
        fetch('https://park-inn-ispp-be.herokuapp.com/clients/logout', requestOptions)
            .then(async response  =>  {

            if(response.ok && await response.json()==="SUCCESS"){
                cookies.remove('email', {path: "/"});
                window.location.href='./login';
            }else{
                alert("no se ha podido deslogar")
            }
            return response.data;
        })
        .catch(error=>{
            console.log(error);
        })

 
    }, []);

    return (
        <div className='App'>
        </div>
    )
    
}

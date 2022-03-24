import  { useEffect } from 'react';
import '../App.css';
import call from '../Util/Caller';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Logout(){
    useEffect(() => {
        const data= {
            "email": cookies.get(),
        }
        
        call(`/clients/logout}`,"POST",data)
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

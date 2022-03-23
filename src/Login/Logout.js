import  { useEffect } from 'react';
import '../App.css';


import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Logout(){
    useEffect(() => {
        cookies.remove('email', {path: "/"});
        window.location.href='./login';
    }, []);

    return (
        <div className='App'>
        </div>
    )
    
}

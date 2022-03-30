import  { useEffect } from 'react';
import '../App.css';
import call from '../Util/Caller';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Logout(){
    cookies.remove('AuthToken'); // determine if authorized, from context or however you're doing it
    localStorage['AuthToken'] = undefined
    window.location.href='./login';
}

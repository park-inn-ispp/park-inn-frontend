import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import displayNotification from '../Util/Notifications';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import Logout from '../Login/Logout';
const cookies = new Cookies();

const PrivateRoute = () => {
    const auth_cache = localStorage['AuthToken']

    if(auth_cache!=undefined && auth_cache!="undefined"){
        cookies.set('AuthToken',localStorage['AuthToken'])
    }
    const auth = cookies.get('AuthToken'); // determine if authorized, from context or however you're doing it

    if(auth){
        var decoded = jwt_decode(auth);

        if(Date.now() >new Date(decoded.exp*1000) ){ // el token ha expirado y tenemos que logearnos de nuevo
            Logout()        
        }
        const autorities = [];
        decoded.authorities.replace("[","").replace("]","").split(",").map(autority => autorities.push(autority))

        cookies.set('user_mail',decoded.sub)
        cookies.set('user_autorities',autorities) //metemos las autorities como un array


    }
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
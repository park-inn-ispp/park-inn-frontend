import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const PrivateRoute = () => {
    const auth = cookies.get('AuthToken'); // determine if authorized, from context or however you're doing it
    const auth_cache = localStorage['AuthToken']

    if(auth_cache!=undefined && auth_cache!="undefined"){
        cookies.set('AuthToken',localStorage['AuthToken'])
    }
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth || auth_cache!="undefined" ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
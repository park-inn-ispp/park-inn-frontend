import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import displayNotification from '../Util/Notifications';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import Logout from '../Login/Logout';
const cookies = new Cookies();

const AdminRoute = () => {
    const user_data = cookies.get('UserData')
    var is_authorized =false
    for(let i=0;i<user_data.roles.length;i++){
       
        if(user_data.roles[i].name=='ROLE_ADMIN'){
            is_authorized =true
            break
        }
    }
    return is_authorized? <Outlet /> : <Navigate to="/403" />;
}

export default AdminRoute;
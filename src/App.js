import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import ReservaPlaza from './Plaza/ReservaPlaza';
import Home from './Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlazasList from './Plazas/PlazasList';
import ReservasClientList from './Reservas/ReservasClientList';
import ReservasList from './Plazas/ReservasList';
import Login from './Login/Login';
import Logout from './Login/Logout';
import CreatePlaza from './Plaza/CreatePlaza';
import EditPlaza from './Plaza/EditPlaza';
import ReservaDetails from './Reserva/ReservaDetails';
import PrivateRoute from './Services/AuthService';
import CreateIncidencia from './Incidencia/CreateIncidencia'
import FormularioRegistro from './Registro/FormularioRegistro';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Pagar from './Payments/Pagar';
import ReservasDashboard from './Dashboard/ReservasDashboard';
import PlazasDashboard from './Dashboard/PlazasDashboard';
import UsuariosDashboard from './Dashboard/UsuariosDashboard';
import IncidenciasDashboard from './Dashboard/IncidenciasDashboard';
import Error_403 from './errorViews/403';
import Error_404 from './errorViews/404';
import Error_500 from './errorViews/500';
import AdminRoute from './Services/AdminRoute';
import ReservaOwnerList from './Reservas/ReservasOwnerList';
import Terminos from './components/Terminos y Condiciones/Terminos';


export default function App() {

return( 
    
        <div className='App'> 
          <ReactNotifications />
          <Navbar/>  
     
            <Routes>

              <Route exact path='/' element={<PrivateRoute/>}>
                <Route  path='/' element={<Home/>}/>
                <Route path='/reservas/plaza/:id' element={<ReservaPlaza/>}/>
                <Route path='/logout' element={<Logout />}/>
                <Route path='/mis-plazas' element={<PlazasList/>}/>
                <Route path='/mis-reservas' element={<ReservasClientList/>}/>
                <Route path='/mis-reservas-de-mis-plazas' element={<ReservasList/>}/>
                <Route path='/plaza/create' element={<CreatePlaza/>}/>
                <Route path='/reservas/:id' element={<ReservaDetails/>}/>
                <Route path='/reservas/:id/incidencia/new' element={<CreateIncidencia/>}/>
                <Route path='/plaza/edit/:id' element={<EditPlaza/>}/>

                <Route exact path='/' element={<AdminRoute/>}>
                  <Route path='/dashboard-reservas' element={<ReservasDashboard/>}/>
                  <Route path='/dashboard-plazas' element={<PlazasDashboard/>}/>
                  <Route path='/dashboard-usuarios' element={<UsuariosDashboard/>}/>
                  <Route path='/dashboard-incidencias' element={<IncidenciasDashboard/>}/>
                </Route>

                <Route path='/pagar/' element={<Pagar/>}/>
                <Route path='/mis-reservas-de-mis-plazas/plaza/:id' element={<ReservaOwnerList/>}/>
              </Route>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<FormularioRegistro/>}/>
              <Route path='/500' element={<Error_500/>}/>
              <Route path='/404' element={<Error_404/>}/>
              <Route path='/403' element={<Error_403/>}/>
              <Route path='/Terminos-y-condiciones' element={<Terminos/>}/>

              {/* ESTA RUTA TIENE QUE ESTAR SIEMPRE LA ULTIMA */}
              <Route path ='*' element={<Error_404/>}/>
            </Routes> 


          <Footer/>   
        </div>
      );
}

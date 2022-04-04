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
import CreateIncidencia from './Incidencia/CreateIncidencia'
import FormularioRegistro from './Registro/FormularioRegistro';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Pagar from './Payments/Pagar';
import ReservaDetails from './Reserva/ReservaDetails';
import PrivateRoute from './Services/AuthService';
import ReservasDashboard from './Dashboard/ReservasDashboard';
import PlazasDashboard from './Dashboard/PlazasDashboard';
import UsuariosDashboard from './Dashboard/UsuariosDashboard';
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
                <Route path='/dashboard-reservas' element={<ReservasDashboard/>}/>
                <Route path='/dashboard-plazas' element={<PlazasDashboard/>}/>
                <Route path='/dashboard-usuarios' element={<UsuariosDashboard/>}/>
                <Route path='/pagar/' element={<Pagar/>}/>
              </Route>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<FormularioRegistro/>}/>
              <Route path='/Terminos-y-condiciones' element={<Terminos/>}/>
            </Routes> 
          <Footer/>   
        </div>
      );
}

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
import ReservasOwnerList from './Reservas/ReservasOwnerList';
import ReservaDetails from './Reserva/ReservaDetails';
import PrivateRoute from './Services/AuthService';

export default function App() {

return( <div className='App'> 
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
            <Route path='/mis-reservas-de-mis-plazas/plaza/:id' element={<ReservasOwnerList/>}/>
            <Route path='/plaza/edit/:id' element={<EditPlaza/>}/>
          </Route>
          <Route path='/login' element={<Login />}/>
        </Routes> 
      <Footer/>   
    </div>);
}



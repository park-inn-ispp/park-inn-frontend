import {Route, Routes} from 'react-router-dom';
import './App.css';
import ReservaPlaza from './ReservaPlaza';
import Home from './Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlazasList from './Plazas/PlazasList';

export default function App(){
  
    return (
      
      <div className='App'> 
        <Navbar/>       
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/reserva-plaza' element={<ReservaPlaza/>}/>
            <Route path='/mis-plazas' element={<PlazasList/>}/>
            <Route path='/mis-reservas-de-mis-plazas' element={<ReservasList/>}/>


          </Routes> 
        <Footer/>   
      </div>
    )
}

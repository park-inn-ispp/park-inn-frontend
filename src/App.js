import {Route, Routes} from 'react-router-dom';
import './App.css';
import ReservaPlaza from './Plaza/ReservaPlaza';
import Home from './Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App(){
  
    return (
      
      <div className='App'> 
        <Navbar/>       
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/reservas/plaza/:id' element={<ReservaPlaza/>}/>
          </Routes> 
        <Footer/>   
      </div>
    )
}
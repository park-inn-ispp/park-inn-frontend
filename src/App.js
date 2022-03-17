import React, { Component } from 'react';
import Home from './Home';
import MapView from './components/react-leaflet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientList from './Client/ClientList';
import ClientEdit from "./Client/ClientEdit";
import Navbar from './components/Navbar';
import './App.css';
import Buscador from './components/Buscador';
import Footer from './components/Footer';
import {RemoveScrollBar} from 'react-remove-scroll-bar';




export default function App(){
  
    return (
      
      <div className='App'>
        <RemoveScrollBar />
        <Navbar/>  
        <Buscador/>     
        <MapView />  
        <section className='App-content'>
          <h1>Park-Inn, encuentra aparcamiento en un click</h1>       
          <Router>
            <Switch>
              <Route path='/clients' exact={true} component={ClientList}/>
              <Route path='/clients/:id' component={ClientEdit}/>
            </Switch>
          </Router>    
        </section>
        <Footer/>
      </div>
    )
}
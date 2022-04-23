import React, { Component } from 'react';
import './403.css'
import Cookies from 'universal-cookie';
import imageLock from "../assets/lock.png";

const cookies = new Cookies();
class ERROR_403 extends Component {

    constructor(props) {
        super(props);
        this.state = {plazas: []};
        //this.remove = this.remove.bind(this);
    }
    
    
    componentDidMount() {
      (cookies.get("user_mail")==undefined || cookies.get("user_mail")=="undefined")
      ?
      document.getElementById("navbar-parkinn").classList.add("hiddenComponent")
      :
      document.getElementById("navbar-parkinn").classList.remove("hiddenComponent")

  }
    
    

    render() {    

        return (
  <div class="container_403">
        <img src={imageLock} alt="a wallpaper" className="lock-img" />

<div class="message">
  <h1>No tienes acceso a esta página</h1>
</div>
  </div>
        );
    }
}
export default ERROR_403;
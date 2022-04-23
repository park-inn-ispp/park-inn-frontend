import React, { Component } from 'react';
import './500.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class ERROR_500 extends Component {

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
          <div class="container_500">
          <h1>500</h1>
  <h2>Algo inesperado ha ocurrido, estamos buscando su solución  <b>:(</b></h2>
  <div class="gears">
    <div class="gear one">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="gear two">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="gear three">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </div>

           </div>

        );
    }
}
export default ERROR_500;
import React, { Component } from 'react';
import './403.css'
class ERROR_403 extends Component {

    constructor(props) {
        super(props);
        this.state = {plazas: []};
        //this.remove = this.remove.bind(this);
    }
    

    componentDidMount() {
      document.getElementById("footer-parkinn").setAttribute("hidden",true)
    }
 
    render() {    

        return (
  <div class="container_403">
    <div class="neon">403</div>
    <div class="door-frame">
      <div class="door">
        <div class="rectangle">
      </div>
        <div class="handle">
          </div>
        <div class="window">
          <div class="eye">
          </div>
          <div class="eye eye2">
          </div>
          <div class="leaf">
          </div> 
        </div>
      </div>  
    </div>
  </div>
        );
    }
}
export default ERROR_403;
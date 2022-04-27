import React, { Component } from 'react';
import './404.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ERROR_404 extends Component {

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
    <div class="container">
        <h1 class="first-four">4</h1>
        <div class="cog-wheel1">
            <div class="cog1">
                <div class="top"></div>
                <div class="down"></div>
                <div class="left-top"></div>
                <div class="left-down"></div>
                <div class="right-top"></div>
                <div class="right-down"></div>
                <div class="left"></div>
                <div class="right"></div>
            </div>
        </div>
        
        
        <h1 class="second-four">4</h1>
        <p class="wrong-para">¡Uh Oh! ¡Esta página no existe!</p>
</div>
        );
    }
}
export default ERROR_404;
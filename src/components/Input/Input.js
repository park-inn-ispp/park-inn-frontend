import React, { Component } from 'react';
import './Input.css'

class Input extends Component {

    constructor(props) {
        super(props);
        //this.remove = this.remove.bind(this);
    }


    render() {
        
            return (
                <div className='input'>

                    <div className='label'>{this.props.label}</div>
                    <input type={this.props.type} placeholder={this.props.placeholder}></input>
                </div>
                 
             );
        
        
       
    }
}
export default Input;


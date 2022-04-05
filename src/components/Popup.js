import React from 'react'
import './Popup.css'


export default function Popup(props) {
    return (props.trigger) ? ( 
        <div className='popup'>
            <div className='popup-inner'>
                <span className="close-icon" onClick={() => props.setTrigger(false)}>x</span>
                {props.content}
            </div>
        </div>
    ) : "";
}

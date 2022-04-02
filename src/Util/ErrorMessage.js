import React from 'react';

export default function ErrorMessage({message}){
 
    if(message!=undefined){
        return <div class="errorMessage">{message} </div>
    }else{
        return <br/>
    }
    

}



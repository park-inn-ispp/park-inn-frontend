import React, { Component } from 'react';
import './ListComponent.css'
import Loading from './Loading'

class ListComponentPlazas extends Component {

    constructor(props) {
        super(props);
        this.state = {reservas: [],items:[]};
        //this.remove = this.remove.bind(this);
    }
   
    slideFunction(event){
        
        let el = event.target;
        if(el.classList.contains("firstRow")){
            el.classList.toggle('no-slided');
            el.classList.toggle('slided');
            console.log(el.classList)
        }
  }

    render() {
        if(this.props.data.length>0){
            let i =0
            let att_values = []
            for(var att in this.props.attributes ){
             att_values.push(this.props.attributes[att].val)
        
            }

            const list = this.props.data.map(object => {
                let headers=[]
                let tds = new Array(this.props.attributes.length-1)
                
                return <div className='container'>
                        <div className='divPlaza' key={object.id} onClick={this.slideFunction}>
                            <div className='no-slided firstRow' >
                                {object[this.props.header]}
                                <table>
                                    

                                    {this.props.headers.map(header_i => {
                                    
                                        headers.push(<th><td>{header_i}</td></th>);

                                    })
                    
                                    }

                                    {
                                       
                                          [this.props.data[i]].map((json_i)=>{
                                           i+=1
                                           for(var prop in json_i){
                                            
                                            if(att_values.includes(prop)){
                                                
                                                let property_position = 0
                                                
                                                
                                                this.props.attributes.map(json=>{
                                                    if(json.val==prop){
                                                        property_position = json.position -1
                                                        
                                                    }
                                                })
                                                if(property_position!=3  && property_position!=4 && property_position!=5){
                                                    tds[this.props.attributes[property_position].position] = <td key={this.props.attributes[property_position].val}>{object[this.props.attributes[property_position].val]}</td>

                                                }else if(property_position==3){
                                                    var enlace= "" + object[this.props.attributes[property_position].val]
                                                    tds[this.props.attributes[property_position].position] = <td key={this.props.attributes[property_position].val}><a href={enlace}> Ver detalles/editar </a></td>
                                                }else if(property_position==4){
                                                    var enlace= "" + object[this.props.attributes[property_position].val]
                                                    tds[this.props.attributes[property_position].position] = <td key={this.props.attributes[property_position].val}><a href={enlace}> Reservas </a></td>
                                                }else if(property_position==5){
                                                    var enlace= "" + object[this.props.attributes[property_position].val]
                                                    tds[this.props.attributes[property_position].position] = <td key={this.props.attributes[property_position].val}><a href={enlace}> Disponibilidad </a></td>
                                                }


                                               }
                                           }
                                           

                                       })
                                       
                                       
                                       }
                                    <thead>{headers}</thead>
                                    <tbody>{tds}</tbody>

                                </table>
    
                            
                            </div>
                        </div>
                    </div>
            });
            return (
                <div>
          
                   <div>
                       {list}
                   </div>
                </div>
                 
             );
        }
        
        return <div>
            <Loading></Loading>

           
            </div>
       
    }
}
export default ListComponentPlazas;


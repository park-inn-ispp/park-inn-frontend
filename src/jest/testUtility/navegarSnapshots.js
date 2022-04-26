function navegarSnapshot(arbolInicial,path,nombreClaseObjetivo=null){

    let arbolActual = arbolInicial

    
    path = typeof path=="string" ? path.split(">") : path
 

    for(var index=0;index<= arbolActual.children.length && path.length>0;index++){
        var childrenActual = arbolActual.children[index]

        var elementoActual=childrenActual["type"]
        var elementoBuscadoActual = getTipoElementoActual(path[0])
        var posicionElementoBuscado = getPosicionElemento(path[0])


        
        if(posicionElementoBuscado==-1 && elementoActual==elementoBuscadoActual){
            arbolActual==arbolActual.children[index]
            index = 0
            path.shift()

            
            if(nombreClaseObjetivo){
                if(nombreClaseObjetivo==childrenActual["props"].className){
                    return childrenActual
                }else{
                    return navegarSnapshot(childrenActual,path,nombreClaseObjetivo)
                }
            }else{
                if(path.length==0){
                    return childrenActual

                }else{
                    return navegarSnapshot(childrenActual,path,nombreClaseObjetivo)

                }

            }



            
        }else if(posicionElementoBuscado==index && elementoActual==elementoBuscadoActual){
            arbolActual==arbolActual.children[index]
            index = 0
            path.shift()

            if(nombreClaseObjetivo){
                if(nombreClaseObjetivo==childrenActual["props"].className){
                    return childrenActual
                }else{
                    return navegarSnapshot(childrenActual,path,nombreClaseObjetivo)
                }
            }else{
                if(path.length==0){
                    return childrenActual
                }else{
                    return navegarSnapshot(childrenActual,path,nombreClaseObjetivo)

                }

            }

            

         }
        
    }
    

    
}

function getPosicionElemento(elemento){
    if(elemento.includes("[")){
        return parseInt(elemento.substring(elemento.indexOf("[")+1,elemento.indexOf("]")))
    }else{
        return -1
    }
}

function getTipoElementoActual(elemento){

    if(elemento.includes("[")){
        return elemento.substring(0,elemento.indexOf("["))
    }else{
        return elemento
    }
}

function comprobarStopCondition(classObjetivo,classActual){
    return classObjetivo==classActual
}

export default navegarSnapshot;
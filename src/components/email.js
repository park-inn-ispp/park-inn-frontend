import Cookie from 'universal-cookie'
const cookies = new Cookie()


export default async function email(){
return await fetch("http://localhost:8080/clients/usuariopormail/"+cookies.get('email')
            ).then(res =>{
                res.json()
                console.log(res.json)
            } 
            ).then(response=>{
                const prop = response
                return prop;
            })
}
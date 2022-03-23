import Cookie from 'universal-cookie'
const cookies = new Cookie()


export default async function email(){
return await fetch("https://parkinn-api-v1.herokuapp.com/clients/usuariopormail/"+cookies.get('email')
            ).then(res =>{
                res.json()
                console.log(res.json)
            } 
            ).then(response=>{
                const prop = response
                return prop;
            })
}
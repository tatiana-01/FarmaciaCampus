import { getUserByUsername } from '../Apis/apiProductoo.js';
import { getPacienteByUsuarioId, getPacienteById } from '../Apis/apiPaciente.js';
let params = new URL(document.location).searchParams;
let userName = params.get("username");
if(userName!=null){
let banner = document.querySelector('.bienvenido')
let datos=document.querySelector('#datos')
let ventas=document.querySelector('#compras')
let brand=document.querySelector('.brand')
let home=document.querySelector('.home')
console.log(userName);
console.log(banner);
getUserByUsername(userName.toString()).then((response)=>{
    getPacienteByUsuarioId(response.id).then((response)=>{
        banner.innerHTML = `Bienvenid@ ${response.nombre}`
        datos.href=`./views/PacienteDatos.html?id=${response.id}`
        ventas.href=`./views/comprasPaciente.html?id=${response.id}`
    })
})
}else{
    let id=parseInt(params.get("id"))
    getPacienteById(id).then((response)=>{
        let banner = document.querySelector('.bienvenido')
        let ventas=document.querySelector('#compras')
        banner.innerHTML = `Bienvenid@ ${response.nombre}`
        datos.href=`./views/PacienteDatos.html?id=${response.id}`
        ventas.href=`./views/comprasPaciente.html?id=${response.id}`
    })
}



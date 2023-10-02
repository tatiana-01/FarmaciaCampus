
import { getUserByUsername,getEmpleadoById,getProveedorById } from '../Apis/apiProductoo.js';
import { getPacienteById } from '../Apis/apiPaciente.js';
import { getToken} from '../Apis/ApiFarmacia/apiLogin.js';
let formLogin=document.querySelector('#inicioSesion');
let btnLogin=document.querySelector('.iniciar')
btnLogin.addEventListener('click',(e)=>{
    let data=Object.fromEntries(new FormData(formLogin));
    console.log(data);
    getToken(data).then((response)=>{
       
            if(response.estaAutenticado){
                let confirmInicio=window.confirm("Inicio de sesion exitoso")
                console.log(response.roles);
                    if(response.roles.includes('Administrador') || response.roles.includes('Empleado') || response.roles.includes('Proveedor')){
                        if(confirmInicio) {
                            window.location=`../index.html?username=${response.userName}`
                        }
                        
                    }else{
                        if(confirmInicio) window.location=`../indexPaciente.html?username=${response.userName}`
                    
                    }
                
            
                
            }else {
                let confirm=window.confirm("Datos Invalidos")
                if(confirm) location.reload()
            }
    }).catch((error)=>{
        let confirm=window.confirm("Datos Invalidos")
                if(confirm) location.reload()
    })
})
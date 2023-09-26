import {getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getPacienteById, getCiudadById} from '../Apis/apiPaciente.js';

let params = new URL(document.location).searchParams;
let id = parseInt(params.get("id")); 
console.log(id);
    getPacienteById(id)
    .then((response) => {llenarCampos(response)});


function llenarCampos(data){
    console.log(data);
    let campos=document.querySelectorAll('p');
    campos[1].innerHTML=data.numIdentificacion
    campos[3].innerHTML=data.nombre
    campos[5].innerHTML=data.fechaNacimiento.substring(0,10)
    campos[7].innerHTML=data.correo
    campos[9].innerHTML=data.telefono
    campos[11].innerHTML=data.direccion.tipoVia +' '+data.direccion.numeroVia + ' '+ data.direccion.sufijoCardinal
    campos[13].innerHTML=data.direccion.barrio
    campos[15].innerHTML=data.direccion.codigoPostal
    let ciudad= getCiudadById(data.direccion.ciudadId).then((response)=>{
        campos[17].innerHTML=response.nombre
    })
    if(data.usuario==null){
        document.querySelector('#infoUsuario').innerHTML="No tiene usuario asignado"
    }else{
        campos[19].innerHTML=data.usuario.username
    }
    
    
    console.log(data);
}


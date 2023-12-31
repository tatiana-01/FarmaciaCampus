const opc={
    "GETPACIENTE": ()=>getDataPaciente(),
    "GETCIUDAD": ()=>getDataCiudad(),
    "POST": (data)=>postDataPaciente(data),
    "PUT": (data,id)=>putDataPaciente(data,id),
    "DELETE": (id)=>deleteDataPaciente(id),
}

let config={
    headers:new Headers({
        "Content-Type": "application/json"
    })
};

const getDataPaciente = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Paciente",config)).json();
    return res;
}

const getDataPais = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Pais",config)).json();
    return res;
}

const getPaisById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Pais/${id}`,config)).json();
    return res;
}
const getDepartamentoById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Departamento/${id}`,config)).json();
    return res;
}

const getDataCiudad = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Ciudad",config)).json();
    return res;
}
const getCiudadById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Ciudad/${id}`,config)).json();
    return res;
}
const getDataDepartamento = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Departamento",config)).json();
    return res;
}

const getDataGastos = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Paciente/gastosPacientes2023",config)).json();
    return res;
}

const postDataPaciente = async(data,token)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    config.headers.append('Authorization',`Bearer ${token}`)
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Paciente",config));
    if(res.status!=200){
        return "error";
    }else{
        return res.json()
    }
}
const postRol = async(data)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    //config.headers.append('Authorization',`Bearer ${token}`)
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Usuarios/addrol",config));
    if(res.status!=200){
        return "error";
    }else{
        return res.json()
    }
}
const registerPaciente = async(data,id)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    //config.headers.append('Authorization',`Bearer ${token}`)
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Paciente/register/${id}`,config)).json();
    console.log(res);
    return res;
}

const putDataPaciente = async(data,id,idUsuario)=>{
    config.method = "PUT";
    config.body=JSON.stringify(data);
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Paciente/${id}/${idUsuario}`,config)).json();
    console.log(res);
}

const deleteDataPaciente = async(id)=>{
    config.method = "DELETE";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Paciente/${id}`,config)).json();
    console.log(res);
}

const getPacienteById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Paciente/${id}`,config)).json();
    return res;
}

const getPacienteByUsuarioId= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Paciente/usuarioId/${id}`,config)).json();
    return res;
}


export {
    opc, getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getPacienteById, getDataCiudad, getDataPais, getPaisById, getDepartamentoById, getCiudadById, registerPaciente, getPacienteByUsuarioId, getDataGastos, postRol
}


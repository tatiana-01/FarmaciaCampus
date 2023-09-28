const opc={
    "GET": ()=>getDataRol(),
    "POST": (data)=>postDataRol(data),
    "PUT": (data,id)=>putDataRol(data,id),
    "DELETE": (id)=>deleteDataRol(id),
}

let config={
    headers:new Headers({
        "Content-Type": "application/json"
    })
};

const getDataRol = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Rol",config)).json();
    return res;
}

const postDataRol = async(data)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Rol",config)).json();
    console.log(res);
}

const putDataRol = async(data,id)=>{
    config.method = "PUT";
    config.body=JSON.stringify(data);
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Rol/${id}`,config)).json();
    console.log(res);
}

const deleteDataRol = async(id)=>{
    config.method = "DELETE";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Rol/${id}`,config)).json();
    console.log(res);
}

const getRolById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Rol/${id}`,config)).json();
    return res;
}

export {
    opc, getDataRol, postDataRol, putDataRol, deleteDataRol, getRolById
}
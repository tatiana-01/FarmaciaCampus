const opc={
    "GET": ()=>getDataDepartamento(),
    "POST": (data)=>postDataDepartamento(data),
    "PUT": (data,id)=>putDataDepartamento(data,id),
    "DELETE": (id)=>deleteDataDepartamento(id),
}

let config={
    headers:new Headers({
        "Content-Type": "application/json"
    })
};

const getDataDepartamento = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Departamento",config)).json();
    return res;
}

const postDataDepartamento = async(data)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Departamento",config)).json();
    console.log(res);
}

const putDataDepartamento = async(data,id)=>{
    config.method = "PUT";
    config.body=JSON.stringify(data);
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Departamento/${id}`,config)).json();
    console.log(res);
}

const deleteDataDepartamento = async(id)=>{
    config.method = "DELETE";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Departamento/${id}`,config)).json();
    console.log(res);
}

const getDepartamentoById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Departamento/${id}`,config)).json();
    return res;
}

export {
    opc, getDataDepartamento, postDataDepartamento, putDataDepartamento, deleteDataDepartamento, getDepartamentoById
}
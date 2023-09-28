const opc={
    "GET": ()=>getDataProducto(),
    "POST": (data)=>postDataProducto(data),
    "PUT": (data,id)=>putDataProducto(data,id),
    "DELETE": (id)=>deleteDataProducto(id),
}

let config={
    headers:new Headers({
        "Content-Type": "application/json"
    })
};

const getDataProducto = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Medicamento",config)).json();
    return res;
}

const getDataEmpleado = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Empleado",config)).json();
    return res;
}

const postDataProducto = async(data)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Medicamento",config)).json();
    console.log(res);
}

const putDataProducto = async(data,id)=>{
    config.method = "PUT";
    config.body=JSON.stringify(data);
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Medicamento/${id}`,config)).json();
    console.log(res);
}

const deleteDataProducto = async(id)=>{
    config.method = "DELETE";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Medicamento/${id}`,config)).json();
    console.log(res);
}

const getProductoById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Medicamento/${id}`,config)).json();
    return res;
}

const getEmpleadoById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Empleado/${id}`,config)).json();
    return res;
}


export {
    opc, getDataProducto, postDataProducto, putDataProducto, deleteDataProducto, getProductoById, getDataEmpleado, getEmpleadoById
}
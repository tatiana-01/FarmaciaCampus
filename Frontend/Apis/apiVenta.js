const opc={
    "GET": ()=>getDataVenta(),
    "POST": (data)=>postDataVenta(data),
    "PUT": (data,id)=>putDataVenta(data,id),
    "DELETE": (id)=>deleteDataVenta(id),
}

let config={
    headers:new Headers({
        "Content-Type": "application/json"
    })
};

const getDataVenta = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Ventas",config)).json();
    return res;
}

const postDataVenta = async(data)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Ventas",config)).json();
    console.log(res);
}

const putDataVenta = async(data,id)=>{
    config.method = "PUT";
    config.body=JSON.stringify(data);
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Ventas/${id}`,config)).json();
    console.log(res);
}

const deleteDataVenta = async(id)=>{
    config.method = "DELETE";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Ventas/${id}`,config)).json();
    console.log(res);
}

const getVentaById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Ventas/${id}`,config)).json();
    return res;
}

const getMedicamentoById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Medicamento/${id}`,config)).json();
    return res;
}
export {
    opc, getDataVenta, postDataVenta, putDataVenta, deleteDataVenta, getVentaById,getMedicamentoById
}
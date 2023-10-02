export { getDataProveedor, getDataMedicamento, getProveedorById, getMedicamentoById, postDataCompra, getCompraById, getDataCompra, deleteDataCompra };
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

const getDataProveedor = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Proveedor",config)).json();
    return res;
}

const getDataMedicamento = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Medicamento",config)).json();
    return res;
}

const getProveedorById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Proveedor/${id}`,config)).json();
    return res;
}

const getMedicamentoById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Medicamento/${id}`,config)).json();
    return res;
}

const postDataCompra = async(data)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Compras",config)).json();
    console.log(res);
}

const getCompraById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Compras/${id}`,config)).json();
    return res;
}

const getDataCompra = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Compras",config)).json();
    return res;
}

const deleteDataCompra = async(id)=>{
    config.method = "DELETE";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Compras/${id}`,config)).json();
    console.log(res);
}

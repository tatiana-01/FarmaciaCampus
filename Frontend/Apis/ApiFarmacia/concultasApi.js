export { getMedicamentoById, getRecaudoTotal, getDataMedicamentoPorProveedor, getMedicamentoPorFecha };

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

const getMedicamentoById = async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Medicamento/TotalVentasMeidc/${id}`,config)).json();
    return res;
}

const getRecaudoTotal = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/MedicamentoVentas/TotalDeVentasRecaudado",config)).json();
    return res;
}

const getDataMedicamentoPorProveedor = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Proveedor/NumeroMedicamentosProveedor",config)).json();
    return res;
}

const getMedicamentoPorFecha= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/MedicamentoVentas/TotalDeMedicamentosVendidosEn/${id}`,config)).json();
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
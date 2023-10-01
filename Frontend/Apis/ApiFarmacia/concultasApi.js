export { getMedicamentoById, getRecaudoTotal, getDataMedicamentoPorProveedor, getMedicamentoPorFecha, getPrecioStock, getStockProveedor, getTotalMedic, getEmpleadoFecha, getEmpleadoVenta, getPromedioVentas, getListaProvvedores };

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

const getPrecioStock= async(precio, stock )=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Medicamento/MedicMayorPrecioMenorStock/${precio}/${stock}`,config)).json();
    return res;
}

const getStockProveedor = async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Proveedor/ProveedoresDeMedicaStockMenorA/${id}`,config)).json();
    return res;
}

const getTotalMedic = async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Ventas/TotalMedicamentosVendidos/${id}`,config)).json();
    return res;
}

const getEmpleadoFecha = async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Ventas/EmpleadosSinVentasEchas/${id}`,config)).json();
    return res;
}

const getEmpleadoVenta = async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Ventas/EmpleadosConMasVentasEchas/${id}`,config)).json();
    return res;
}

const getPromedioVentas = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/MedicamentoVentas/PromedioMedicamentosPorVenta",config)).json();
    return res;
}

const getListaProvvedores = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Medicamento/LstProveedores",config)).json();
    return res;
}
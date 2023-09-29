
let config={
    headers:new Headers({
        "Content-Type": "application/json"
    })
};

const getProveedorMasMed = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Proveedor/masMedicamentos2023",config)).json();
    return res;
}

const getComprasMeds = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Compras",config)).json();
    return res;
}
const getMedMenos = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Medicamento/menosvendido2023",config)).json();
    return res;
}

const getMedsTrimestre = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Medicamento/medicamentosTrimestre2023",config)).json();
    return res;
}

const getVentasEmpleados = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Empleado/ventasporempleado",config)).json();
    return res;
}

const getMedsExpiranAntes2024 = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Medicamento/vencenantesde2024",config)).json();
    return res;
}

const getClienteGastador= async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Paciente/masGastador",config)).json();
    return res;
}

const getProveedor= async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Proveedor",config)).json();
    return res;
}

const postDataRecluta = async(data)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Proveedor",config)).json();
    console.log(res);
}

const getProveedorName = async(nombre)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Medicamento/proveedor/${nombre}`,config)).json();
    return res;
}

const deleteDataRecluta = async(id)=>{
    config.method = "DELETE";
    let res= await ( await fetch(`http://localhost:3000/reclutas/${id}`,config)).json();
    console.log(res);
}

const getReclutaById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:3000/reclutas/${id}`,config)).json();
    return res;
}

export {
    getComprasMeds,getProveedorMasMed, getMedMenos, getMedsTrimestre, getVentasEmpleados, getMedsExpiranAntes2024, getClienteGastador, getProveedorName, getProveedor
}
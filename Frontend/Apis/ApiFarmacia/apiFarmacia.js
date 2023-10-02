const urlEmployee =  "http://localhost:5000/api/Farmacia/Empleado";
const urlMedicamento = "http://localhost:5000/api/Farmacia/Medicamento";
const urlMedicamnetoVenta = "http://localhost:5000/api/Farmacia/MedicamentoVentas"

let configObjet = {
    headers:new Headers({
        "Content-Type": "application/json"
    })
}

export async function getAllEmployees(url){
    configObjet.method = "GET";
    var result =  fetch(url,configObjet)
    return result;
}
export async function postEmployee(data){
    configObjet.method ="POST";
    configObjet.body = JSON.stringify(data);
    
    await fetch(urlEmployee,configObjet);
}
const editEmployee = async()=>{
    console.log();
}
const registerEmployee = async()=>{
    console.log();
}
const deleteEmployee = async (id)=>{
    await fetch(`${urlEmployee}/${id}`,{
        method:"DELETE"
    })
}
const getById = async (url,id)=>{
    configObjet.method = "GET";
    let newUrl = `${url}/${id}`;
    console.log(newUrl);
    var result =  fetch(newUrl,configObjet)
    return result;

}
const registerUser = async (id,data)=>{
    let url = `${urlEmployee}/register/${id}`;
    configObjet.method ="POST";
    configObjet.body =JSON.stringify(data) ;
    console.log(url);

    var result = await fetch(url,configObjet)
    return result;
}
const getMedsMenosDe50Unidades = async()=>{
    let url =`${urlMedicamento}/medicamentosMenosde50Unidades`;
    configObjet.method = "GET";
    var result = await fetch(url,configObjet);
    return result;
}
const vendidosDespues1Enero2023 = async()=>{
    let url = `${urlMedicamnetoVenta}/vendidosDespues-1-Enero-2023`;
    configObjet.method = "GET";
    var result = await fetch(url,configObjet);
    return result;
}

export const medicamentosOptions={
    "MedicamentosMenos50Unidades":getMedsMenosDe50Unidades,
    "vendidosDespues1Enero2023" : vendidosDespues1Enero2023
}
export const employeeOptions = {
    "get": getAllEmployees,
    "post": registerEmployee,
    "put": editEmployee,
    "delete":deleteEmployee,
    "getById":getById,
    "registerUser":registerUser
}
    
    


const urlEmployee =  "http://localhost:5000/api/Farmacia/Empleado";
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
export const employeeOptions = {
    "get": getAllEmployees,
    "post": registerEmployee,
    "put": editEmployee,
    "delete":deleteEmployee,
    "getById":getById
}
    
    


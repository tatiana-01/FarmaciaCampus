export const employeeOptions = {
    "get": ()=>getAllEmployees(),
    "post": (data) => registerEmployee(),
    "put":(id,data) => editEmployee(),
    "delete":(id) => deleteEmployee()
}


export async function getAllEmployees(url){
    let configObjet = {
        headers:new Headers({
            "Content-Type": "application/json"
        })
    }
    configObjet.method = "GET";
    var result =  fetch(url,configObjet)
    return result;
}
    //url = "http://localhost:5000/api/Farmacia/Empleado";
    


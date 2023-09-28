export { getUsuario, getByIdUsuario, putUsuario, deleteUsuario };

let config = {
    headers:new Headers({
        "Content-Type": "application/json"
    }), 
};

//estraemos los datos de la API, metodo (GET) para el TEAM
async function getUsuario() {
    try {
        const response = await fetch("http://localhost:5000/api/Farmacia/Usuarios") //indicamos el endpoint que es /team (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            return data;
            
        } else if (response.status === 401) {
            console.log("la lleve a la cual deseas ingresar esta mal escrita")

        } else if (response.status === 404) {
            console.log("El proveedor que buscas no exixte");

        } else {
            console.log("Hubo algun error y no se sabe que paso por el camino");
        }

    } catch (error) {
        console.log(error)
    }
}

//metodo (GET) para pais
const getDataPais = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Pais",config)).json();
    return res;
}

//metodo (GET por ID) para pais
const getPaisById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Pais/${id}`,config)).json();
    return res;
}

//metodo (GET) para departamento
const getDataDepartamento = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Departamento",config)).json();
    return res;
}

//metodo (GET por ID) para departamento 
const getDepartamentoById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Departamento/${id}`,config)).json();
    return res;
}

//metodo (GET) para ciudad
const getDataCiudad = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:5000/api/Farmacia/Ciudad",config)).json();
    return res;
}

//metodo (GET por ID) para departamento 
const getCiudadById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:5000/api/Farmacia/Ciudad/${id}`,config)).json();
    return res;
}

//metodo (POST) para proveedor
async function postUsuario(data) {
    config.method = "POST";
    config.body = JSON.stringify(data);
    let res = await ( await fetch("http://localhost:5000/api/Farmacia/Usuarios",config)).json();
    console.log(res);
}

//metodo (GET) para implementar el (BUSCAR)
async function getByIdUsuario(id) {
    config.method = "GET";
    let res = await ( await fetch(`http://localhost:5000/api/Farmacia/Usuarios/${id}`,config)).json();
    console.log(id);
    return res;
}

//metodo (PUT) para editar la base de datos  API
async function putUsuario (data, id) {
    config.method = "PUT";
    config.body = JSON.stringify(data);
    let res = await ( await fetch(`http://localhost:5000/api/Farmacia/Usuarios/${id}`,config)).json();
    console.log(res);
}

//metodo (DELETE) para eliminar un registro de la base de datos API
async function deleteUsuario(id) {
    config.method = "DELETE";
    //config.body = JSON.stringify(datos);
    let res = await ( await fetch(`http://localhost:5000/api/Farmacia/Usuarios/${id}`,config)).json();
    console.log(res);
}

//metodo (POST) para proveedor
async function postRegUsuarioProvee(data, id) {
    config.method = "POST";
    config.body = JSON.stringify(data);
    let res = await ( await fetch(`http://localhost:5000/api/Farmacia/Proveedor/register/${id}`,config)).json();
    console.log(res);
}
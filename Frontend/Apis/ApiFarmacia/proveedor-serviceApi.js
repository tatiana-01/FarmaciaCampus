//export { getProveedor, postCampers, searchCampers, putCampers, deleteCampers };
export { getProveedor };

//----variable golbales----
const URL_API = 'http://localhost:5000/api/Farmacia/Proveedor'; //url del servidor json server
//-------------------------

let config = {
    headers:new Headers({
        "Content-Type": "application/json"
    }), 
};

//estraemos los datos de la API, metodo (GET) para el TEAM
async function getProveedor() {
    try {
        const response = await fetch(`${URL_API}`) //indicamos el endpoint que es /team (GET)
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

/*//metodo (POST) para ingresar informacion a la  API
async function postCampers(datos) {
    config.method = "POST";
    config.body = JSON.stringify(datos);
    let res = await ( await fetch(`${URL_API}campers`,config)).json();
    console.log(res);
}

//metodo (GET) para implementar el (BUSCAR)
async function searchCampers(id) {
    config.method = "GET";
    let res = await ( await fetch(`${URL_API}campers/${id}`,config)).json();
    console.log(id);
    return res;
}

//metodo (PUT) para editar la base de datos  API
async function putCampers (data, id) {
    config.method = "PUT";
    config.body = JSON.stringify(data);
    let res = await ( await fetch(`${URL_API}campers/${id}`,config)).json();
    console.log(res);
}

//metodo (DELETE) para eliminar un registro de la base de datos API
async function deleteCampers(datos, id) {
    config.method = "DELETE";
    config.body = JSON.stringify(datos);
    let res = await ( await fetch(`${URL_API}campers/${id}`,config)).json();
    console.log(res);
}*/
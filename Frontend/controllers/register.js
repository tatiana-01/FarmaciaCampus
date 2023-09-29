import { employeeOptions } from "../Apis/ApiFarmacia/apiFarmacia.js";

let btnRegister = document.querySelector(".btnRegister");
let formRegisterUser = document.querySelectorAll("div.modal-body input");

function getQueryVariables(){
    let objectPairQuerys={};
    let url = window.location.search.substring(1);
    console.log(url);
    let vars = url.split("&");
    console.log(vars);

    for(let i=0; i< vars.length;i++){
        let pair = vars[i].split("=");
        objectPairQuerys[pair[0]] = pair[1]
    }
    console.log(objectPairQuerys);
    return objectPairQuerys;
}
function registerUser(e){
    let data ={}
    formRegisterUser.forEach(ele =>{
        console.log(ele.value);
        data[ele.name] = ele.value
    })
    let objectQuery = getQueryVariables()
    console.log(data);
    employeeOptions["registerUser"](objectQuery.id,data);
    window.alert("El usuario ha sido creado exitosamente 🎉");
}

btnRegister.addEventListener("click",registerUser);
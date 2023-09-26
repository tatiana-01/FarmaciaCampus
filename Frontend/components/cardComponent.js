import { employeeOptions, getAllEmployees } from "../Apis/ApiFarmacia/apiFarmacia.js";
class Card extends HTMLElement{
    constructor(){
        super()

        let shadow =   this.attachShadow({ mode: 'open' });
        shadow.innerHTML = /*html*/
        ` <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
        <div class="content mx-auto mt-4" style="width: 90%">
        <!-- INFO CAMPERS -->
        <div class="row">
            <h3>Informacion Básica</h3>
                <hr>
            <div class="col-12 col-md-6 ">
                <div class="card bg-secondary-subtle" id="infoPersonas" >
                    <!-- <img src="../../images/" class="card-img-top" > -->
                     <div class="card-body">                            
                        <h5 class="card-title">Datos Personales</h5>
                        <hr>
                        <div class="card-text contenidoPersonal">
                                                                                            
                        </div>                                
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="card bg-secondary-subtle" id="infoPersonas" >
                    <!-- <img src="../../images/" class="card-img-top" > -->
                    <div class="card-body">
                    <h5 class="card-title">Datos de Contacto</h5>
                    <hr>
                        <div class="card-text contenidoContacto">                                                                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-3">
            <button class="btn btn-warning mx-auto" id='btnEditarPaciente' type="submit" data-bs-toggle="modal" data-bs-target="#editarInfoBasica">Editar</button>
            <button class="btn btn-danger mx-auto" id='btnEliminarPaciente' type="submit" data-bs-toggle="modal" data-bs-target="#eliminarPaciente">Eliminar Paciente</button>
        </div>` 

    }
    connectedCallback() {
        let url = this.getAttribute("data-url")
        let objectQueryVariables = this.getQueryVariables();
        console.log(`${url}/${objectQueryVariables.id}`);
       // employeeOptions.getById(url,objectQueryVariables.id);
       this.getDataById(url,objectQueryVariables.id);
        

       
    }
    getQueryVariables(){
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
    getDataById(url,id){
        employeeOptions["getById"](url,id)
            .then(response =>response.json())
            .then(json =>{
                console.log(json);
                this.mostarData(json)
            })

    }
    mostarData(data){
        let contendidoPersonal = this.shadowRoot.querySelector(".contenidoPersonal");
        let contenidoContacto = this.shadowRoot.querySelector(".contenidoContacto");
        let templateTarjetaPersonal ="";
        let templateTarjetaContacto = "";
            const {numIdentificacion,nombre,correo,telefono,id,eps,arl,salario,cargo} = data;
            const {tipoVia,numeroVia,letraVia,sufijoCardinal,barrio} = data.direccion;
            templateTarjetaPersonal+=`
            <p class="fw-bold m-0">Numero de Indetificación:</p>
                            <p id='numIdentificacion'> ${numIdentificacion}</p>
                            <p class="fw-bold m-0">Nombre:</p>
                            <p id='nombre'>${nombre}</p>                 
                            <p class="fw-bold m-0">Email:</p>
                            <p id='correo'>${correo}</p>                        
                            <p class="fw-bold m-0">Telefono:</p>
                            <p id='telefono'>${telefono}</p>
                            <h5>Informacion Laboral</h5>
                            <hr>
                            <p class="fw-bold m-0">Cargo:</p>
                             <p id='correo'>${cargo}</p>  
                             <p class="fw-bold m-0">Salario:</p>
                             <p id='correo'>$${salario}</p>
                             <p class="fw-bold m-0">Eps Afiliado:</p>
                             <p id='correo'>${eps}</p>
                             <p class="fw-bold m-0">Arl Afiliado:</p>
                             <p id='correo'>${arl}</p>

            `
            templateTarjetaContacto+=
                ` <p class="fw-bold m-0">Direccion:</p>
                <p id='direccion'>${tipoVia} ${numeroVia} ${letraVia} ${sufijoCardinal}</p>
                <p class="fw-bold m-0">Barrio:</p>
                <p id='barrio'>${barrio}</p>
                <p class="fw-bold m-0">codigo Postal:</p>
                <p id='codigoPostal'>5254</p>
                <p class="fw-bold m-0">Ciudad:</p>
                <p id='ciudad' data-ciudad="" data-region='' data-pais=''>fhgh</p> `
        ;
        contendidoPersonal.innerHTML = templateTarjetaPersonal;
        contenidoContacto.innerHTML = templateTarjetaContacto;
    }

}
window.customElements.define("card-info",Card);
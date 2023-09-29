import { medicamentosOptions } from "../Apis/ApiFarmacia/apiFarmacia.js";
class component1 extends HTMLElement{
    constructor(){
        super()

        let shadow =   this.attachShadow({ mode: 'open' });
        shadow.innerHTML = /*html*/
        `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
        <div class="title"></div>
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Fecha Expiracion</th>
            <th scope="col">Proveedor</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>`


    }
    connectedCallback(){
        //let url = this.getAttribute("data-url");
        this.mostrarInfo()
    }
    mostrarInfo(){
        medicamentosOptions.MedicamentosMenos50Unidades()
            .then(response =>response.json())
            .then(json =>{
                this.llenarTabla(json)
            }
            )
    }
    llenarTabla(data){
        let tableBody = this.shadowRoot.querySelector("tbody")
        if(data.length == 0){
            console.log("vacio");
            let divTitle = this.shadowRoot.querySelector(".title")
            let template = "No existen datos con estas especificaciones"
            divTitle.innerHTML = template
        }
        else{
            let template =""
            data.forEach(element => {
                
                const {id,nombre,precio,stock,fechaExpiracion} = element
                template+= `
                <tr>
                <th scope="row">${id}</th>
                <td>${nombre}</td>
                <td>${precio}</td>
                <td>${stock}</td>
                <td>${fechaExpiracion}</td>
                <td>NombreProveedor</td>
              </tr>`  
            });
            tableBody.innerHTML =template
        }

     
    }
}
window.customElements.define("component-med1",component1);
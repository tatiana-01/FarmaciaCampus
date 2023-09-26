import { employeeOptions, getAllEmployees } from "../Apis/ApiFarmacia/apiFarmacia.js";
class List extends HTMLElement {
    constructor() {
        super()

        let shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML =
            `  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
            crossorigin="anonymous"></script>
            <div class="container">
            <header class="headPricipal row">
            </header>
            <section class=" mainContent row">
              <div class="col sm-12">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Cedula</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Direccion</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                </table>
      
              </div>
      
            </section>
          </div>`

    }
    connectedCallback() {
        let url = this.getAttribute("data-url");
        console.log(typeof url);
        this.getAllData(url);
        console.log(window.location);


    }
    getAllData(url) {
       getAllEmployees(url)
            .then(response => response.json())
            .then(json =>{
                this.mostrarTablaEmpleados(json.result)
           });
        // // fetch(url)
        //      .then(response => response.json())
        //      .then(json =>{
        //          this.mostrarTablaEmpleados(json.result)
        //     });
    }
    mostrarTablaEmpleados(data) {
        let mainSection = this.shadowRoot.querySelector("tbody");
        let template =""
        data.forEach(element => {
            const {numIdentificacion,nombre,correo,telefono,id} = element;
            const {tipoVia,numeroVia,letraVia,sufijoCardinal} = element.direccion;
            template+=`
            <tr>
                <td scope="row">${numIdentificacion}</td>
                <td>${nombre}</td>
                <td>${correo}</td>
                <td>${telefono}</td>
                <td>${tipoVia} ${numeroVia} ${letraVia} ${sufijoCardinal}</td>
                <td>
                    <button data-id="${id}" class="btn btn-danger delete">Eliminar</button>
                    <button class="btn btn-success">+</button>
                </td>
            </tr>
            `
        });
        mainSection.innerHTML = template;

    }
}
window.customElements.define("app-list", List);
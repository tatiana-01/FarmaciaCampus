import { medicamentosOptions } from "../Apis/ApiFarmacia/apiFarmacia.js";
class component2 extends HTMLElement {
    constructor() {
        super()
        let shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = /*html*/
            `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
        <div class="container">
        <h3 class="title"></h3>
        <div class="main"></div>
         `
    }
    connectedCallback() {
        this.mostrarInfo()

    }
    mostrarInfo() {
        medicamentosOptions.vendidosDespues1Enero2023()
            .then(response => response.json())
            .then(json => {
                this.llenarTabla(json)
            }
            )
    }
    llenarTabla(data) {
        let mainDiv = this.shadowRoot.querySelector(".main")
        if (data.length == 0) {
            console.log("vacio");
            let divTitle = this.shadowRoot.querySelector(".title")
            let template = "No existen datos con estas especificaciones"
            divTitle.innerHTML = template
        }
        else {
            let template = ""
            let template2 = ""
            data.forEach(element => {

                const { idVenta, fechaVenta } = element
                element.medicamentosRecetados.forEach(med => {
                    const { medicamentoId, nombre, precio, cantidadVendida } = med
                    template2 += ` <tr>
                    <th>${medicamentoId}</th>
                    <td>${nombre}</td>
                    <td>${precio}</td>
                    <td>${cantidadVendida}</td>
                  </tr>`

                })

                template += `
                <h3>Numero de Venta</h3>
        <p class="pIdVenta"> ${idVenta}</p>
        <h3>Fecha de Venta</h3>
        <p class="pFechaVenta">${fechaVenta}</p>
        <table class="table">
         <thead>
           <tr>
             <th scope="col">Id</th>
             <th scope="col">Nombre</th>
             <th scope="col">Precio</th>
             <th scope="col">Cantidad Vendida</th>
            
           </tr>
         </thead>
         <tbody>
         ${template2}
        
         </tbody>
       </table>

     </div> `
            });
            mainDiv.innerHTML = template
        }


    }
}
window.customElements.define("compo-mv2", component2);
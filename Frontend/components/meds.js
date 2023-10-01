import { getDataProducto } from '../Apis/apiProductoo.js';

class Medicamentos extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.getApiRol();

        // this.redireccionarPagina();
        /* this.postDataRol();
       this.eventoSelects(); */
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="container mt-4">
            <header class="headPricipal row">
            </header>
            <section class=" mainContent row">
              <div class="col sm-12">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">nombre medicamento</th>
                        <th scope="col">fecha expiracion</th>
                        <th scope="col">stock</th>
                        <th scope="col">precio</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                </table>
      
              </div>
      
            </section>
          </div>
        </div>
          `
    }

    getApiRol() {
        getDataProducto()
            .then((response) => { this.mostrarTablaRoles(response) });
    }

    mostrarTablaRoles(data) {
      
        let mainSection = document.querySelector("tbody");
        let template = ""
        data.forEach(element => {
            const { nombre, id,stock, fechaExpiracion, precio } = element;
            let fecha=fechaExpiracion.substring(0,10)
            template += `
            <tr>
                <td scope="row">${id}</td>
                <td scope="row">${nombre}</td>
                <td scope="row">${fecha}</td>
                <td scope="row">${stock}</td>
                <td scope="row">${precio}</td>
            </tr>
            `
             

        });
        mainSection.innerHTML = template;

    }

   

    
};
customElements.define('lista-meds', Medicamentos);
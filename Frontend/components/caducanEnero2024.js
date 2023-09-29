import { getMedsExpiranAntes2024 } from '../Apis/apiTatiana.js';

class ListarMedsCaducanEnero2024 extends HTMLElement {
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
        getMedsExpiranAntes2024()
            .then((response) => { this.mostrarTablaRoles(response) });
    }

    mostrarTablaRoles(data) {
      
        let mainSection = document.querySelector("tbody");
        let template = ""
        data.forEach(element => {
            const { nombre, id,stock, fechaExpiracion } = element;
            let fecha=fechaExpiracion.substring(0,10)
            template += `
            <tr>
                <td scope="row">${id}</td>
                <td scope="row">${nombre}</td>
                <td scope="row">${fecha}</td>
                <td scope="row">${stock}</td>
            </tr>
            `
             

        });
        mainSection.innerHTML = template;

    }

   

    
};
customElements.define('lista-meds-caducan-2024', ListarMedsCaducanEnero2024);
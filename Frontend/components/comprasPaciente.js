import { getDataVenta, postDataVenta, putDataVenta, deleteDataVenta, getVentaById } from '../Apis/apiVenta.js';
import { getDataProducto, postDataProducto, putDataProducto, deleteDataProducto, getDataEmpleado, getProductoById, getEmpleadoById } from '../Apis/apiProductoo.js';
import { getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais, getPaisById, getDepartamentoById, getPacienteById, getDataGastos } from '../Apis/apiPaciente.js';
class ComprasPaciente extends HTMLElement {
    constructor() {
        super();
        this.render();
        //this.getApiVenta();

        let params = new URL(document.location).searchParams;
        let id = parseInt(params.get("id"));

        // this.redireccionarPagina();
        /* this.postDataVenta();
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
                        <th scope="col">Fecha</th>
                        <th scope="col">Precio</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                </table>
      
              </div>
      
            </section>
          </div>
          `
    }

    getApiVenta() {
        getDataVenta()
            .then((response) => { this.mostrarTablaVentas(response) });
    }

    mostrarTablaVentas(data) {
        console.log(data);
        let mainSection = document.querySelector("tbody");
        let template = ""
        data.forEach(element => {
            const { empleado, paciente, fechaVenta, id } = element;
            let fecha= fechaVenta.substring(0, 10)
            template += `
            <tr>
                <td scope="row">${id}</td>
                <td scope="row">${paciente.nombre}</td>
                <td>${empleado.nombre}</td>
                <td>${fecha}</td>
                <td>
                    <button data-id="${id}" id="masInfo" class="btn btn-success masInfo">Mas Info</button>
                </td>
            </tr>
            `
             

        });
        mainSection.innerHTML = template;
        console.log(template);
        this.redireccionarPagina();
        this.eliminarVenta();
    }

    redireccionarPagina() {
        let mas = document.querySelectorAll('.masInfo')
        mas.forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.location = `MasInfoCompraPaciente.html?id=${e.target.dataset.id}`
            })
        })


    }


};
customElements.define('paciente-compras', ComprasPaciente);
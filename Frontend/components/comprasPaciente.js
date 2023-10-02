import { getDataVenta, postDataVenta, putDataVenta, deleteDataVenta, getVentaById } from '../Apis/apiVenta.js';
import { getDataProducto, postDataProducto, putDataProducto, deleteDataProducto, getDataEmpleado, getProductoById, getEmpleadoById } from '../Apis/apiProductoo.js';
import { getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais, getPaisById, getDepartamentoById, getPacienteById, getDataGastos } from '../Apis/apiPaciente.js';

class ComprasPaciente extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.getApiVenta();

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
              <div class="col lg-12">
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

              <div class="col lg-12 ">
              <div class="card ">
              <div class="row ">
               <div class="col-md-6 text-center pt-3 ">
                   <p class="fw-bold">Total Invertido en Salud 2023</p>
               </div>
               <div class="col-md-6 text-center " id="totalGastado">
                   0
               </div>
              </div>
           </div>
                
      
              </div>
      
            </section>
          </div>
          `
    }

    getApiVenta() {
        getDataGastos()
            .then((response) => { this.mostrarTablaVentas(response) });
    }

    mostrarTablaVentas(data) {
        let params = new URL(document.location).searchParams;
        let idPaciente = parseInt(params.get("id"));
        console.log(data);
        let mainSection = document.querySelector("tbody");
        let template = ""
        data.forEach(element => {

            if (element.infoPaciente.id == idPaciente) {
                const { infoPaciente, totalGastado } = element;
                if (totalGastado == 0) {
                    template = "Aun no ha hecho alguna compra"
                } else {
                    infoPaciente.ventas.forEach((venta) => {
                        let totalVenta = 0;
                        let fecha = venta.fechaVenta.substring(0, 10)
                        venta.medicamentosVendidos.forEach((med) => {
                            totalVenta += med.precio
                        })
                        template += `
                    <tr>
                        <td scope="row">${venta.id}</td>
                        <td scope="row">${fecha}</td>
                        <td>${totalVenta}</td>
                        <td>
                            <button data-id="${venta.id}" id="masInfo" data-bs-toggle="modal" data-bs-target="#facturaModal" class="btn btn-success masInfo">Mas Info</button>
                        </td>
                    </tr>
                    `
                    })
                    document.querySelector('#totalGastado').innerHTML = totalGastado
                }
            }
        });

        mainSection.innerHTML = template;
        console.log(template);
        this.masInfo();

    }



    masInfo() {
        let mas = document.querySelectorAll('.masInfo')
        mas.forEach(btn => {
            btn.addEventListener('click', (e) => {
                let modalBody = document.querySelector('.infoFactura')
                getVentaById(e.target.dataset.id).then((response) => {
                    this.llenarCampos(response)
                })
            })
        })

    }

    llenarCampos(data) {
        let id = document.querySelector('.noFactura')
        let fecha = document.querySelector('.fecha')
        let paciente = document.querySelector('.paciente')
        let empleado = document.querySelector('.empleado')
        let medicamentos = document.querySelector('.medsFactura')
        medicamentos.innerHTML=""
        let campoTotal = document.querySelector('.total')
        let identificacionPaciente = document.querySelector('.identificacion')
        id.innerHTML = `Factura No.${data.id}`
        let fechaInfo = data.fechaVenta.substring(0, 10);
        let total = 0;
        fecha.innerHTML = fechaInfo
        console.log(data.paciente.nombre);
        paciente.innerHTML = data.paciente.nombre
        empleado.innerHTML = data.empleado.nombre
        identificacionPaciente.innerHTML = data.paciente.numIdentificacion
        data.medicamentosVendidos.forEach(element => {
            getProductoById(element.medicamentoId).then((response) => {
                medicamentos.innerHTML += `
            <div class="row mt-3">
                                <div class="col-xl-4 d-flex justify-content-center">
                                    ${response.nombre}
                                </div>
                                <div class="col-xl-4 d-flex justify-content-center">
                                    ${element.cantidadVendida}
                                </div>
                                <div class="col-xl-4 d-flex justify-content-center">
                                ${element.precio}
                                </div>
                            </div>
            `
                total += element.precio
                campoTotal.innerHTML = total
            })

        });

    }


};
customElements.define('paciente-compras', ComprasPaciente);
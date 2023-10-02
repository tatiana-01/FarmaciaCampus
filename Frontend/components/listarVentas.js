import { getDataVenta, postDataVenta, putDataVenta, deleteDataVenta, getVentaById } from '../Apis/apiVenta.js';
import { getDataProducto, postDataProducto, putDataProducto, deleteDataProducto, getDataEmpleado, getProductoById, getEmpleadoById } from '../Apis/apiProductoo.js';
import { getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais, getPaisById, getDepartamentoById, getPacienteById } from '../Apis/apiPaciente.js';
class ListarVenta extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.getApiVenta();

        // this.redireccionarPagina();
        /* this.postDataVenta();
       this.eventoSelects(); */
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="btn-group" role="group" aria-label="Basic outlined example">
        <a href="registrarVentas.html" class="btn btn-outline-primary">Registrar Ventas</a>
        <a href="mostrarVentas.html" class="btn btn-outline-primary">Mostrar Ventas</a>
    </div>
        <div class="container mt-4">
            <header class="headPricipal row">
            </header>
            <section class=" mainContent row">
              <div class="col sm-12">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Paciente</th>
                        <th scope="col">Empleado</th>
                        <th scope="col">Fecha</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                </table>
      
              </div>
      
            </section>
          </div>
          <div class="modal fade" id="eliminarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Confirmar eliminación</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body infoEliminar">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger eliminarDefinitivo">Eliminar</button>
                </div>
                </div>
            </div>
        </div>
          `
    }

    getApiVenta() {
        getDataVenta()
            .then((response) => { this.mostrarTablaVentas(response.registers) });
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
                    <button data-id="${id}" class="btn btn-danger delete" data-bs-toggle="modal" data-bs-target="#eliminarModal">Eliminar</button>
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
                window.location = `MasInfoVenta.html?id=${e.target.dataset.id}`
            })
        })


    }

    eliminarVenta() {
        let botonEliminar = document.querySelectorAll('.delete');
        botonEliminar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                let eliminarConfirmacion = document.querySelector('.eliminarDefinitivo')
                eliminarConfirmacion.setAttribute("data-idDelete", e.target.dataset.id)
                this.confirmarEliminar();
                console.log(e.target.dataset.id);

            })
        })
    }

    confirmarEliminar() {
        let eliminarConfirmacion = document.querySelector('.eliminarDefinitivo')
        let infoVenta = document.querySelector('.infoEliminar')
        console.log(eliminarConfirmacion);
        getVentaById(eliminarConfirmacion.dataset.iddelete).then((response) => {
            infoVenta.innerHTML = `Desea eliminar la venta con id ${response.id}`
            eliminarConfirmacion.addEventListener('click', (e) => {
                deleteDataVenta(e.target.dataset.iddelete).then((response) => console.log(response))
                location.reload();
            })
        })
    }

};
customElements.define('lista-venta', ListarVenta);
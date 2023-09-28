import { getDataRol, postDataRol, putDataRol, deleteDataRol, getRolById } from '../Apis/apiRol.js';
import { getDataProducto, postDataProducto, putDataProducto, deleteDataProducto, getDataEmpleado, getProductoById, getEmpleadoById } from '../Apis/apiProductoo.js';
import { getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais, getPaisById, getDepartamentoById, getPacienteById } from '../Apis/apiPaciente.js';
class ListarRol extends HTMLElement {
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
                        <th scope="col">nombre</th>
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
                    <button type="button" class="btn btn-warning editarDefinitivo">Enviar Edicion</button>
                </div>
                </div>
            </div>
        </div>
          `
    }

    getApiRol() {
        getDataRol()
            .then((response) => { this.mostrarTablaRoles(response) });
    }

    mostrarTablaRoles(data) {
      
        let mainSection = document.querySelector("tbody");
        let template = ""
        data.forEach(element => {
            const { nombre, id } = element;
            template += `
            <tr>
                <td scope="row">${id}</td>
                <td scope="row">${nombre}</td>
                <td>
                    <button data-id="${id}" class="btn btn-danger delete" data-bs-toggle="modal" data-bs-target="#eliminarModal">Eliminar</button>
                    <button data-id="${id}" id="editar" data-bs-toggle="modal" data-bs-target="#eliminarModal" class="btn btn-warning editar">Editar</button>
                </td>
            </tr>
            `
             

        });
        mainSection.innerHTML = template;
;
        this.eliminarRol();
        this.editarRol();
    }

   

    eliminarRol() {
        let botonEliminar = document.querySelectorAll('.delete');
        botonEliminar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                let eliminarConfirmacion = document.querySelector('.eliminarDefinitivo')
                eliminarConfirmacion.setAttribute("data-idDelete", e.target.dataset.id)
                this.confirmarEliminar();
            

            })
        })
    }

    confirmarEliminar() {
        
        let eliminarConfirmacion = document.querySelector('.eliminarDefinitivo')
        document.querySelector('.editarDefinitivo').classList.add('d-none')
        eliminarConfirmacion.classList.remove('d-none')
        let infoRol = document.querySelector('.infoEliminar')

        getRolById(eliminarConfirmacion.dataset.iddelete).then((response) => {
          
            infoRol.innerHTML = `Desea eliminar el rol ${response.nombre} con id ${response.id}`
            eliminarConfirmacion.addEventListener('click', (e) => {
                deleteDataRol(e.target.dataset.iddelete).then((response) => console.log(response))
                location.reload();
            })
        })
    }

    editarRol() {
        let botonEditar = document.querySelectorAll('.editar');
        botonEditar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('si');
                let modalBody=document.querySelector('.infoEliminar')
                modalBody.innerHTML=`
                <form id="formRol">
                            <div class="mb-3 w-50">
                                <label for="nameRol" class="form-label">Nombre del rol</label>
                                <input type="text" class="form-control" id="nameRol" name="nombre">
                            </div>
                    </form>`
                getRolById(e.target.dataset.id).then((response) => {
                let infoRol = document.querySelector('.infoEliminar')
                infoRol.querySelector('#nameRol').value=response.nombre
                this.confirmarEditar(response);
          
                })
            })
        })
    }

    confirmarEditar(data) {
        let confirmacion = document.querySelector('.editarDefinitivo')
        document.querySelector('.eliminarDefinitivo').classList.add('d-none')
        confirmacion.classList.remove('d-none')
        confirmacion.innerHTML='Enviar Edicion'
        confirmacion.classList.remove('btn-danger')
        confirmacion.classList.add('btn-warning')
        
            confirmacion.addEventListener('click', (e) => {
                let form=document.querySelector('#formRol')
                let dataForm=Object.fromEntries(new FormData(form));
                putDataRol(dataForm,data.id).then((response) => console.log(response))
                location.reload();
            })
    }
};
customElements.define('lista-rol', ListarRol);
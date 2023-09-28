import {getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais,  getPaisById} from '../Apis/apiPaciente.js';
import { getDataDepartamento, postDataDepartamento, putDataDepartamento, deleteDataDepartamento, getDepartamentoById } from '../Apis/apiDepartamento.js';
class ListarDepartamento extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.getApiDepartamento();

        // this.redireccionarPagina();
        /* this.postDataDepartamento();
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
                        <th scope="col">Pais</th>
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

    getApiDepartamento() {
        getDataDepartamento()
            .then((response) => { this.mostrarTablaDepartamentos(response.registers) });
    }

    mostrarTablaDepartamentos(data) {
      
        let mainSection = document.querySelector("tbody");
        let template = ""
        data.forEach(element => {
            const { nombre, id, pais } = element;
            template += `
            <tr>
                <td scope="row">${id}</td>
                <td scope="row">${nombre}</td>
                <td scope="row">${pais.nombre}</td>
                <td>
                    <button data-id="${id}" class="btn btn-danger delete" data-bs-toggle="modal" data-bs-target="#eliminarModal">Eliminar</button>
                    <button data-id="${id}" id="editar" data-bs-toggle="modal" data-bs-target="#eliminarModal" class="btn btn-warning editar">Editar</button>
                </td>
            </tr>
            `
             

        });
        mainSection.innerHTML = template;
;
        this.eliminarDepartamento();
        this.editarDepartamento();
    }

   

    eliminarDepartamento() {
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
        let infoDepartamento = document.querySelector('.infoEliminar')

        getDepartamentoById(eliminarConfirmacion.dataset.iddelete).then((response) => {
          
            infoDepartamento.innerHTML = `Desea eliminar el departamento ${response.nombre} con id ${response.id}`
            eliminarConfirmacion.addEventListener('click', (e) => {
                deleteDataDepartamento(e.target.dataset.iddelete).then((response) => console.log(response))
                location.reload();
            })
        })
    }

    selectLlenado = (data,selectID) =>{
        let select=document.querySelector(selectID);
        select.innerHTML='';
        const itemStart=document.createElement('option');
        itemStart.innerHTML='Seleccione una opcion'
        itemStart.selected;
        select.appendChild(itemStart);
    
            data.forEach(element => {
                const item= document.createElement('option');
                item.value=element.id;
                item.innerHTML=element.nombre;
                select.appendChild(item);
            });
        }

    editarDepartamento() {
        let botonEditar = document.querySelectorAll('.editar');
        botonEditar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                let modalBody=document.querySelector('.infoEliminar')
                modalBody.innerHTML=`
                <form id="formDepartamento">
                            <div class="row">
                                <div class=" mb-3 col-6">
                                    <label for="NombreDepartamento"  class="form-label">Nombre Departamento</label>
                                    <input type="text" id="nombreDpto" aria-label="First name" class="form-control" name="nombre">
                                </div>
                                <div class=" mb-3 col-6">
                                    <label for="selectPais" class="form-label">Pais</label>
                                    <select class="form-select" id="selectPais" name="paisId">
                                        <option value="0" selected>Seleccione una opcion</option>;
                                    </select>
                                </div>
    
                            </div>
                    </form>`
                    getDataPais().then((response)=>{
                        this.selectLlenado(response.registers,'#selectPais')
                    }).then(()=>{
                        getDepartamentoById(e.target.dataset.id).then((response) => {
                            let infoDepartamento = document.querySelector('.infoEliminar')
                            infoDepartamento.querySelector('#selectPais').value=response.paisId
                            infoDepartamento.querySelector('#nombreDpto').value=response.nombre
                            this.confirmarEditar(response);
                      
                            })
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
                let form=document.querySelector('#formDepartamento')
                let dataForm=Object.fromEntries(new FormData(form));
                putDataDepartamento(dataForm,data.id).then((response) => console.log(response))
                location.reload();
            })
    }
};
customElements.define('lista-departamento', ListarDepartamento);
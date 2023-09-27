import {getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais,  getPaisById, getDepartamentoById, getPacienteById} from '../Apis/apiPaciente.js';
class ListarPaciente extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.getApiPaciente();
        
       // this.redireccionarPagina();
         /* this.postDataPaciente();
        this.eventoSelects(); */
    }

    render() {
        this.innerHTML =/*html*/`
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

     getApiPaciente(){
        getDataPaciente()
        .then((response) => {this.mostrarTablaPacientes(response.result)});
    }

    mostrarTablaPacientes(data) {
        console.log(data);
        let mainSection = document.querySelector("tbody");
        let template =""
        data.forEach(element => {
            const {numIdentificacion,nombre,correo,telefono,id} = element;
            const {tipoVia,numeroVia,letraVia,sufijoCardinal} = element.direccion;
            template+=`
            <tr>
                <td scope="row">${numIdentificacion}</td>
                <td>${nombre}</td>
                <td>${correo}</td>
                <td>
                    <button data-id="${id}" class="btn btn-danger delete" data-bs-toggle="modal" data-bs-target="#eliminarModal">Eliminar</button>
                    <button data-id="${id}" id="masInfo" class="btn btn-success masInfo">Mas Info</button>
                </td>
            </tr>
            `
        });
        mainSection.innerHTML = template;
        this.redireccionarPagina();
        this.eliminarPaciente();
    }

    redireccionarPagina(){
          let mas=document.querySelectorAll('.masInfo')
            mas.forEach(btn=>{
                btn.addEventListener('click',(e)=>{
                    window.location=`MasInfoPaciente.html?id=${e.target.dataset.id}`
                })
            })
    
       
    }

    eliminarPaciente(){
        let botonEliminar=document.querySelectorAll('.delete');
        botonEliminar.forEach(btn=>{
            btn.addEventListener('click',(e)=>{
                let eliminarConfirmacion=document.querySelector('.eliminarDefinitivo')
                eliminarConfirmacion.setAttribute("data-idDelete",e.target.dataset.id)
                this.confirmarEliminar();
                console.log(e.target.dataset.id);
                
            })
        })
    }

    confirmarEliminar(){
        let eliminarConfirmacion=document.querySelector('.eliminarDefinitivo')
        let infoPaciente=document.querySelector('.infoEliminar')
        console.log(eliminarConfirmacion);
        getPacienteById(eliminarConfirmacion.dataset.iddelete).then((response)=>{
            infoPaciente.innerHTML=`Desea eliminar al paciente ${response.nombre} con numero de identificación ${response.numIdentificacion}`
            eliminarConfirmacion.addEventListener('click',(e)=>{
                deleteDataPaciente(e.target.dataset.iddelete).then((response)=>console.log(response))
                location.reload();
            })
        })
    }
/*
    eventoSelects=()=>{
        let selectPais=document.querySelector('#selectPais');
        let selectDepartamento=document.querySelector('#selectDepartamento');
        let selectCiudad=document.querySelector('#selectCiudad');
        selectPais.addEventListener('change',(e)=>{
            selectCiudad.innerHTML='<option value="0" selected>Seleccione una opcion</option>'
            getPaisById(e.target.value)
            .then((response) => {this.cambioSelects(response)});
        })
    }

    cambioSelects=(data)=>{
        this.selectLlenado(data.departamentos,'#selectDepartamento')
        let selectDepartamento=document.querySelector('#selectDepartamento');
        selectDepartamento.addEventListener('change',(e)=>{
            getDepartamentoById(e.target.value)
            .then((response) => {this.selectLlenado(response.ciudades,'#selectCiudad')});
        })
    }

    selectLlenado = (data,selectID) =>{
        console.log(data);
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

    selectPais = (data) =>{
        let select=document.querySelector('#selectPais');
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

    postDataPaciente=()=>{
        let formPersonal=document.querySelector('#formPaciente');
        let formDireccionPaciente=document.querySelector('#formDireccionPaciente');
        let boton=document.querySelector('#savePaciente');
        boton.addEventListener('click',(e)=>{
            
            let data=[];
            let dataPersonal=Object.fromEntries(new FormData(formPersonal));
            let dataDireccion=Object.fromEntries(new FormData(formDireccionPaciente));
            dataDireccion.ciudadId=document.querySelector("#selectCiudad").value;
            dataPersonal.Direccion=dataDireccion;
            data.push(dataPersonal);
            postDataPaciente(data);
            console.log();
            e.preventDefault();
        })
    }
 */


};
customElements.define('lista-paciente', ListarPaciente);
import {getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais,  getPaisById, getDepartamentoById} from '../Apis/apiPaciente.js';
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
                <td>${telefono}</td>
                <td>${tipoVia} ${numeroVia} ${letraVia} ${sufijoCardinal}</td>
                <td>
                    <button data-id="${id}" class="btn btn-danger delete">Eliminar</button>
                    <button data-id="${id}" id="masInfo" class="btn btn-success masInfo">+</button>
                </td>
            </tr>
            `
        });
        mainSection.innerHTML = template;
        this.redireccionarPagina();
    }

    redireccionarPagina(){
          let mas=document.querySelectorAll('.masInfo')
            mas.forEach(btn=>{
                btn.addEventListener('click',(e)=>{
                    window.location=`MasInfoPaciente.html?${e.target.dataset.id}`
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
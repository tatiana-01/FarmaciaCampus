import {getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais,  getPaisById, getDepartamentoById} from '../Apis/apiPaciente.js';
class FrmPaciente extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.getApiPais();
        this.postDataPaciente();
        this.eventoSelects();
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="container mt-3" id="pacienteForm">
        <div class="card">
            <div class="card-header">
                Paciente
            </div>
            <div class="card-body">
                <h5 class="card-title">Ingrese los datos del paciente</h5>
                <div class="container mb-3">
                    <form id="formPaciente">
                        
                            <h5 class="card-title">Datos personales</h5>
                            <div class="row">
                                <div class=" mb-3 col-md-4">
                                    <label for="numIdentificacion" class="form-label">Numero de identificación</label>
                                    <input type="text" aria-label="First name" class="form-control" name="numIdentificacion">
                                </div>    
                                <div class=" mb-3 col-md-4">
                                    <label for="nombre" class="form-label">Nombre Paciente</label>
                                    <input type="text" aria-label="First name" class="form-control" name="nombre">
                                </div>
                                <div class=" mb-3 col-md-4">
                                    <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                                    <input type="date" aria-label="First name" class="form-control" name="fechaNacimiento">
                                </div>    
                            </div>
                            <h5 class="card-title">Datos de contacto</h5>
                            <div class="row">
                                <div class=" mb-3 col-md-3">
                                    <label for="correo" class="form-label">Correo</label>
                                    <input type="email" aria-label="First name" class="form-control" name="correo">
                                </div>
                                <div class=" mb-3 col-md-3">
                                    <label for="telefono" class="form-label">Telefono</label>
                                    <input type="text" aria-label="First name" class="form-control" name="telefono">
                                </div>
                                <div class=" mb-3 col-md-2">
                                    <label for="selectPais" class="form-label">Pais</label>
                                    <select class="form-select" id="selectPais">
                                        <option value="0" selected>Seleccione una opcion</option>
                                    </select>
                                </div>
                                <div class=" mb-3 col-md-2">
                                    <label for="selectDepartamento" class="form-label">Departamento</label>
                                    <select class="form-select" id="selectDepartamento">
                                        <option value="0" selected>Seleccione una opcion</option>
                                    </select>
                                </div>
                    </form>
                                <div class=" mb-3 col-md-2">
                                    <label for="selectCiudad" class="form-label">Ciudad</label>
                                    <select class="form-select" id="selectCiudad" name="ciudadId">
                                        <option value="0" selected>Seleccione una opcion</option>
                                        
                                    </select>
                                </div>
                            </div>
                    <form id="formDireccionPaciente">
                            <div class="row">
                                <div class=" mb-3 col-md-5">
                                    <label for="direccion" class="form-label">Dirección</label>
                                    <div class="row">
                                    <div class="col-3 pe-0" >
                                    <input type="text" aria-label="First name" class="form-control" name="tipoVia" placeholder="Tipo via">
                                    </div>
                                    <div class="col-3 pe-0">
                                    <input type="number" aria-label="First name" class="form-control" name="numeroVia" placeholder="numero">
                                    </div>
                                    <div class="col-3 ">
                                    <input type="text" aria-label="First name" class="form-control" name="letraVia" placeholder="letra">
                                    </div>
                                    <div class="col-3 ps-0">
                                    <input type="text" aria-label="First name" class="form-control" name="sufijoCardinal" placeholder="sufijo cardinal">
                                    </div>
                                    </div>
                                </div>
                                <div class=" mb-3 col-md-4">
                                    <label for="barrio" class="form-label">Barrio</label>
                                    <input type="text" aria-label="First name" class="form-control" name="barrio">
                                </div>
                               
                                <div class=" mb-3 col-md-3">
                                    <label for="codigoPostal" class="form-label">Codigo Postal</label>
                                    <input type="text" aria-label="First name" class="form-control" name="codigoPostal">
                                </div>
                            </div>          
                    </form>                                       
                            <div class="enviarPaciente">
                                <button type="submit" class="btn enviar" id="savePaciente">Enviar</button>
                            </div>
                    
                   
                </div>
            </div>
        </div>
    </div>`
    }

    getApiPais(){
        getDataPais()
        .then((response) => {this.selectPais(response.registers)});
    }

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
            let token='eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0YXRpYW5hIiwianRpIjoiYzkxY2JjZTMtNjU0Zi00YTkzLWFjNDgtNzVjYjg1ZDRiYmRkIiwiZW1haWwiOiJ0YXRpYW5hQGdtYWlsLmNvbSIsInVpZCI6IjEiLCJyb2xlcyI6WyJHZXJlbnRlIiwiUGVyc29uYSJdLCJleHAiOjE2OTU3MzkxNzcsImlzcyI6IkFwaUZhcm1hY2lhIiwiYXVkIjoiQXBpRmFybWFjaWEifQ.TsjWtu4vmMwGtC42vaIVcGA_4iJSJ0FvvDXerLVcI6g';
            let data=[];
            let dataPersonal=Object.fromEntries(new FormData(formPersonal));
            let dataDireccion=Object.fromEntries(new FormData(formDireccionPaciente));
            dataDireccion.ciudadId=document.querySelector("#selectCiudad").value;
            dataPersonal.Direccion=dataDireccion;
            data.push(dataPersonal);
            postDataPaciente(data,token);
            //location.reload();
        })
    }



};
customElements.define('frm-paciente', FrmPaciente);
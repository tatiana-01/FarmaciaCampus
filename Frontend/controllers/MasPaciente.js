import { getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getPacienteById, getCiudadById, getDataPais, getPaisById, getDepartamentoById, registerPaciente } from '../Apis/apiPaciente.js';

let params = new URL(document.location).searchParams;
let id = parseInt(params.get("id"));
console.log(id);
getPacienteById(id)
    .then((response) => { llenarCampos(response) });


function llenarCampos(data) {
    console.log(data);
    let campos = document.querySelectorAll('p');
    campos[1].innerHTML = data.numIdentificacion
    campos[3].innerHTML = data.nombre
    campos[5].innerHTML = data.fechaNacimiento.substring(0, 10)
    campos[7].innerHTML = data.correo
    campos[9].innerHTML = data.telefono
    campos[10].id = data.direccion.id
    campos[11].innerHTML = data.direccion.tipoVia + ' ' + data.direccion.numeroVia + ' ' + data.direccion.letraVia + ' ' + data.direccion.sufijoCardinal
    campos[13].innerHTML = data.direccion.barrio
    campos[15].innerHTML = data.direccion.codigoPostal
    let ciudad = getCiudadById(data.direccion.ciudadId).then((response) => {
        campos[17].innerHTML = response.nombre
    })
    if (data.usuario == null) {
        document.querySelector('#infoUsuario').innerHTML = "No tiene usuario asignado"
    } else {
        campos[19].innerHTML = data.usuario.username
    }

    document.querySelector('.delete').setAttribute("data-id", data.id);
    document.querySelector('#btnEditarPaciente').setAttribute("data-id", data.id);
    console.log(data);
}


function eliminarPaciente() {
    let botonEliminar = document.querySelector('.delete');
    botonEliminar.addEventListener('click', (e) => {
        document.querySelector('.accion').classList.remove('d-none')
        document.querySelector('.accionEditar').classList.add('d-none')
        document.querySelector('.accionAsignar').classList.add('d-none')
        let eliminarConfirmacion = document.querySelector('.accion')
        eliminarConfirmacion.setAttribute("data-idDelete", e.target.dataset.id)
        confirmarEliminar();
        console.log(e.target.dataset.id);

    })
}
eliminarPaciente();
function confirmarEliminar() {
    let eliminarConfirmacion = document.querySelector('.accion')
    let infoPaciente = document.querySelector('.infoModal')
    document.querySelector('#labelModal').innerHTML = "Confirmar Eliminación"
    console.log(eliminarConfirmacion);
    getPacienteById(eliminarConfirmacion.dataset.iddelete).then((response) => {
        infoPaciente.innerHTML = `Desea eliminar al paciente ${response.nombre} con numero de identificación ${response.numIdentificacion}`
        eliminarConfirmacion.addEventListener('click', (e) => {
            deleteDataPaciente(e.target.dataset.iddelete).then((response) => console.log(response))
            window.location = 'mostrarPacientes.html'
        })
    })
}
editarModal();
function editarModal() {
    let btnEditar = document.querySelector('#btnEditarPaciente')
    btnEditar.addEventListener('click', (e) => {
        document.querySelector('.accionEditar').classList.remove('d-none')
        document.querySelector('.accion').classList.add('d-none')
        document.querySelector('.accionAsignar').classList.add('d-none')
        let confirmacion = document.querySelector('.accionEditar')
        let infoPaciente = document.querySelector('.infoModal')
        document.querySelector('#labelModal').innerHTML = "Editar Paciente"
        confirmacion.classList.remove("btn-danger")
        confirmacion.classList.remove("btn-success")
        confirmacion.classList.add("btn-warning")
        console.log(confirmacion.classList);
        infoPaciente.innerHTML =/*html*/`
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
                                <div class=" mb-3 col-md-6">
                                    <label for="correo" class="form-label">Correo</label>
                                    <input type="email" aria-label="First name" class="form-control" name="correo">
                                </div>
                                <div class=" mb-3 col-md-6">
                                    <label for="telefono" class="form-label">Telefono</label>
                                    <input type="text" aria-label="First name" class="form-control" name="telefono">
                                </div>
                                <div class="row">
                                <div class=" mb-3 col-md-4">
                                    <label for="selectPais" class="form-label">Pais</label>
                                    <select class="form-select" id="selectPais">
                                        <option value="0" selected>Seleccione una opcion</option>
                                    </select>
                                </div>
                                <div class=" mb-3 col-md-4">
                                    <label for="selectDepartamento" class="form-label">Departamento</label>
                                    <select class="form-select" id="selectDepartamento">
                                        <option value="0" selected>Seleccione una opcion</option>
                                    </select>
                                </div>
                    </form>
                    
                                <div class=" mb-3 col-md-4">
                                    <label for="selectCiudad" class="form-label">Ciudad</label>
                                    <select class="form-select" id="selectCiudad" name="ciudadId">
                                        <option value="0" selected>Seleccione una opcion</option>
                                        
                                    </select>
                                </div>
                                </div>
                            </div>
                            
                            <div class="row">
                            <form id="formDireccionPaciente">
                                <div class=" mb-3 col-md-12">
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
                                <div class="row">
                                <div class=" mb-3 col-md-6">
                                    <label for="barrio" class="form-label">Barrio</label>
                                    <input type="text" aria-label="First name" class="form-control" name="barrio">
                                </div>
                               
                                <div class=" mb-3 col-md-6">
                                    <label for="codigoPostal" class="form-label">Codigo Postal</label>
                                    <input type="text" aria-label="First name" class="form-control" name="codigoPostal">
                                </div>
                                </div>
                            </div>          
                    </form>                             
        `
        getDataPais().then((response) => { selectPais(response.registers) });
        getPacienteById(id).then((response) => fillModalEdit(response));
        eventoSelects();
    })

}

function fillModalEdit(data) {
    let myFrmDatosPersonales = document.querySelector('#formPaciente');
    let myFrmDatosDireccion = document.querySelector('#formDireccionPaciente');
    console.log(myFrmDatosPersonales);
    console.log(data);
    const { id, nombre, numIdentificacion, telefono, correo, ciudadId, fechaNacimiento, direccion } = data;
    console.log(new Date(Date.parse(fechaNacimiento)));
    let frm = new FormData(myFrmDatosPersonales);
    frm.set("numIdentificacion", numIdentificacion);
    frm.set("nombre", nombre);
    frm.set("telefono", telefono);
    frm.set("correo", correo);
    frm.set("fechaNacimiento", fechaNacimiento.substring(0, 10));
    for (let pair of frm.entries()) {
        myFrmDatosPersonales.elements[pair[0]].value = pair[1];
    }
    let dept = 0;
    let ciudad = getCiudadById(data.direccion.ciudadId).then((response) => {
        getDepartamentoById(response.idDepartamento).then((response) => {
            dept = response.id;
            document.querySelector('#selectPais').value = response.paisId
            getPaisById(response.paisId).then((response) => {
                selectLlenado(response.departamentos, '#selectDepartamento');
                document.querySelector('#selectDepartamento').value = dept
            })
            selectLlenado(response.ciudades, '#selectCiudad');
            document.querySelector('#selectCiudad').value = data.direccion.ciudadId
        })
    })

    let frmDireccion = new FormData(myFrmDatosDireccion);
    frmDireccion.set("barrio", direccion.barrio);
    frmDireccion.set("codigoPostal", direccion.codigoPostal);
    frmDireccion.set("tipoVia", direccion.tipoVia);
    frmDireccion.set("numeroVia", direccion.numeroVia);
    frmDireccion.set("letraVia", direccion.letraVia);
    frmDireccion.set("sufijoCardinal", direccion.sufijoCardinal);
    for (let pair of frmDireccion.entries()) {
        myFrmDatosDireccion.elements[pair[0]].value = pair[1];
    }

    document.querySelector('.accionEditar').addEventListener('click', (e) => {
        let campos = document.querySelectorAll('p');
        let dataPersonal = Object.fromEntries(new FormData(myFrmDatosPersonales));
        let dataDireccion = Object.fromEntries(new FormData(myFrmDatosDireccion));
        dataDireccion.ciudadId = document.querySelector("#selectCiudad").value;
        dataDireccion.id = campos[10].id
        dataPersonal.Direccion = dataDireccion;
        putDataPaciente(dataPersonal, id).then((response) => console.log(response))
        location.reload()
    })
}

asignarUsuario();

function asignarUsuario() {
    let btnUsuario = document.querySelector('#btnUsuarioPaciente')
  
    btnUsuario.addEventListener('click', (e) => {
        document.querySelector('.accionEditar').classList.add('d-none')
        document.querySelector('.accion').classList.add('d-none')
        document.querySelector('.accionAsignar').classList.remove('d-none')
        let confirmacion = document.querySelector('.accionAsignar')
        let infoPaciente = document.querySelector('.infoModal')
        document.querySelector('#labelModal').innerHTML = "Asignar Usuario"
        confirmacion.innerHTML = "Asignar"
        confirmacion.classList.remove("btn-danger")
        confirmacion.classList.remove("btn-warning")
        confirmacion.classList.add("btn-success")
        console.log(confirmacion.classList);
        infoPaciente.innerHTML =/*html*/`
        <form id="formUsuario">
        <label for="numIdentificacion" class="form-label">Coreo</label>
        <input type="text" aria-label="First name" class="form-control" name="email">
        <label for="numIdentificacion" class="form-label">Usuario</label>
        <input type="text" aria-label="First name" class="form-control" name="username">
        <label for="numIdentificacion" class="form-label">Contraseña</label>
        <input type="text" aria-label="First name" class="form-control" name="password">
        </form>                             
        `

        document.querySelector('.accionAsignar').addEventListener('click', (e) => {
            let dataUsuario = Object.fromEntries(new FormData(document.querySelector('#formUsuario')));
            console.log(id);
            registerPaciente(dataUsuario, id).then((response) => {
                console.log(response);
                location.reload();
            })
            
        })
  
        /* getDataPais().then((response) => { selectPais(response.registers) });
        getPacienteById(id).then((response) => fillModalEdit(response));
        eventoSelects(); */
    })

}


/* function accionBD(){
    let btnAccion=document.querySelector('.accion')
    btnAccion.addEventListener('click',(e)=>{
        if(e.innerHTML=="Eliminar"){
            accionEliminar();
        }else{
            accionEditar();
        }
    })
}

function accionEliminar(){
    deleteDataPaciente(id).then((response)=>{
        console.log(response);
    })
}

function accionEliminar(){
    deleteDataPaciente(id).then((response)=>{
        console.log(response);
    })
} */


function eventoSelects() {
    let selectPais = document.querySelector('#selectPais');
    let selectDepartamento = document.querySelector('#selectDepartamento');
    let selectCiudad = document.querySelector('#selectCiudad');
    selectPais.addEventListener('change', (e) => {
        selectCiudad.innerHTML = '<option value="0" selected>Seleccione una opcion</option>'
        getPaisById(e.target.value)
            .then((response) => { cambioSelects(response) });
    })
}

function cambioSelects(data) {
    selectLlenado(data.departamentos, '#selectDepartamento')
    let selectDepartamento = document.querySelector('#selectDepartamento');
    selectDepartamento.addEventListener('change', (e) => {
        getDepartamentoById(e.target.value)
            .then((response) => { selectLlenado(response.ciudades, '#selectCiudad') });
    })
}

function selectLlenado(data, selectID) {
    console.log(data);
    let select = document.querySelector(selectID);
    select.innerHTML = '';
    const itemStart = document.createElement('option');
    itemStart.innerHTML = 'Seleccione una opcion'
    itemStart.selected;
    select.appendChild(itemStart);

    data.forEach(element => {
        const item = document.createElement('option');
        item.value = element.id;
        item.innerHTML = element.nombre;
        select.appendChild(item);
    });
}

function selectPais(data) {
    let select = document.querySelector('#selectPais');
    select.innerHTML = '';
    const itemStart = document.createElement('option');
    itemStart.innerHTML = 'Seleccione una opcion'
    itemStart.selected;
    select.appendChild(itemStart);

    data.forEach(element => {
        const item = document.createElement('option');
        item.value = element.id;
        item.innerHTML = element.nombre;
        select.appendChild(item);
    });
}


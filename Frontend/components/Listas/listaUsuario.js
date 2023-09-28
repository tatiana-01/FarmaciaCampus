import { FrmUsuario } from "../Forms/frmUsuario.js";
import { getUsuario, getByIdUsuario, putUsuario, deleteUsuario } from "../../Apis/ApiFarmacia/usuario-serviceApi.js";
export { ListaUsuario };

let codId = 0;
class ListaUsuario extends HTMLElement {
    constructor() {
        super();
        this.listaUsuario();
        this.obtenerDatosUsuarios();
        this.guardarDatosUsuarios();


    }
    listaUsuario() {
        this.innerHTML = /* html */ `
            <div>
                <h2 class="text-center mt-3">Lista de los Usuarios Registrados</h2>
                <table class="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <!--<th scope="col">Password</th>-->
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="cuerpoTablaUsuario">

                    </tbody>
                </table>
            </div>
            <!--aqui va el modal-->
            <!-- Modal -->
            <div class="modal fade" id="formularioUsuario1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar datos del Usuarior</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card-body text-center">

                                <frm-usuario-farmacia><frm-usuario-farmacia>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal para ver mas informacion-->
        <div>
            <!-- Modal -->
            <div class="modal fade" id="informacionUsuario1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">++ Roles asociados a los Usuario ++</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card">
                                <div class="card-header">
                                    <h2 class="text-center">++ Roles ++</h2>
                                </div>
                                <div class="card-body text-center">
                                    <div class="content mx-auto" style="width: 90%">
                                        <!-- INFO ROLES USUARIOS -->
                                        <div class="row">
                                            <h3>Tipos de Roles que tiene dentro de la App:</h3>
                                            <hr>
                                            <div class="col-12 col-md-6">
                                                <div class="card bg-secondary-subtle">
                                                    <!-- <img src="../../images/" class="card-img-top" > -->
                                                    <div class="card-body">                            
                                                        <h5 class="card-title">Roles Asignados:</h5>
                                                        <hr>
                                                        <div>
                                                            <table class="table table-success table-striped">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Id Rol</th>
                                                                        <th scope="col">Nombre Tipo Rol</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="cuerpoTablaRol">

                                                                </tbody>
                                                            </table>
                                                        </div>                               
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `;

    }

    //------listamos los usuarios---..
    obtenerDatosUsuarios = () => {
        getUsuario()
            .then((data) => {
                console.log(data);
                this.mostrarDatosUsarios(data);
            });
    }

    //----------cargamos los datos de los usuarios en la tabla---------
    mostrarDatosUsarios = (datosUsuarios) => {
        const cuerpoTablaUsuario = document.querySelector("#cuerpoTablaUsuario");
        datosUsuarios.forEach(usuario => {
            const crearFilas = document.createElement('tr');
            crearFilas.innerHTML = /* html */ `
                <td>${usuario.id}</td>
                <td>${usuario.username}</td>
                <td>${usuario.email}</td>
                <!--<td>{usuario.password}</td>-->
                <td>
                    <button type="button" class="btn btn-info infoRolUsuario" data-bs-toggle="modal" data-bs-target="#informacionUsuario1" id="${usuario.id}">MÁS INFO+</button>
                </td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-success editarUsuario" data-bs-toggle="modal" data-bs-target="#formularioUsuario1" id="${usuario.id}">EDITAR</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger eliminarUsuario" id="${usuario.id}">ELIMINAR</button>
                </td>
            `;
            cuerpoTablaUsuario.appendChild(crearFilas);
        });
        
        this.obtenerDatoEditar();
        this.eliminarUsuariorRegistrado();
        this.obtenerDatoUsuarioEditar();
    }

    //funcion para buscar el datos del proveedor a editar
    obtenerDatoEditar = () => {
        document.querySelectorAll('.editarUsuario').forEach((botonEdit) => {
            botonEdit.addEventListener('click', (e) => {
                let codigoId = e.target.id;

                getByIdUsuario(codigoId)
                    .then((data) => {
                        console.log(data);
                        codId = data.id;
                        let roles = data.roles;
                        //funcionpara llenar el modal
                        this.llenarModalDatosUsuario(data)
                        this.mostraMasInformacionUsuarios(roles)
                    })
            });
        });
    }

    //funcion para llenar el modal 
    llenarModalDatosUsuario = (datosUsuarios) => {
        const frmDatosUsuario = document.querySelector('#frmDatosUsuario');
        //desestructuramos los datos del formuario
        const {username, email, password } = datosUsuarios;
    
        const frm = new FormData(frmDatosUsuario);
        frm.set("username", username);
        frm.set("email", email);
        frm.set("password", password);
        
        //recorremos el arreglo
        for (let dato of frm.entries()) {

            frmDatosUsuario.elements[dato[0]].value = dato[1];     
        } 
    }

    //metodo para guardar la informacion en la base de datos
    guardarDatosUsuarios = () => {
        document.querySelector('.botonn3').addEventListener('click', (e) => {
            const frmDatosUsuario = document.querySelector('#frmDatosUsuario');
            const data = Object.fromEntries(new FormData(frmDatosUsuario).entries());
            console.log(data);
            console.log(codId);

            putUsuario(data, codId); //METODO PUT EDITAR DATOS 
            alert("El Usuario fue editado exitosamente");
            window.location.reload();

            e.preventDefault();

        })
    }

    eliminarUsuariorRegistrado = () => {
        document.querySelectorAll('.eliminarUsuario').forEach((eliminarUsuario) => {
            eliminarUsuario.addEventListener('click', (e) => {
                let codeId = e.target.id;
                
                let confimar = window.confirm("Esta seguro que desea Eliminar su Usuario de la base de datos");

                if (confimar == true) {

                    deleteUsuario(codeId); //METODO PARA ELIMINAR UN REGISTRO
                    
                    alert("El Usuario fue eliminado exitosamente");
                    window.location.reload();

                } else {

                    alert("El Usuario no fue eliminado")
                }
                
                e.preventDefault();
            });
        });
    }

    //funcion para buscar el datos por Id de Usuario
    obtenerDatoUsuarioEditar = () => {
        document.querySelectorAll('.infoRolUsuario').forEach((botonInfo) => {
            botonInfo.addEventListener('click', (e) => {
                let codigoId = e.target.id;

                getByIdUsuario(codigoId)
                    .then((data) => {
                        console.log(data);
                        let roles = data.roles;
                        this.mostraMasInformacionUsuarios(roles)
                    })
            });
        });
    }

    //metodo para llenar el modal de mas infirmacion
    mostraMasInformacionUsuarios = (datosroles) => {
        const cuerpoTablaRol = document.querySelector('#cuerpoTablaRol');
        if (datosroles != null) {

            datosroles.forEach(itemRol => {
                const crearFila = document.createElement('tr');
                crearFila.innerHTML = /* html */ `
                    <td>${itemRol.id}</td>
                    <td>${itemRol.nombre}</td>
                `;
                cuerpoTablaRol.appendChild(crearFila);
            });

        } else {

            const crearFila = document.createElement('tr');
            crearFila.innerHTML = /* html */ `
                <td>0</td>
                <td>Rol no Asignado</td>
            `;
            cuerpoTablaRol.appendChild(crearFila);
        }
        
    }
}
customElements.define('list-usuario-farmaci', ListaUsuario);
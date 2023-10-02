import { getProveedor, getByIdProveedor, getDataCiudad, putProveedor, deleteProveedor, getCiudadById } from '../../Apis/ApiFarmacia/proveedor-serviceApi.js';
export { ListaProveedor };

let codId = 0;
class ListaProveedor extends HTMLElement {
    constructor() {
        super();
        this.listaProve();
        this.lsitarCiudades();
        this.listarDatosProveedor();
        this.guardarDatosProveedores();
    }
    listaProve(){
        this.innerHTML = /* html */ `
            <div>
                <h2 class="text-center mt-3">Lista de los Proveedores</h2>
                <table class="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="cuerpoTablaProveedor">


                    </tbody>
                </table>
            </div>
            <div>
                <!-- Modal -->
                <div class="modal fade" id="formularioProveedor1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar datos del Proveedor</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-header">
                                        <h2 class="text-center">Editar Proveedor</h2>
                                    </div>
                                    <div class="card-body text-center">
                                        <form id="frmDatosProveedor1">
                                            <div class="container">
                                                <h5>Información Personal:</h5>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="mb-3">
                                                            <label for="nombre" class="form-label">Nombre Proveedor:*</label>
                                                            <input type="text" class="form-control" id="nombre" name="nombre"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="mb-3">
                                                            <label for="numIdentificacion" class="form-label">Numero de Identificación:*</label>
                                                            <input type="number" class="form-control" id="numIdentificacion" name="numIdentificacion" min="0"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="mb-3">
                                                            <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento:*</label>
                                                            <input type="date" class="form-control" id="fechaNacimiento"
                                                            name="fechaNacimiento"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5>Información de contacto:</h5>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="mb-3">
                                                            <label for="correo" class="form-label">Correo electronico:*</label>
                                                            <input type="email" class="form-control" id="correo" name="correo"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="mb-3">
                                                            <label for="telefono" class="form-label">Numero de Telefono:*</label>
                                                            <input type="text" class="form-control" id="telefono" name="telefono"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="mb-3">
                                                            <label for="pais" class="form-label">Pais:*</label>
                                                            <select class="form-select form-select-lg mb-3" id="pais">
                                                                <option selected>Paises</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="mb-3">
                                                            <label for="departamento" class="form-label">Departamento:*</label>
                                                            <select class="form-select form-select-lg mb-3" id="departamento">
                                                                <option selected>Departamentos</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="mb-3">
                                                            <label for="ciudad" class="form-label">Ciudad:*</label>
                                                            <select class="form-select form-select-lg mb-3" id="ciudad" name="ciudadId">
                                                                <option selected>Ciudades</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <label>Dirección:*</label>
                                                    <div class="col-2">
                                                        <div class="mb-3">
                                                            <label for="tipoVia" class="form-label">Tipo Via:</label>
                                                            <input type="text" aria-label="First name" class="form-control" id="TipoVia" name="tipoVia" placeholder="Tipo via"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-2">
                                                        <div class="mb-3">
                                                            <label for="numeroVia" class="form-label">Numero:</label>
                                                            <input type="text" aria-label="First name" class="form-control" id="numeroVia" name="numeroVia" placeholder="Numero"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-2">
                                                        <div class="mb-3">
                                                            <label for="letraVia" class="form-label">Letra:</label>
                                                            <input type="text" aria-label="First name" class="form-control" id="letraVia" name="letraVia" placeholder="Letra"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-2">
                                                        <div class="mb-3">
                                                            <label for="sufijoCardinal" class="form-label">Sufijo Cardinal:</label>
                                                            <input type="text" aria-label="First name" class="form-control" id="sufijoCardinal" name="sufijoCardinal" placeholder="Sufijo Cardinal"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-2">
                                                        <div class="mb-3">
                                                            <label for="barrio" class="form-label">Barrio:</label>
                                                            <input type="text" class="form-control" id="barrio"
                                                            name="barrio"/>
                                                        </div>  
                                                    </div>
                                                    <div class="col-2">
                                                        <div class="mb-3">
                                                            <label for="codigoPostal" class="form-label">Cod Postal:</label>
                                                            <input type="text" class="form-control" id="codigoPostal"
                                                            name="codigoPostal"/>
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="container text-center">
                                                <button type="submit" class="btn btn-success botonn2">GUARDAR PROVEEDOR</button>
                                            </div>
                                        </form>
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
            <!--Modal para ver mas informacion-->
            <div>
                <!-- Modal -->
                <div class="modal fade" id="informacionProveedor1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Mas información sobre Proveedor</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-header">
                                        <h2 class="text-center">Proveedor</h2>
                                    </div>
                                    <div class="card-body text-center">
                                        <div class="content mx-auto" style="width: 90%">
                                            <!-- INFO PROVEEDOR -->
                                            <div class="row">
                                                <h3>Informacion Básica:</h3>
                                                <hr>
                                                <div class="col-12 col-md-6">
                                                    <div class="card bg-secondary-subtle">
                                                        <!-- <img src="../../images/" class="card-img-top" > -->
                                                        <div class="card-body">                            
                                                            <h5 class="card-title">Datos Personales:</h5>
                                                            <hr>
                                                            <div class="card-text contenido">
                                                                <p class="fw-bold m-0">Numero de Indetificación:</p>
                                                                <p class="numIdentificacion datoPersonal">**</p>
                                                                <p class="fw-bold m-0">Nombre:</p>
                                                                <p class="nombre datoPersonal">**</p>                 
                                                                <p class="fw-bold m-0">Fecha de nacimiento:</p>
                                                                <p class="fechaNacimiento datoPersonal">**</p> 
                                                                <p class="fw-bold m-0">Email:</p>
                                                                <p class="correo datoPersonal">**</p>                        
                                                                <p class="fw-bold m-0">Telefono:</p>
                                                                <p class="telefono datoPersonal">**</p>                                                                  
                                                            </div>                                
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <div class="card bg-secondary-subtle">
                                                        <!-- <img src="../../images/" class="card-img-top" > -->
                                                        <div class="card-body">
                                                        <h5 class="card-title">Datos de Contacto</h5>
                                                        <hr>
                                                        <div class="card-text contenido">                                     
                                                            <p class="fw-bold m-0">Direccion:</p>
                                                            <p class="direccion datoContacto">**</p>
                                                            <p class="fw-bold m-0">Barrio:</p>
                                                            <p class="barrio datoContacto">**</p>
                                                            <p class="fw-bold m-0">codigo Postal:</p>
                                                            <p class="codigoPostal datoContacto">**</p>
                                                            <p class="fw-bold m-0">Ciudad:</p>
                                                            <p class="ciudad datoContacto">**</p>                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card bg-secondary-subtle mt-2" id="usuarioPaciente" >
                                                    <!-- <img src="../../images/" class="card-img-top" > -->
                                                    <div class="card-body">
                                                    <h5 class="card-title" >Datos de Usuario</h5>
                                                    <hr>
                                                        <div class="card-text contenido">                                    
                                                            <p class="fw-bold m-0">Username:</p>
                                                            <p class="usuario datoUsuario">**</p> 
                                                            <p class="fw-bold m-0">Email:</p>
                                                            <p class="email datoUsuario">**</p>                                         
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

    //----listar los datos del provvedor---------------
    listarDatosProveedor = () => {
        getProveedor()
            .then((data) => {
                console.log(data.result)
                this.mostrarDatosProveedor(data.result)
            })
    }

    //--------listar los ciudades de nuevo------------
    lsitarCiudades = () => {
        getDataCiudad()
            .then((data) => {
                this.cargarCiudades(data.registers);
            })
    }

    cargarCiudades(datoCiudad) {
        document.querySelectorAll('#ciudad').forEach((itemCiudad) => {
            datoCiudad.forEach(ciudad => {
                const item = document.createElement('option');
                item.value = ciudad.id;
                item.innerHTML = ciudad.nombre;
                itemCiudad.appendChild(item);
            });
        });
    }

    //-----funcion para llenar la tabla de proveedores---------------------------------- 
    mostrarDatosProveedor = (datosProveedor) => {
        const cuerpoTablaProveedor = document.querySelector("#cuerpoTablaProveedor");
        datosProveedor.forEach(proveedor => {
            const crearFilas = document.createElement('tr');
            crearFilas.innerHTML = /* html */ `
                <td>${proveedor.id}</td>
                <td>${proveedor.nombre}</td>
                <td>${proveedor.correo}</td>
                <td>${proveedor.telefono}</td>
                <td>
                    <button type="button" class="btn btn-info infoProveedor" data-bs-toggle="modal" data-bs-target="#informacionProveedor1" id="${proveedor.id}">MÁS INFO+</button>
                </td>
                <td>
                    <button type="button" class="btn btn-warning regUsuarioProveedor" id="${proveedor.id}">REG SU USUARIO</button>
                </td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-success editarProveedor" data-bs-toggle="modal" data-bs-target="#formularioProveedor1" id="${proveedor.id}">EDITAR</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger eliminarProveedor" id="${proveedor.id}">ELIMINAR</button>
                </td>
            `;
            cuerpoTablaProveedor.appendChild(crearFilas);
        });

        this.regUsuarioProvvedor();
        this.eliminarProveedorr();
        this.obtenerDatoEditar();
        this.obtenerMasInformacionProveedor();
    }

    //funcio para el registro del usuario y redireccioar a otra pagina
    regUsuarioProvvedor = () => {
        document.querySelectorAll('.regUsuarioProveedor').forEach((itemUsuario) => {
            itemUsuario.addEventListener('click', (e) => {
                let idCod = e.target.id;
                getByIdProveedor(idCod)
                    .then((data) => {
                        let usuario = data.usuario;
                        console.log(usuario);
                        //funcionpara llenar el modal
                        this.verificarUsuario(usuario, idCod);
                    })
                
            });
        });
    }

    //funcion para verificar si el ususrio esta o no registrado
    verificarUsuario = (datos, idCod) => {
        if (datos == null) {
            window.location = `registrarSuUsuarioProve.html?idCod=${idCod}`;
        } else {

            alert("Usted ya posee un Usuario y Contraseña a su nombre");
        }
    }

    //funcion para buscar el datos del proveedor a editar
    obtenerDatoEditar = () => {
        document.querySelectorAll('.editarProveedor').forEach((botonEdit) => {
            botonEdit.addEventListener('click', (e) => {
                let codigoId = e.target.id;

                getByIdProveedor(codigoId)
                    .then((data) => {
                        console.log(data);
                        let direccion = data.direccion;
                        codId = data.id;
                        //funcionpara llenar el modal
                        this.llenarModalDatosProveedor(data, direccion)
                    })
            });
        });
    }

    llenarModalDatosProveedor = (datosProveedor, direccion) => {
        const frmDatosProveedor1 = document.querySelector('#frmDatosProveedor1');
        //desestructuramos los datos del formuario
        const {numIdentificacion, nombre, fechaNacimiento, correo, telefono } = datosProveedor;
        const {tipoVia, numeroVia, letraVia, sufijoCardinal, barrio, ciudadId, codigoPostal } = direccion

        const frm = new FormData(frmDatosProveedor1);
        frm.set("numIdentificacion", numIdentificacion);
        frm.set("nombre", nombre);
        frm.set("correo", correo);
        frm.set("telefono", telefono);
        frm.set("tipoVia", tipoVia);
        frm.set("numeroVia", numeroVia);
        frm.set("letraVia", letraVia);
        frm.set("sufijoCardinal", sufijoCardinal);
        frm.set("barrio", barrio);
        frm.set("ciudadId", ciudadId);
        frm.set("codigoPostal", codigoPostal);

        //recorremos el arreglo
        for (let dato of frm.entries()) {

            frmDatosProveedor1.elements[dato[0]].value = dato[1];
            
        }
        frmDatosProveedor1.elements["fechaNacimiento"].value = fechaNacimiento.slice(0, -9);

    }

    //--------funcion para guardar los nuevos datos editados 
    guardarDatosProveedores = () => {  
        document.querySelector('.botonn2').addEventListener('click', (e) => {
            const frmDatosProveedor1 = document.querySelector('#frmDatosProveedor1');
            const datosFrm = Object.fromEntries(new FormData(frmDatosProveedor1).entries());

            let data = 
            {
                "numIdentificacion": datosFrm.numIdentificacion,
                "nombre": datosFrm.nombre,
                "fechaNacimiento": datosFrm.fechaNacimiento,
                "correo": datosFrm.correo,
                "telefono": datosFrm.telefono,
                "direccion": {
                    "tipoVia": datosFrm.tipoVia,
                    "numeroVia": datosFrm.numeroVia,
                    "letraVia": datosFrm.letraVia,
                    "sufijoCardinal": datosFrm.sufijoCardinal,
                    "barrio": datosFrm.barrio,
                    "ciudadId": datosFrm.ciudadId,
                    "codigoPostal": datosFrm.codigoPostal
                }
            };
            console.log(data);
            putProveedor(data, codId); //METODO PUT EDITAR PROVEEDOR
            alert("El proveedor fue editado exitosamente");
            window.location.reload();

            e.preventDefault();
        });
        
    }

    //funcion para eliminar un Proveedor de la base de datos 
    eliminarProveedorr = () => {
        document.querySelectorAll('.eliminarProveedor').forEach((eliminar) => {
            eliminar.addEventListener('click', (e) => {
                let codeId = e.target.id;

                let confimar = window.confirm("Esta seguro que desea Eliminar al proveedor de la base de datos");

                if (confimar == true) {

                    deleteProveedor(codeId); //DELETE PARA PROVEEDOR
                    
                    alert("El provvedor fue eliminado exitosamente");
                    window.location.reload();

                } else {

                    alert("El proveedor no fue eliminado")
                }
                
                e.preventDefault();
            });
        });
    }

    //funcion para mostra mas informacion del proveedor
    obtenerMasInformacionProveedor = () => {
        document.querySelectorAll('.infoProveedor').forEach((infoProve) => {
            infoProve.addEventListener('click', (e) => {
                let codesId = e.target.id;

                getByIdProveedor(codesId)
                    .then((data) => {
                        console.log("hola");
                        console.log(data);
                        let direccion = data.direccion;
                        let usuario = data.usuario;
                        codId = data.id;
                        //funcionpara llenar el modal de la informacion
                        this.llenarModalInformacionProveedor(data, direccion, usuario)
                    })

            });
        });
    }

    //funcion para llenar el modal de mas información
    llenarModalInformacionProveedor = (datosProveedor, direccion, usuario) => {
        let datoPersonal = document.querySelectorAll('.datoPersonal');
        let datoContacto = document.querySelectorAll('.datoContacto');
        let datoUsuario = document.querySelectorAll('.datoUsuario');
        //desestructuramos los datos del formuario
        const {numIdentificacion, nombre, fechaNacimiento, correo, telefono } = datosProveedor;
        const {tipoVia, numeroVia, letraVia, sufijoCardinal, barrio, ciudadId, codigoPostal } = direccion;

        datoPersonal[0].innerHTML = numIdentificacion;
        datoPersonal[1].innerHTML = nombre;
        datoPersonal[2].innerHTML = fechaNacimiento.slice(0, -9);
        datoPersonal[3].innerHTML = correo;
        datoPersonal[4].innerHTML = telefono;

        datoContacto[0].innerHTML = tipoVia +' '+ numeroVia + letraVia +' '+'#'+sufijoCardinal;
        datoContacto[1].innerHTML = barrio;
        datoContacto[2].innerHTML = codigoPostal;
        getCiudadById(ciudadId)
            .then((data) => {
                datoContacto[3].innerHTML = data.nombre;
            });
        
        if (usuario == null) {
            datoUsuario[0].innerHTML = "No tiene un usuario asignado";
            datoUsuario[1].innerHTML = "No tiene un email asignado";
        } else {
            const {email, username } = usuario;
            datoUsuario[0].innerHTML = username;
            datoUsuario[1].innerHTML = email;
        }
        
    }


}
customElements.define('ver-lista-proveedor', ListaProveedor);
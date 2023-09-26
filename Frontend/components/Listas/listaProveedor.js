import { getProveedor } from '../../Apis/ApiFarmacia/proveedor-serviceApi.js';
export { ListaProveedor };

class ListaProveedor extends HTMLElement {
    constructor() {
        super();
        this.listaProve();
        this.listarDatosProveedor();
    }
    listaProve(){
        this.innerHTML = /* html */ `
            <div>
                <h2 class="text-center">Lista de los Proveedores</h2>
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Num Identificación</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha Nacimiento</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">DireccionId</th>
                            <th scope="col">UsuarioId</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="cuerpoTablaProveedor">


                    </tbody>
                </table>
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

    //-----funcion para llenar la tabla de proveedores---------------------------------- 
    mostrarDatosProveedor = (datosProveedor) => {
        const cuerpoTablaProveedor = document.querySelector("#cuerpoTablaProveedor");
        datosProveedor.forEach(proveedor => {
            const crearFilas = document.createElement('tr');
            crearFilas.innerHTML = /* html */ `
                <td>${proveedor.id}</td>
                <td>${proveedor.numIdentificacion}</td>
                <td>${proveedor.nombre}</td>
                <td>${proveedor.fechaNacimiento}</td>
                <td>${proveedor.correo}</td>
                <td>${proveedor.telefono}</td>
                <td>${proveedor.direccion}</td>
                <td>${proveedor.usuario}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-warning editarCamper" data-bs-toggle="modal" data-bs-target="#formularioReclutas1" id="${proveedor.id}">Editar</button>
                </td>
                <td>
                    <button type="button" class="btn btn-info eliminarCamper" id="${proveedor.id}">Eliminar</button>
                </td>
            `;
            cuerpoTablaProveedor.appendChild(crearFilas);
        });

    }



}
customElements.define('ver-lista-proveedor', ListaProveedor);
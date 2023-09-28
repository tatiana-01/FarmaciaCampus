import { postProveedor } from "../../Apis/ApiFarmacia/proveedor-serviceApi.js";
export { FrmProveedor };

class FrmProveedor extends HTMLElement {
    constructor() {
        super();
        this.formulario();
        this.obtenerDatosFrmProveedores();

    }
    formulario() {
        this.innerHTML = /* html */ `
            <!--Forumulario-->
            <div class="container mt-3">
                <div class="card">
                    <div class="card-header">
                        <h4 class="text-center">Ingrese los datos del proveedor</h4>
                    </div>
                    <div class="card-body">
                        <form id="frmDatosProveedor">
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
                                <button type="reset" value="reset" class="btn btn-info botonn" id="nuevoProveedor" data-habilitardesabilitar='[["#guardarProveedor"], ["#nuevoProveedor"]]'>NUEVO PROVEEDOR</button>
                                <button disabled type="submit" class="btn btn-success botonn" id="guardarProveedor"
                                data-habilitardesabilitar='[["#nuevoProveedor"], ["#guardarProveedor"]]'>GUARDAR PROVEEDOR</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    //---metodo para enviar los datos a la base de datos

    obtenerDatosFrmProveedores = () => {
        const frmDatosProveedor = document.querySelector('#frmDatosProveedor'); //llamado del formulario 
        document.querySelector('#guardarProveedor').addEventListener('click', (e) => {
            const datosFrm = Object.fromEntries(new FormData(frmDatosProveedor).entries());
            let data = 
            [
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
                }
            ];
            console.log(data)
            postProveedor(data); //METODO POST 
            alert("El Proveedor fue registrado exitosamente")
            location.reload();

            e.preventDefault();
        });
    }
    
}
customElements.define('frm-reg-proveedor', FrmProveedor);
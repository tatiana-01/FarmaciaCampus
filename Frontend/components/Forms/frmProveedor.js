export { FrmProveedor };

class FrmProveedor extends HTMLElement {
    constructor() {
        super();
        this.formulario();
    }
    formulario() {
        this.innerHTML = /* html */ `
            <!--Forumulario-->
            <div class="container">
                <div class="card">
                    <div class="card-header">
                        <h4 class="text-center">Ingrese los datos del proveedor</h4>
                    </div>
                    <div class="card-body">
                        <form id="fromDatosProveedor">
                            <div class="container">
                                <h5>Información Personal:</h5>
                                <div class="row">
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="Nombre" class="form-label">Nombre Proveedor:*</label>
                                            <input type="text" class="form-control" id="Nombre" name="Nombre"/>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="NumIdentificacion" class="form-label">Numero de Identificación:*</label>
                                            <input type="number" class="form-control" id="NumIdentificacion" name="NumIdentificacion" min="0"/>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="FechaNacimiento" class="form-label">Fecha de Nacimiento:*</label>
                                            <input type="date" class="form-control" id="FechaNacimiento"
                                            name="FechaNacimiento"/>
                                        </div>
                                    </div>
                                </div>
                                <h5>Información de contacto:</h5>
                                <div class="row">
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="Correo" class="form-label">Correo electronico:*</label>
                                            <input type="email" class="form-control" id="Corre" name="Corre"/>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="Telefono" class="form-label">Numero de Telefono:*</label>
                                            <input type="text" class="form-control" id="Telefono" name="Telefono"/>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="UsuarioId" class="form-label">Ingrese su Id de su Usuario:*</label>
                                            <input type="number" class="form-control" id="UsuarioId"
                                            name="UsuarioId" min="0"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="Pais" class="form-label">Pais:*</label>
                                            <select class="form-select form-select-lg mb-3" id="Pais " name="Pais">
                                                <option selected>Paises</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="Departamento" class="form-label">Departamento:*</label>
                                            <select class="form-select form-select-lg mb-3" id="Departamento " name="Departamento">
                                                <option selected>Departamentos</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="Ciudad" class="form-label">Ciudad:*</label>
                                            <select class="form-select form-select-lg mb-3" id="Ciudad " name="Ciudad">
                                                <option selected>Ciudades</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label>Dirección:*</label>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="TipoVia" class="form-label">Tipo Via:</label>
                                            <input type="text" aria-label="First name" class="form-control" id="TipoVia" name="TipoVia" placeholder="Tipo via"/>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="NumeroVia" class="form-label">Numero:</label>
                                            <input type="text" aria-label="First name" class="form-control" id="NumeroVia" name="NumeroVia" placeholder="Numero"/>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="LetraVia" class="form-label">Letra:</label>
                                            <input type="text" aria-label="First name" class="form-control" id="LetraVia" name="LetraVia" placeholder="Letra"/>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="SufijoCardinal" class="form-label">Sufijo Cardinal:</label>
                                            <input type="text" aria-label="First name" class="form-control" id="SufijoCardinal" name="SufijoCardinal" placeholder="Sufijo Cardinal"/>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="Barrio" class="form-label">Barrio:</label>
                                            <input type="text" class="form-control" id="Barrio"
                                            name="Barrio"/>
                                        </div>  
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="CodigoPostal" class="form-label">Cod Postal:</label>
                                            <input type="text" class="form-control" id="CodigoPostal"
                                            name="CodigoPostal"/>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div class="container text-center">
                                <button type="reset" value="reset" class="btn btn-primary botonn" id="nuevoProveedor" data-habilitardesabilitar='[["#guardarProveedor"], ["#nuevoProveedor"]]'>NUEVO PROVEEDOR</button>
                                <button disabled type="submit" class="btn btn-success botonn" id="guardarProveedor"
                                data-habilitardesabilitar='[["#nuevoProveedor"], ["#guardarProveedor"]]'>GUARDAR PROVEEDOR</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }


}
customElements.define('frm-reg-proveedor', FrmProveedor);
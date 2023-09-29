export { FrmUsuario };
class FrmUsuario extends HTMLElement {
    constructor() {
        super();
        this.formulario();
    }
    formulario() {
        this.innerHTML = /* html */ `
            <!--Forumulario-->
            <div class="container mt-3 text-center">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Usuarios</h3>
                        <h4 class="text-center">Editar sus datos de Usuario</h4>
                    </div>
                    <div class="card-body">
                        <form id="frmDatosUsuario">
                            <div class="container">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="username" class="form-label">Nombre de Usuario:*</label>
                                            <input type="text" class="form-control" id="username" name="username" placeholder="username"/>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="email" class="form-label">Email:*</label>
                                            <input type="text" class="form-control" id="email" name="email" placeholder="email"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                       
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="password" class="form-label">Dijite la Contraseña:*</label>
                                            <input type="text" class="form-control" id="password" name="password" placeholder="password"/>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="container text-center">
                                <button type="button" class="btn btn-success botonn3">GUARDAR USUARIO</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

}
customElements.define('frm-usuario-farmacia', FrmUsuario);
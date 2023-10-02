import { postRegUsuarioProvee } from "../../Apis/ApiFarmacia/proveedor-serviceApi.js";
export { FrmUsuarioProveedor };

let params = new URL(document.location).searchParams;
let idCod = parseInt(params.get("idCod"));
console.log(idCod);

class FrmUsuarioProveedor extends HTMLElement {
    constructor() {
        super();
        this.formularioUsu();
        this.cargarDatosUsuarioProveedor();
    }
    formularioUsu() {
        this.innerHTML = /* html */ `
            <!--Forumulario-->
            <div class="container mt-3 text-center">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Proveedor</h3>
                        <h4 class="text-center">Registre sus datos de Usuario</h4>
                    </div>
                    <div class="card-body">
                        <form id="frmDatosUsuarioProveedor">
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
                                <button type="reset" value="reset" class="btn btn-info botonn" id="nuevoUserProveedor" data-habilitardesabilitar='[["#guardarUserProveedor"], ["#nuevoUserProveedor"]]'>NUEVO USUARIO</button>
                                <button disabled type="submit" class="btn btn-success botonn" id="guardarUserProveedor"
                                data-habilitardesabilitar='[["#nuevoUserProveedor"], ["#guardarUserProveedor"]]'>GUARDAR USUARIO</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    //funcion para enviar los datos de usuario a la base de datos 
    cargarDatosUsuarioProveedor = () => {
        document.querySelector('#guardarUserProveedor').addEventListener('click', (e) => {
            const frmDatosUsuarioProveedor = document.querySelector('#frmDatosUsuarioProveedor');
            const dato = Object.fromEntries(new FormData(frmDatosUsuarioProveedor).entries()); 
            console.log(dato);
           
            postRegUsuarioProvee(dato, idCod) //METODO POST ID (se envia los datos a la Db)
                .then((data) => {
                    console.log(data);
                }); 
            alert("Su Usuario fue registrado exitosamente");

            e.preventDefault();
        });
    }
}
customElements.define('frm-usuario-proveedor', FrmUsuarioProveedor);
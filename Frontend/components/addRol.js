import { postRol } from '../Apis/apiPaciente.js';
class FrmRol extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.postRolUser();
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="container mt-5" id="rolFrm">
        <div class="card">
            <div class="card-header">
                Asignar Rol a Usuario
            </div>
            <div class="card-body">
                <h5 class="card-title">Ingrese los datos del usuario</h5>
                <div class="container mb-3">
                    <form id="formRol">
                            <div class="mb-3 w-50">
                                <label for="nameRol" class="form-label">Usuario</label>
                                <input type="text" class="form-control" id="nameRol" name="username">
                            </div>
                            <div class="mb-3 w-50">
                                <label for="nameRol" class="form-label">Contraseña</label>
                                <input type="text" class="form-control" id="nameRol" name="password">
                            </div>
                            <div class="mb-3 w-50">
                                <label for="nameRol" class="form-label">Rol</label>
                                <input type="text" class="form-control" id="nameRol" name="role">
                            </div>
                            <div class="botonEnviar">
                                <button type="submit" class="btn enviar">Enviar</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`
    }

    postRolUser(){
        let btnEnviar=document.querySelector('.enviar')
        btnEnviar.addEventListener('click', (e)=>{
            let form=document.querySelector('#formRol')
            let data=Object.fromEntries(new FormData(form));
            postRol(data).then((response)=>console.log(response))
            e.preventDefault();
        })
    }
};
customElements.define('frm-rol-user', FrmRol);
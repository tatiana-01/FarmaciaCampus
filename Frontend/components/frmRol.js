import { getDataRol, postDataRol, putDataRol, deleteDataRol, getRolById } from '../Apis/apiRol.js';
class FrmRol extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.postRol();
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="container mt-5" id="rolFrm">
        <div class="card">
            <div class="card-header">
                Rol
            </div>
            <div class="card-body">
                <h5 class="card-title">Ingrese los datos del rol</h5>
                <div class="container mb-3">
                    <form id="formRol">
                            <div class="mb-3 w-50">
                                <label for="nameRol" class="form-label">Nombre del rol</label>
                                <input type="text" class="form-control" id="nameRol" name="nombre">
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

    postRol(){
        let btnEnviar=document.querySelector('.enviar')
        btnEnviar.addEventListener('click', (e)=>{
            let form=document.querySelector('#formRol')
            let data=Object.fromEntries(new FormData(form));
            postDataRol(data).then((response)=>console.log(response))
        })
    }
};
customElements.define('frm-rol', FrmRol);
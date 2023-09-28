class FrmRol extends HTMLElement {
    constructor() {
        super();
        this.render();
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
                                <input type="text" class="form-control" id="nameRol" name="nameRol">
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

};
customElements.define('frm-rol', FrmRol);
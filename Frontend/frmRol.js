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
                        <div class="form-group">
                            <div class="form-group mb-3 w-50">
                                <label class="form-group ">Nombre Rol</label>
                                <input type="text" aria-label="First name" class="form-control" name="name_city">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-info">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`
    }

};
customElements.define('frm-rol', FrmRol);
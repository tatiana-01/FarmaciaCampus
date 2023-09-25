class FrmPaciente extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="container mt-5" id="pacienteForm">
        <div class="card">
            <div class="card-header">
                Paciente
            </div>
            <div class="card-body">
                <h5 class="card-title">Ingrese los datos del paciente</h5>
                <div class="container mb-3">
                    <form id="formPaciente">
                        <div class="form-group">
                            <h5 class="card-title">Datos personales</h5>
                            <div class="row">
                                <div class="form-group mb-3 col-4">
                                    <label for="numeroIdentificacion" class="form-label">Numero de identificación</label>
                                    <input type="text" aria-label="First name" class="form-control" name="numeroIdentificacion">
                                </div>    
                                <div class="form-group mb-3 col-4">
                                    <label for="nombrePaciente" class="form-label">Nombre Paciente</label>
                                    <input type="text" aria-label="First name" class="form-control" name="nombrePaciente">
                                </div>
                                <div class="form-group mb-3 col-4">
                                    <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                                    <input type="date" aria-label="First name" class="form-control" name="fechaNacimiento">
                                </div>    
                            </div>
                            <h5 class="card-title">Datos de contacto</h5>
                            <div class="row">
                                <div class="form-group mb-3 col-4">
                                    <label for="correo" class="form-label">Correo</label>
                                    <input type="email" aria-label="First name" class="form-control" name="correo">
                                </div>
                                <div class="form-group mb-3 col-4">
                                    <label for="telefono" class="form-label">Telefono</label>
                                    <input type="text" aria-label="First name" class="form-control" name="telefono">
                                </div>
                                <div class="form-group mb-3 col-4">
                                    <label for="selectCiudad" class="form-label">Ciudad</label>
                                    <select class="custom-select" id="selectCiudad">
                                        <option value="0" selected>Seleccione una opcion</option>;
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group mb-3 col-5">
                                    <label for="direccion" class="form-label">Dirección</label>
                                    <input type="text" aria-label="First name" class="form-control" name="direccion">
                                </div>
                                <div class="form-group mb-3 col-4">
                                    <label for="barrio" class="form-label">Barrio</label>
                                    <input type="text" aria-label="First name" class="form-control" name="barrio">
                                </div>
                               
                                <div class="form-group mb-3 col-3">
                                    <label for="codigoPostal" class="form-label">Codigo Postal</label>
                                    <input type="text" aria-label="First name" class="form-control" name="codigoPostal">
                                </div>
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
customElements.define('frm-paciente', FrmPaciente);
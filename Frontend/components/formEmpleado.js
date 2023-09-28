class FormularioEmpleado extends HTMLElement{

    connectedCallback(){
        this.innerHTML = `<div class="container w-50">

        <form action="../controllers/registrarTrainer.php?id_rol=2" method="POST">
            <div class="row bg-light p-1">
                <div class="mb-2 col-sm-6 col-md-6">
                    <select class="form-select" aria-label="Default select example" id="tipo-sangre" name="tipo_id">
                        <option selected>Tipo de Documento</option>
                        <option value="CE">Cedula de extranjeria</option>
                        <option value="CC">Cedula de ciudadania</option>
                    </select>
                </div>
                <div class="mb-2 col-sm-6 col-md-6 ">
                    <input type="text" placeholder="Numero de Documento" name="NumIdentificacion " class="form-control"
                        required>
                </div>
            </div>
            <div class="row bg-light p-1">
                <div class="col-sm-12 col-md-6">
                    <label for="birthday" class="form-label"> Fecha de Nacimineto*</label>
                    <input type="date" class="form-control" id="birthday" name="FechaNacimiento ">
                </div>

            </div>
            <div class=" row bg-light p-1">
                <div class=" col-sm-12 col-md-6 ">
                    <label for="nombres" class="form-label"> Nombres *</label>
                    <input type="text" class="form-control" id="nombres" name="nombres" required>
                </div>
                <div class=" col-sm-12 col-md-6">
                    <label for="apellidos" class="form-label">Apellidos *</label>
                    <input type="text" class="form-control" id="apellidos" name="apellidos" required>
                </div>
            </div>
            <div class="">
                <h5 class="mt-2">Informacion de Contacto</h5>
                <hr>
                <div class="bg-light p-1">
                    <div class="row bg-light p-1">
                        <div class=" mb-2 col-sm-12 col-md-12">
                            <select class="form-select" aria-label="Default select example" id="pais" name="pais">
                                <option selected>Pais de Origen</option>
                                <option value="1">Colombia</option>
                            </select>
                        </div>
                        <div class=" mb-2 col-sm-6 col-md-6">

                            <select class="form-select" aria-label="Default select example" id="region" name="region">
                                <option selected>Region</option>
                                <option value="1">Santander</option>
                            </select>
                        </div>
                        <div class=" mb-2 col-sm-6 col-md-6">
                            <select class="form-select" aria-label="Default select example" id="ciudad" name="ciudad"
                                required>
                                <option selected>Ciudad</option>

                            </select>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" id="barrio" name="barrio" placeholder="Barrio" required>

                        </div>
                    </div>
                    <div class="row  mt-1">
                        <label>Direccion</label>
                        <div class=" mb-2 col-sm-3">
                            <input type="text" class="form-control" id="direccion" placeholder="Via*" name="TipoVia "
                                required>
                        </div>
                        <div class=" mb-2 col-sm-3">
                            <input type="number" class="form-control" id="direccion" placeholder="Numero*" name="NumeroVia "
                                min="1" required>
                        </div>
                        <div class=" mb-2 col-sm-3">
                            <input type="text" class="form-control" id="direccion" placeholder="Letra*" name="LetraVia "
                                required>
                        </div>
                        <div class=" mb-2 col-sm-3">
                            <input type="text" class="form-control" id="direccion" placeholder="Sufijo*" name="SufijoCardinal "
                                required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="mb-2 col-sm-12">
                            <input type="email" class="form-control" id="emailcamper"
                                placeholder="Email: pepe@gmail.com" required name="email" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-2 col-sm-12 col-md-12">
                            <input type="text" class="form-control" id="telefono" required
                                placeholder="Telefono Personal" name="telefono" required>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <h5 class="mt-2">Informacion Medica</h5>
                <hr>
                <div class="row bg-light p-1">
                    <div class="mb-2 col-sm-6 col-md-6">
                        <select class="form-select" aria-label="Default select example" id="arl" name="arl" required>
                            <option selected>ARL</option>
                            <option value="1">SURA</option>
                            <option value="2">Seguros Bolivar</option>

                        </select>
                    </div>
                    <div class="mb-2 col-sm-6 col-md-6">
                        <select class="form-select" aria-label="Default select example" id="eps" name="eps_trainer"
                            required>
                            <option selected>EPS</option>
                        </select>
                    </div>
                </div>
                <div>
                    <h5>Informacion de Contratacion</h5>
                    <hr>
                    <div class="row">
                        <div class="row">
                            <div class="col sm-12">
                                <label for="f_contratacion" class="form-label"> Fecha de Contratacion*</label>
                                <input type="date" class="form-control" id="f_contratacion" name="fecha_contratacion">
    
                            </div>

                        </div>
                        
                        <div class="row">
                            <label for="cargo" class="form-label"> Cargo*</label>
                            <div class="col sm-12">
                                <select class="form-select" aria-label="Default select example" id="cargo" name="cargo"
                                required>
                                <option selected>Cargo</option>
                            </select>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col sm-12">
                                <label for="f_contratacion" class="form-label">Salario*</label>
                                <input type="number" min="1" class="form-control">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-grid mx-auto mt-1">
                    <input class="btn btn-success" type="submit" value="Guardar" name="guardar">
                </div>
                <div class="d-grid mx-auto mt-1">
                    <input class="btn btn-danger" type="reset" value="Borrar todo">
                </div>
            </div>

        </form>
    </div>`
    }
}
window.customElements.define("form-empleado",FormularioEmpleado);
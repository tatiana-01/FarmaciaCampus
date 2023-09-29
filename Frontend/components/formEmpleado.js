import { postEmployee } from "../Apis/ApiFarmacia/apiFarmacia.js";
class FormularioEmpleado extends HTMLElement{
    constructor(){
        super()

        let shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = 
        `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
        <div class="container w-50">
        <h3>Formulario Regsitro</h3>
        <form id="form-registroEmpleado">
            <div class="row bg-light p-1">
                <div class="mb-2 col-sm-6 col-md-6">
                    <select class="form-select" aria-label="Default select example" id="tipo-sangre" name="tipo_id">
                        <option selected>Tipo de Documento</option>
                        <option value="CE">Cedula de extranjeria</option>
                        <option value="CC">Cedula de ciudadania</option>
                    </select>
                </div>
                <div class="mb-2 col-sm-6 col-md-6 ">
                    <input type="text" placeholder="Numero de Documento" name="NumIdentificacion" class="form-control"
                        required>
                </div>
            </div>
            <div class="row bg-light p-1">
                <div class="col-sm-12 col-md-6">
                    <label for="birthday" class="form-label"> Fecha de Nacimineto*</label>
                    <input type="date" class="form-control" id="birthday" name="FechaNacimiento">
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
                                <option value=1>Bucaramanga</option>

                            </select>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" id="barrio" name="barrio" placeholder="Barrio" required>

                        </div>
                    </div>
                    <div class="row  mt-1">
                        <label>Direccion</label>
                        <div class=" mb-2 col-sm-3">
                            <input type="text" class="form-control" id="direccion" placeholder="Via*" name="tipoVia"
                                required>
                        </div>
                        <div class=" mb-2 col-sm-3">
                            <input type="number" class="form-control" id="direccion" placeholder="Numero*" name="numeroVia"
                                min="1" required>
                        </div>
                        <div class=" mb-2 col-sm-3">
                            <input type="text" class="form-control" id="direccion" placeholder="Letra*" name="letraVia"
                                >
                        </div>
                        <div class=" mb-2 col-sm-3">
                            <input type="text" class="form-control" id="direccion" placeholder="Sufijo*" name="sufijoCardinal"
                                required>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col sm-12">
                        <input type="text" class="form-control" id="direccion" placeholder="Codigo Postal" name="codigo_postal"
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
                            <option value="none" selected>ARL</option>
                            <option value="SURA">SURA</option>
                            <option value="Seguros Bolivar">Seguros Bolivar</option>

                        </select>
                    </div>
                    <div class="mb-2 col-sm-6 col-md-6">
                        <select class="form-select" aria-label="Default select example" id="eps" name="eps"
                            required>
                            <option value="none" selected>EPS</option>
                            <option value="Sanitas" >Sanitas</option>
                            <option value="Famisanar" >Famisanar</option>
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
                                <option value="ninguno" selected>Cargo</option>
                                <option value="Gerencial">Gerencial</option>
                                <option value="Secretaria">Secretaria</option>
                                <option value="Analista">Analista</option>

                            </select>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col sm-12">
                                <label for="f_contratacion" class="form-label">Salario*</label>
                                <input type="number" min="1" class="form-control" name="salario">

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
    </div>>`

    }

    connectedCallback(){
        this.registarEmpleado();
        
    }

    registarEmpleado(){
        document.addEventListener("DOMContentLoaded",()=>{
            var formulario = this.shadowRoot.getElementById("form-registroEmpleado");
        
            formulario.addEventListener("submit",(e)=>{
                var formData = new FormData(formulario);
                console.log(formData);
        
                let objetoPost = this.mapearFormularioAObjeto(formData);
                console.log(objetoPost);
           
                postEmployee(objetoPost);
            })
        })
    }
    mapearFormularioAObjeto(data){
        let obejtoPost = [
            {
                "numIdentificacion": data.get("NumIdentificacion"),
                "nombre": `${data.get("nombres")} ${data.get("apellidos")}`,
                "fechaNacimiento": data.get("FechaNacimiento"),
                "correo": data.get("email"),
                "telefono": data.get("telefono"),
                "direccion": {
                  "tipoVia": data.get("tipoVia"),
                  "numeroVia": data.get("numeroVia"),
                  "letraVia": data.get("letraVia") == null ? "" : data.get("letraVia"),
                  "sufijoCardinal": data.get("sufijoCardinal"),
                  "barrio": data.get("barrio"),
                  "ciudadId": data.get("ciudad"),
                  "codigoPostal": data.get("codigo_postal")
                },
                "eps": data.get("eps"),
                "arl": data.get("arl"),
                "salario": data.get("salario"),
                "cargo": data.get("cargo"),
                "fechaContratacion": data.get("fecha_contratacion")
              }

        ]
            return obejtoPost;
    }

}
window.customElements.define("form-empleado",FormularioEmpleado);
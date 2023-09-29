import { getDataProveedor, postDataMedicamento } from "../../Apis/ApiFarmacia/medicamento-serviceApi.js";
export{ FrmMedicamento };

class FrmMedicamento extends HTMLElement {
    constructor() {
        super();
        this.formulario();
        this.llenarSelectProveedor();
        this.enviarDatosMedicamentos();
        this.limpiarFormulario();

    }

    formulario() {
        this.innerHTML =  /* html */ `
            <div class="container mt-3">
                <div class="card">
                    <div class="card-header">
                        <h4 class="text-center">Ingrese los datos del Medicamento</h4>
                    </div>
                    <div class="card-body">
                        <form id="frmDatosMedicamentos">
                            <div class="container">
                                <h5>Información del Medicamento:</h5>
                                <div class="row">
                                    <div class="col-4">
                                        <div class="mb-3">
                                        <label for="proveedor" class="form-label">Nombre del Proveedor:*</label>
                                        <select class="form-select form-select-lg mb-3 proveedor" id="proveedor" name="proveedorId">
                                        <option selected>Buscar Proveedor</option>
                                    </select>
                                </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="nombre" class="form-label">Nombre del Medicamento:*</label>
                                            <input type="text" class="form-control" id="nombre" name="nombre"/>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="precio" class="form-label">Precio del Medicamento:*</label>
                                            <input type="number" class="form-control" id="precio" name="precio" min="0"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <div class="mb-3">
                                        <label for="fechaExpiracion" class="form-label">Fecha de Expiración:*</label>
                                        <input type="date" class="form-control" id="fechaExpiracion"
                                        name="fechaExpiracion"/>
                                    </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="stock" class="form-label">Stock del Medicamento:*</label>
                                            <input type="number" class="form-control" id="stock" name="stock" min="0"/>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="container text-center">
                                <button type="reset" value="reset" class="btn btn-info botonn" id="nuevoMedicamento" data-habilitardesabilitar='[["#guardarMedicamento"], ["#nuevoMedicamento"]]'>NUEVO MEDICAMENTO</button>
                                <button disabled type="submit" class="btn btn-success botonn" id="guardarMedicamento"
                                data-habilitardesabilitar='[["#nuevoMedicamento"], ["#guardarMedicamento"]]'>GUARDAR MEDICAMENTO</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    //metodo para llenar el select de proveedor
    llenarSelectProveedor = () => {
        getDataProveedor()
            .then((data) => {
                console.log(data)
                this.selectProveedor(data.result);
            })
    }

    //llenar select 
    selectProveedor = (datosProve) => {
        document.querySelectorAll('.proveedor').forEach((itemSelect) => {
            itemSelect.innerHTML = '';
            const seletItem = document.createElement('option');
            seletItem.innerHTML = "Buscar proveedor";
            seletItem.selected;
            itemSelect.appendChild(seletItem);

            datosProve.forEach(elemento => {
                const seletItem = document.createElement('option');
                seletItem.value = elemento.id;
                seletItem.innerHTML = elemento.nombre;
                itemSelect.appendChild(seletItem);
            });

        });
    }

    limpiarFormulario = () => {
        const frmDatosMedicamentos = document.querySelector('#frmDatosMedicamentos');//formulario principal
        document.querySelector('#nuevoMedicamento').addEventListener('click', (e) => {
            for (let itemFrm of frmDatosMedicamentos) {
                
                if (itemFrm.id != 'proveedor') {
                    
                    itemFrm.value = '';
                } 
            }
            e.preventDefault();
        });
    }

    //metodo para enviar los datos a la base de datos 
    enviarDatosMedicamentos = () => {
        document.querySelector('#guardarMedicamento').addEventListener('click', (e) => {
            const frmDatosMedicamentos = document.querySelector('#frmDatosMedicamentos');
            const data = Object.fromEntries(new FormData(frmDatosMedicamentos).entries());

            console.log(data);
            postDataMedicamento(data); //METODO POST
            alert("Los datos fueron guardados correctamente");

            e.preventDefault();
        });
    }

}
customElements.define('frm-medicamento-farma', FrmMedicamento);
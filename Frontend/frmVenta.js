class FrmPaciente extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="container mt-5 mb-5" id="ventaFrm">
        <div class="card">

            <div class="card-header ">
                <h1>Registro de venta:</h1>
            </div>

            <div class="card-body">
                <form id="formVenta">
                    <div class="row g-3">
                        <div class="col-sm-12 col-md-6 ">
                            <label for="customerName" class="form-label">Nombre del cliente</label>
                            <input type="text" class="form-control" id="customerName" name="customerName">
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <label for="nroCedula" class="form-label">Numero de Cedula</label>
                            <input type="nroCedula" class="form-control" id="nroCedula" name="nroCedula">
                        </div>
                    </div>
                    <div class="row g-3">
                        <div class="col-sm-12 col-md-6 ">
                            <label for="empleado" class="form-label">Empleado</label>
                            <select class="custom-select" id="selectEmpleado">
                                <option value="0" selected>Seleccione una opcion</option>;
                            </select>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <label for="fecha" class="form-label">Fecha</label>
                            <input type="date" class="form-control" id="fecha" name="fecha">
                        </div>
                    </div>
                </form>
                <h5 class="card-title mt-4">Productos</h5>
                <div class="container mt-4">
                    <div class="card card-p">
                        <div class="card-body card-productos">
                            <div class="productos">
                                <div id="productos0" class="productoFrm">
                                    <div class="row " id="div0">
                                        <div class="col-md-3">
                                            <label for="nombreProducto" class="form-label">Nombre del producto</label>
                                            <select class="form-select" id="selectProducto">
                                                <option value="0" selected>Seleccione una opcion</option>;
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="valor" class="form-label">Valor</label>
                                            <input type="number" class="form-control" id="valor0" readonly>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="cantidad" class="form-label">Cantidad</label>
                                            <input type="number" class="form-control" id="cantidad0" readonly>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="total" class="form-label">Total</label>
                                            <input type="number" class="form-control" id="total0" readonly>
                                        </div>
                                        <div class="col-md-1 botones text-center">
                                            <button class="btn btn-success boton-mas" id="mas0"
                                                data-producto="0">+</button>
                                        </div>
                                        <div class="col-md-1 botones">
                                            <button class="btn btn-warning boton-menos" id="menos0"
                                                data-producto="0">-</button>
                                        </div>
                                        <div class="col-md-1 botones">
                                            <img src="./Inicio/images/1017530.png" class="eliminar" id="eliminar0"
                                                data-producto="0" alt="" srcset="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="botones mb-2 mt-5">
                    <button class="btn btn-success " id="guardar" type="submit">Guardar</button>
                    <button class="btn btn-info" id="añadir">Agregar Producto</button>
                    <button class="btn btn-warning" type="reset">Nueva Factura</button>
                </div>


            </div>

        </div>
    </div> `
    }

};
customElements.define('frm-paciente', FrmPaciente);
import { getDataProveedor, getDataMedicamento, getProveedorById, getMedicamentoById, postDataCompra } from "../../Apis/ApiFarmacia/compra-serviceApi.js";

export { FrmCompra};

class FrmCompra extends HTMLElement {
    constructor() {
        super();
        this.formulario();
        this.getProveedor();
        this.agregarCompra();
        this.cedulaProveedor();
        this.postCompra();

    }
    formulario() {
        this.innerHTML = /* html */ `
            <div class="container mt-5 mb-5" id="ventaFrm">
            <div class="card">

                <div class="card-header ">
                    <h1>Registro de Compra:</h1>
                </div>

                <div class="card-body">
                    <form id="formCompra">
                        <div class="row g-3">
                            <div class="col-sm-12 col-md-6 ">
                                <label for="proveedor" class="form-label">Nombre Proveedor:</label>
                                <select class="form-select" id="selectproveedor" name="proveedorId">
                                    <option value="0" selected>Seleccione una opcion</option>;
                                </select>
                            </div>
                            <div class="col-sm-12 col-md-6 ">
                                <label for="nroCedula" class="form-label">Numero de Cedula:</label>
                                <input type="nroCedula" class="form-control" id="nroCedula" name="nroCedula" readonly>
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col-sm-12 col-md-6 ">
                                <label for="fecha" class="form-label">Fecha de Compra:</label>
                                <input type="date" class="form-control" id="fecha" name="fechaCompra">
                            </div>
                            <div class="col-sm-12 col-md-6 ">
                                
                            </div>
                        </div>
                    </form>
                    <h5 class="card-title mt-4">Medicamentos</h5>
                    <div class="container mt-4">
                        <div class="card card-p">
                            <div class="card-body card-productos">
                                <div class="productos">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="botones mb-2 mt-5">
                        <button class="btn enviar" id="guardar" type="submit">Guardar</button>
                        <button class="btn btn-success" id="añadir" >Agregar Producto</button>
                    </div>


                </div>

            </div>
        </div> 
        `;
    }

    getProveedor() {
        getDataProveedor()
            .then((data) => {
                this.cargarSelects('#selectproveedor', data.result)
            })
    }

    agregarCompra() {
        let boton = document.querySelector('#añadir');
        console.log(boton);
        let div = document.querySelector('.productos');
        let contador = 0;
        boton.addEventListener("click", (e) => {
            contador++;
            let html =/*html*/`
            <form class="medicamentoss">
            <div class="row " id="div${contador}">
            <div class="col-3">
                <label for="nombreProducto" class="form-label">Nombre del Medicamento:</label>
                <select class="form-select nameProductt" id="nombreProducto${contador}" name="medicamentoId" data-count="${contador}">
                        <option value="0" selected>Seleccione una opcion</option>;
                </select>
            </div>
            <div class="col-2">
                <label for="valor" class="form-label">Valor del medicamento:</label>
                <input type="number" class="form-control" id="valor${contador}">
            </div>
            <div class="col-2">
                <label for="cantidad" class="form-label">Cantidad de Medicamentos:</label>
                <input type="number" class="form-control" id="cantidad${contador}" name="cantidadComprada" data-producto="${contador}" readonly>
            </div>
            <div class="col-2">
                <label for="total" class="form-label">Precio de la Compra:</label>
                <input type="number" class="form-control" id="total${contador}" data-producto="${contador}" name="precioCompra" readonly>
            </div>
            <div class="col-1  botones">
                <button class="btn btn-success boton-mass" id="mas${contador}" data-producto="${contador}">+</button>
            </div>
            <div class="col-1 botones">
                <button class="btn btn-warning boton-menoss" id="menos${contador}" data-producto="${contador}">-</button>
            </div>
            <div class="col-1 botones">
                <img src="../Inicio/images/1017530.png" class="eliminar" id="eliminar${contador}" data-producto="${contador}" alt="" srcset="">
            </div>
        </div>
        </form>

            `;
            let divElement = document.createElement("div");
            divElement.innerHTML = html;
            divElement.className = 'productoFrm';
            div.appendChild(divElement);
            divElement.setAttribute('id', `productos${contador}`);
            getDataMedicamento().then((response) => {
                this.cargarSelects(`#nombreProducto${contador}`, response)
            })
            this.aumento();
            this.decremento();
            this.eliminar();
            //this.valorMedicamento();
            this.redireccionarPagina();
        })
    }

    aumento() {
        let botonMas = document.querySelectorAll('.boton-mass');
        botonMas.forEach(element => {
            element.addEventListener("click", (e) => {
                let cantidad = document.querySelector(`#cantidad${element.dataset.producto}`);
                let valor = document.querySelector(`#valor${element.dataset.producto}`);
                let total = document.querySelector(`#total${element.dataset.producto}`);
                cantidad.value++;
                total.value = valor.value * cantidad.value;
                e.preventDefault();
                e.stopImmediatePropagation();

            })
        });
    }

    decremento() {
        let botonMenos = document.querySelectorAll('.boton-menoss');
        botonMenos.forEach(element => {
            element.addEventListener("click", (e) => {
                let cantidad = document.querySelector(`#cantidad${element.dataset.producto}`);
                let valor = document.querySelector(`#valor${element.dataset.producto}`);
                let total = document.querySelector(`#total${element.dataset.producto}`);
                cantidad.value--;
                total.value = valor.value * cantidad.value;
                if (cantidad.value <= 0) {
                    let div = document.querySelector(`#productos${element.dataset.producto}`);
                    let divPadre = document.querySelector('.productos');
                    try {
                        divPadre.removeChild(div);
                    } catch { }
                } else {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
                e.preventDefault();
                e.stopImmediatePropagation();

            })
        });
    }

    eliminar() {
        let div = document.querySelectorAll('.eliminarr');
        div.forEach((element) => {
            element.addEventListener('click', (e) => {
                let div = document.querySelector(`#productos${element.dataset.producto}`);
                let divPadre = document.querySelector('.productos');
                try {
                    divPadre.removeChild(div);
                } catch { }
            })
        })
    }

    cargarSelects(selectId, data) {
        console.log(data);
        let select = document.querySelector(selectId);
        select.innerHTML = '';
        const itemStart = document.createElement('option');
        itemStart.innerHTML = 'Seleccione una opcion'
        itemStart.value=0
        itemStart.selected;
        select.appendChild(itemStart);

        data.forEach(element => {
            const item = document.createElement('option');
            item.value = element.id;
            item.innerHTML = element.nombre;
            select.appendChild(item);
        });
    }

    cedulaProveedor() {
        let selects = document.querySelector("#selectproveedor")
        let cedula = document.querySelector('#nroCedula')
        selects.addEventListener("change", (e) => {
            if (e.target.value == 0) {
                cedula.value = ''
            } else {
                
                getProveedorById(e.target.value).then((response) => {

                    cedula.value = response.numIdentificacion
                    console.log(response);
                })
            }

        })
    }

    /*valorMedicamento(){
        let selectsMeds=document.querySelectorAll('.nameProductt');
        selectsMeds.forEach((select)=>{
            select.addEventListener('change',(e)=>{
                getMedicamentoById(e.target.value).then((response)=>{
                    let valor=document.querySelector(`#valor${e.target.dataset.count}`)
                    valor.value=response.precio
                })
                
            })
        })
    }*/

    postCompra(){
        let forminfoVenta=document.querySelector('#formCompra');
        let boton=document.querySelector('#guardar');
        boton.addEventListener('click',(e)=>{
            let formsMedicamentos=document.querySelectorAll('.medicamentoss');
            //let token='eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0YXRpYW5hIiwianRpIjoiYzkxY2JjZTMtNjU0Zi00YTkzLWFjNDgtNzVjYjg1ZDRiYmRkIiwiZW1haWwiOiJ0YXRpYW5hQGdtYWlsLmNvbSIsInVpZCI6IjEiLCJyb2xlcyI6WyJHZXJlbnRlIiwiUGVyc29uYSJdLCJleHAiOjE2OTU3MzkxNzcsImlzcyI6IkFwaUZhcm1hY2lhIiwiYXVkIjoiQXBpRmFybWFjaWEifQ.TsjWtu4vmMwGtC42vaIVcGA_4iJSJ0FvvDXerLVcI6g';
            let meds=[];
            let dataVenta=Object.fromEntries(new FormData(forminfoVenta));
            formsMedicamentos.forEach((form)=>{
                let dataMed=Object.fromEntries(new FormData(form));
                meds.push(dataMed)
            })
            dataVenta.medicamentosComprados = meds;
            console.log(dataVenta);
            postDataCompra(dataVenta).then(response=>console.log(response))
            setTimeout(location.reload(),1000)
            ;
        })
    }

    redireccionarPagina(){
        let mas=document.querySelectorAll('.masInfoComp')
          mas.forEach(btn=>{
              btn.addEventListener('click',(e)=>{
                  window.location=`masInfoCompra.html?idCod=${e.target.dataset.id}`
              })
          })
    }


}
customElements.define('frm-compra-farmacia', FrmCompra);
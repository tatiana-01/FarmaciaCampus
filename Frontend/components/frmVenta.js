import { getDataVenta, postDataVenta, putDataVenta, deleteDataVenta } from '../Apis/apiVenta.js';
import { getDataProducto, postDataProducto, putDataProducto, deleteDataProducto, getDataEmpleado, getProductoById } from '../Apis/apiProductoo.js';
import { getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais, getPaisById, getDepartamentoById, getPacienteById } from '../Apis/apiPaciente.js';
class FrmVenta extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.agregarProducto();
        this.cedulaPaciente();
        this.getEmpleados();
        this.getPacientes();
        this.postVenta();
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="btn-group" role="group" aria-label="Basic outlined example">
                <a href="registrarVentas.html" class="btn btn-outline-primary">Registrar Ventas</a>
                <a href="mostrarVentas.html" class="btn btn-outline-primary">Mostrar Ventas</a>
            </div>
        <div class="container mt-5 mb-5" id="ventaFrm">
        <div class="card">

            <div class="card-header ">
                <h1>Registro de venta:</h1>
            </div>

            <div class="card-body">
                <form id="formVenta">
                    <div class="row g-3">
                        <div class="col-sm-12 col-md-6 ">
                            <label for="customerName" class="form-label">paciente</label>
                            <select class="form-select" id="selectPaciente" name="pacienteId">
                                <option value="0" selected>Seleccione una opcion</option>;
                            </select>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <label for="nroCedula" class="form-label">Numero de Cedula</label>
                            <input type="nroCedula" class="form-control" id="nroCedula" name="nroCedula" readonly>
                        </div>
                    </div>
                    <div class="row g-3">
                        <div class="col-sm-12 col-md-6 ">
                            <label for="empleado" class="form-label">Empleado</label>
                            <select class="form-select" id="selectEmpleado" name="empleadoId">
                                <option value="0" selected>Seleccione una opcion</option>;
                            </select>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <label for="fecha" class="form-label">Fecha</label>
                            <input type="date" class="form-control" id="fecha" name="fechaVenta">
                        </div>
                    </div>
                </form>
                <h5 class="card-title mt-4">Productos</h5>
                <div class="container mt-4">
                    <div class="card card-p">
                        <div class="card-body card-productos">
                            <div class="productos">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="botones mb-2 mt-5">
                    <button class="btn enviar " id="guardar" type="submit">Guardar</button>
                    <button class="btn btn-success" id="añadir">Agregar Producto</button>
                </div>


            </div>

        </div>
    </div> `
    }

    getEmpleados() {
        getDataEmpleado().then((response) => {
            console.log(response.result);
            this.cargarSelects('#selectEmpleado', response.result)
        })

    }

    getPacientes() {
        getDataPaciente().then((response) => {
            this.cargarSelects('#selectPaciente', response.result)
        })

    }

    agregarProducto() {
        let boton = document.querySelector('#añadir');
        console.log(boton);
        let div = document.querySelector('.productos');
        let contador = 0;
        boton.addEventListener("click", (e) => {
            contador++;
            let html =/*html*/`
            <form class="medicamentos">
            <div class="row " id="div${contador}">
            <div class="col-3">
                <label for="nombreProducto" class="form-label">Nombre de producto:</label>
                <select class="form-select nameProduct" id="nombreProducto${contador}" name="medicamentoId" data-count="${contador}">
                        <option value="0" selected>Seleccione una opcion</option>;
                </select>
            </div>
            <div class="col-2">
                <label for="valor" class="form-label">Valor de producto:</label>
                <input type="number" class="form-control" id="valor${contador}" readonly>
            </div>
            <div class="col-2">
                <label for="cantidad" class="form-label">Cantidad de producto:</label>
                <input type="number" class="form-control" id="cantidad${contador}" name="cantidadVendida" data-producto="${contador}" readonly>
            </div>
            <div class="col-2">
                <label for="total" class="form-label">Total de producto:</label>
                <input type="number" class="form-control" id="total${contador}" data-producto="${contador}" readonly>
            </div>
            <div class="col-1  botones">
                <button class="btn btn-success boton-mas" id="mas${contador}" data-producto="${contador}">+</button>
            </div>
            <div class="col-1 botones">
                <button class="btn btn-warning boton-menos" id="menos${contador}" data-producto="${contador}">-</button>
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
            getDataProducto().then((response) => {
                this.cargarSelects(`#nombreProducto${contador}`, response)
            })
            this.aumento();
            this.decremento();
            this.eliminar();
            this.valorMedicamento();
            this.redireccionarPagina();
        })
    }

    aumento() {
        let botonMas = document.querySelectorAll('.boton-mas');
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
        let botonMenos = document.querySelectorAll('.boton-menos');
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
        let div = document.querySelectorAll('.eliminar');
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

    cedulaPaciente() {
        let selects = document.querySelector("#selectPaciente")
        let cedula = document.querySelector('#nroCedula')
        selects.addEventListener("change", (e) => {
            if (e.target.value == 0) {
                cedula.value = ''
            } else {
                
                getPacienteById(e.target.value).then((response) => {

                    cedula.value = response.numIdentificacion
                    console.log(response);
                })
            }

        })
    }

    valorMedicamento(){
        let selectsMeds=document.querySelectorAll('.nameProduct');
        selectsMeds.forEach((select)=>{
            select.addEventListener('change',(e)=>{
                getProductoById(e.target.value).then((response)=>{
                    let valor=document.querySelector(`#valor${e.target.dataset.count}`)
                    valor.value=response.precio
                })
                
            })
        })
    }

    postVenta(){
        let forminfoVenta=document.querySelector('#formVenta');
        let boton=document.querySelector('#guardar');
        boton.addEventListener('click',(e)=>{
            let formsMedicamentos=document.querySelectorAll('.medicamentos');
            //let token='eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0YXRpYW5hIiwianRpIjoiYzkxY2JjZTMtNjU0Zi00YTkzLWFjNDgtNzVjYjg1ZDRiYmRkIiwiZW1haWwiOiJ0YXRpYW5hQGdtYWlsLmNvbSIsInVpZCI6IjEiLCJyb2xlcyI6WyJHZXJlbnRlIiwiUGVyc29uYSJdLCJleHAiOjE2OTU3MzkxNzcsImlzcyI6IkFwaUZhcm1hY2lhIiwiYXVkIjoiQXBpRmFybWFjaWEifQ.TsjWtu4vmMwGtC42vaIVcGA_4iJSJ0FvvDXerLVcI6g';
            let meds=[];
            let dataVenta=Object.fromEntries(new FormData(forminfoVenta));
            formsMedicamentos.forEach((form)=>{
                let dataMed=Object.fromEntries(new FormData(form));
                meds.push(dataMed)
            })
            dataVenta.medicamentosVendidos=meds;
            console.log(dataVenta);
            postDataVenta(dataVenta).then(response=>console.log(response))
            setTimeout(location.reload(),1000)
            ;
        })
    }

    redireccionarPagina(){
        let mas=document.querySelectorAll('.masInfo')
          mas.forEach(btn=>{
              btn.addEventListener('click',(e)=>{
                  window.location=`masInfoVenta.html?id=${e.target.dataset.id}`
              })
          })
  
     
  }
};
customElements.define('frm-venta', FrmVenta);
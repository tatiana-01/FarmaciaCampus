class FrmVenta extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.agregarProducto();
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
                            <select class="form-select" id="selectEmpleado">
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

    agregarProducto(){
        let boton= document.querySelector('#añadir');
        console.log(boton);
        let div=document.querySelector('.productos');
        let contador=0;
        boton.addEventListener("click",(e)=>{
            contador++;
            let html=/*html*/`
            <div class="row" id="div${contador}">
            <div class="col-3">
                <label for="nombreProducto" class="form-label">Numero de producto:</label>
                <select class="form-select" id="nombreProducto${contador}" name="Producto${contador}[]">
                        <option value="0" selected>Seleccione una opcion</option>;
                    </select>
            </div>
            <div class="col-2">
                <label for="valor" class="form-label">Valor de producto:</label>
                <input type="number" class="form-control" id="valor${contador}" name="Producto${contador}[]" readonly>
            </div>
            <div class="col-2">
                <label for="cantidad" class="form-label">Cantidad de producto:</label>
                <input type="number" class="form-control" id="cantidad${contador}" name="Producto${contador}[]" data-producto="${contador}" readonly>
            </div>
            <div class="col-2">
                <label for="total" class="form-label">Total de producto:</label>
                <input type="number" class="form-control" id="total${contador}" name="Producto${contador}[]" data-producto="${contador}" readonly>
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

            `;
            let divElement=document.createElement("div");
            divElement.innerHTML=html;
            divElement.className='productoFrm';
            div.appendChild(divElement);
            divElement.setAttribute('id',`productos${contador}`);
            this.aumento();
            this.decremento();
            this.eliminar();
        })
    }

    aumento(){
        let botonMas=document.querySelectorAll('.boton-mas');
        botonMas.forEach(element => {
            element.addEventListener("click",(e)=>{
                let cantidad=document.querySelector(`#cantidad${element.dataset.producto}`);
                let valor=document.querySelector(`#valor${element.dataset.producto}`);
                let total=document.querySelector(`#total${element.dataset.producto}`);
                cantidad.value++;
                total.value=valor.value*cantidad.value;
                e.preventDefault();
                e.stopImmediatePropagation();
    
            })
        });
    }

    decremento(){
        let botonMenos=document.querySelectorAll('.boton-menos');
        botonMenos.forEach(element => {
            element.addEventListener("click",(e)=>{
                let cantidad=document.querySelector(`#cantidad${element.dataset.producto}`);
                let valor=document.querySelector(`#valor${element.dataset.producto}`);
                let total=document.querySelector(`#total${element.dataset.producto}`);
                cantidad.value--;
                total.value=valor.value*cantidad.value;
                if(cantidad.value<=0){
                    let div=document.querySelector(`#productos${element.dataset.producto}`);
                    let divPadre=document.querySelector('.productos');
                    try{
                        divPadre.removeChild(div);
                    }catch{} 
                }else{
                    e.preventDefault();
                    e.stopImmediatePropagation();        
                }
                e.preventDefault();
                e.stopImmediatePropagation();
    
            })
        });
    }

    eliminar(){
        let div=document.querySelectorAll('.eliminar');
        div.forEach((element)=>{
            element.addEventListener('click',(e)=>{
                let div=document.querySelector(`#productos${element.dataset.producto}`);
                let divPadre=document.querySelector('.productos');
                try{
                    divPadre.removeChild(div);
                }catch{} 
            })
        })
    }

    agregarVentaBD(){
        
    }

};
customElements.define('frm-venta', FrmVenta);
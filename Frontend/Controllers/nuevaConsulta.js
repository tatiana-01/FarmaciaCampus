import { getPrecioStock, getStockProveedor, getTotalMedic, getEmpleadoFecha } from "../Apis/ApiFarmacia/concultasApi.js";

document.querySelector('#precioStock').addEventListener('click', (e) => {
    document.querySelector('#ocultarTablaDos').style.display = "block";
    const medicamnetoPrecio = document.querySelector('#medicamnetoPrecio');
    const data = Object.fromEntries(new FormData(medicamnetoPrecio).entries());

    if (data.precio == '' || data.stock == '' || data.precio == null || data.stock == null || parseInt(data.precio) < 0 || parseInt(data.stock) < 0) {

        alert("Ingrese los datos correspondientes para llevar a cabo la busqueda con datos positivos");
        document.querySelector('#ocultarTablaDos').style.display = "none";
    } else {

        getPrecioStock(data.precio, data.stock)
            .then((data) => {
                console.log(data);
                llenarTablaDatos(data);
            })

    }    
})

function llenarTablaDatos(datos) {

    const cuerpotabla = document.querySelector('#cuerpoTablaDos');
    cuerpotabla.innerHTML = '';
    datos.forEach(element => {
        const fila  = document.createElement('tr');
        fila.innerHTML = /* html */ `
            <td>${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.precio}</td>
            <td>${element.proveedorId}</td>
            <td>${element.stock}</td>
            <td>${element.fechaExpiracion.slice(0, -9)}</td>
        `;
        cuerpotabla.appendChild(fila);
        
    });
    
}

document.querySelector('#nuevoPrecioStock').addEventListener('click', (e) => {
    document.querySelector('#ocultarTablaDos').style.display = "none";
    document.querySelector('#precio').value = '';
    document.querySelector('#stock').value = '';
})

//---------------------------------------------------------------------------------------------------------------

document.querySelector('#proveedorStock').addEventListener('click', (e) => {
    document.querySelector('#ocultarTablaTres').style.display = "block";
    const proveedoresStock = document.querySelector('#proveedoresStock');
    const data = Object.fromEntries(new FormData(proveedoresStock).entries());

    if (data.menorStock == '' || data.menorStock == null || parseInt(data.menorStock) < 0) {

        alert("Ingrese los datos del Stock para llevar a cabo la busqueda, con dato positivo");
        document.querySelector('#ocultarTablaTres').style.display = "none";
    } else {

        getStockProveedor(data.menorStock)
            .then((data) => {
                console.log(data);
                llenarTablaProveedores(data);
            })

    }    
})

function llenarTablaProveedores(datos) {

    const cuerpotabla = document.querySelector('#cuerpoTablaTres');
    cuerpotabla.innerHTML = '';
    datos.forEach(element => {
        const fila  = document.createElement('tr');
        fila.innerHTML = /* html */ `
            <td>${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.correo}</td>
        `;
        cuerpotabla.appendChild(fila);
        
    });
    
}

document.querySelector('#nuevoProveedor').addEventListener('click', (e) => {
    document.querySelector('#ocultarTablaTres').style.display = "none";
    document.querySelector('#menorStock').value = '';
})

//---------------------------------------------------------------------------------------------------------------

document.querySelector('#cantidadMedic').addEventListener('click', (e) => {
    document.querySelector('#fechaUno').style.display = "block";
    const medicamnetoAnio = document.querySelector('#medicamnetoAnio');
    const data = Object.fromEntries(new FormData(medicamnetoAnio).entries());

    if (data.medicamentoTotal == '' || data-medicamentoTotal == null) {
        alert("Por faver ingrese una fecha, para poder hacer la busqueda");
        document.querySelector('#fechaUno').style.display = "none";

    } else {

        getTotalMedic(data.medicamentoTotal)
            .then((data) => {
                console.log(data);
                fechaMedicamentos(data);
            })
    }
})

function fechaMedicamentos(datos) {
    const { totalDeMedicamentosVendidos } = datos;
    const mensaje = document.querySelector('#fechaUno');
    const parrafo = document.createElement('div');
    mensaje.innerHTML = '';
    parrafo.innerHTML = /* html */ `
        <p>El numero total de medicamentos vendidos por mes y año fueron de : ${totalDeMedicamentosVendidos}  Medicamentos.</p>
    `;
    mensaje.appendChild(parrafo);
}

document.querySelector('#nuevaCantidadMedic').addEventListener('click', (e) => {
    document.querySelector('#fechaUno').style.display = "none";
    document.querySelector('#medicamentoTotal').value = '';
})

//---------------------------------------------------------------------------------------------------------------

document.querySelector('#fechaEmpleado').addEventListener('click', (e) => {
    document.querySelector('#ocultarTablaCuatro').style.display = "block";
    const empleados = document.querySelector('#empleados');
    const data = Object.fromEntries(new FormData(empleados).entries());

    if (data.empleado == '' || data.empleado == null) {

        alert("Ingrese una fecha para poder hacer la busqueda");
        document.querySelector('#ocultarTablaCuatro').style.display = "none";
    } else {

        getEmpleadoFecha(data.empleado)
            .then((data) => {
                console.log(data);
                llenarTablaDatosTres(data);
            })

    }    
})

function llenarTablaDatosTres(datos) {

    const cuerpotabla = document.querySelector('#cuerpoTablaCuatro');
    cuerpotabla.innerHTML = '';
    datos.forEach(element => {
        const fila  = document.createElement('tr');
        fila.innerHTML = /* html */ `
            <td>${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.cargo}</td>
            <td>${element.numeroDeVentasRealizadas}</td>
        `;
        cuerpotabla.appendChild(fila);
        
    });
    
}

document.querySelector('#nuevoFechaEmpleado').addEventListener('click', (e) => {
    document.querySelector('#ocultarTablaCuatro').style.display = "none";
    document.querySelector('#empleado').value = '';
})

//---------------------------------------------------------------------------------------------------------------

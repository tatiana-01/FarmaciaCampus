import { getRecaudoTotal, getDataMedicamentoPorProveedor, getMedicamentoPorFecha, getEmpleadoVenta } from "../Apis/ApiFarmacia/concultasApi.js";

document.querySelector('#totalRecaudo').addEventListener('click', (e) => {
    document.querySelector('#total').style.display = "block";

    getRecaudoTotal()
        .then((dato) => {
            console.log(dato);
            totalVentas(dato);
        })

})

function totalVentas(datos) {
    const { precioTotalDeVentas } = datos;
    const mensaje = document.querySelector('#total');
    const parrafo = document.createElement('div');
    mensaje.innerHTML = '';
    parrafo.innerHTML = /* html */ `
        <p> El total de Dinero recaudado por las ventas de los medicamentos es de: $${precioTotalDeVentas}
        </p>
    `;
    mensaje.appendChild(parrafo);
}

document.querySelector('#nuevoTotal').addEventListener('click', (e) => {
    document.querySelector('#total').style.display = "none";
})

//----------------------------------------------------------------------------------------------------------------

document.querySelector('#totalMedicamentos').addEventListener('click', (e) => {
    document.querySelector('#ocultarDiv').style.display = "block";
    getDataMedicamentoPorProveedor()
        .then((datos) => {
            console.log(datos);
            llenarCampos(datos);
        })

})

function llenarCampos(datos) {

    const cuerpotabla = document.querySelector('#cuerpoMedicamento');
    cuerpotabla.innerHTML = '';
    datos.forEach(element => {

        const fila  = document.createElement('tr');
        fila.innerHTML = /* html */ `
            <td>${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.numeroDeMedicamentos}</td>
        `;
        cuerpotabla.appendChild(fila);
        
    });
 
}

document.querySelector("#nuevaBusqueda").addEventListener('click', (e) => {
    document.querySelector('#ocultarDiv').style.display = "none";
})

//----------------------------------------------------------------------------------------------------------------

document.querySelector('#fechaMedica').addEventListener('click', (e) => {
    document.querySelector('#fecha').style.display = "block";
    const medicamnetoFecha = document.querySelector('#medicamnetoFecha');
    const data = Object.fromEntries(new FormData(medicamnetoFecha).entries());

    if (data.fechaano == '' || data-fechaano == null) {
        alert("Por faver ingrese una fecha, para poder hacer la busqueda");
        document.querySelector('#fecha').style.display = "none";

    } else {

        getMedicamentoPorFecha(data.fechaano)
            .then((data) => {
                console.log(data);
                fechaMedicamentos(data);
            })

    }

})

function fechaMedicamentos(datos) {
    const { totalDeMedicamentosVendidos } = datos;
    const mensaje = document.querySelector('#fecha');
    const parrafo = document.createElement('div');
    mensaje.innerHTML = '';
    parrafo.innerHTML = /* html */ `
        <p> El numero de medicamentos vendidos durante esta fecha fueron de : ${totalDeMedicamentosVendidos}  Medicamentos.
        </p>
    `;
    mensaje.appendChild(parrafo);
}

document.querySelector('#nuevaFecha').addEventListener('click', (e) => {
    document.querySelector('#fecha').style.display = "none";
    document.querySelector('#fechaano').value = '';
})

//-----------------------------------------------------------------------------------------------------------------

document.querySelector('#numeroEmpleado').addEventListener('click', (e) => {
    document.querySelector('#ocultarTablaCinco').style.display = "block";
    const empleadosVentas = document.querySelector('#empleadosVentas');
    const data = Object.fromEntries(new FormData(empleadosVentas).entries());

    if (data.ventasEmpleado == '' || data.ventasEmpleado == null || data.ventasEmpleado < 0) {

        alert("Ingrese una numero de ventas a consultar, deben de ser positivo");
        document.querySelector('#ocultarTablaCinco').style.display = "none";

    } else {

        getEmpleadoVenta(data.ventasEmpleado)
            .then((data) => {
                console.log(data);
                llenarTablaDatosCinco(data);
            })

    }    
})

function llenarTablaDatosCinco(datos) {

    const cuerpotabla = document.querySelector('#cuerpoTablaCinco');
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

document.querySelector('#nuevoNumeroEmpleado').addEventListener('click', (e) => {
    document.querySelector('#ocultarTablaCinco').style.display = "none";
    document.querySelector('#ventasEmpleado').value = '';
})

//-----------------------------------------------------------------------------------------------------------

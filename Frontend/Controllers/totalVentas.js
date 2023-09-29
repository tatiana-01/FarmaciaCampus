import { getRecaudoTotal, getDataMedicamentoPorProveedor, getMedicamentoPorFecha } from "../Apis/ApiFarmacia/concultasApi.js";

document.querySelector('#totalRecaudo').addEventListener('click', (e) => {

    getRecaudoTotal()
        .then((dato) => {
            console.log(dato);
            totalVentas(dato);
        })

})

function totalVentas(datos) {
    const { precioTotalDeVentas } = datos;
    const mensaje = document.querySelector('#total');
    const parrafo = document.createElement('p');
    parrafo.innerHTML = /* html */ `
        <p> El total de Dinero recaudado por las ventas de los medicamentos es de: $${precioTotalDeVentas}
        </p>
    `;
    mensaje.appendChild(parrafo);
}

document.querySelector('#totalMedicamentos').addEventListener('click', (e) => {
    getDataMedicamentoPorProveedor()
        .then((datos) => {
            console.log(datos);
            llenarCampos(datos);
        })

})

function llenarCampos(datos) {

    const cuerpotabla = document.querySelector('#cuerpoMedicamento');
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

document.querySelector('#fechaMedica').addEventListener('click', (e) => {
    const medicamnetoFecha = document.querySelector('#medicamnetoFecha');
    const data = Object.fromEntries(new FormData(medicamnetoFecha).entries());

    getMedicamentoPorFecha(data.fechaano)
        .then((data) => {
            console.log(data);
            fechaMedicamentos(data);
        })

})

function fechaMedicamentos(datos) {
    const { totalDeMedicamentosVendidos } = datos;
    const mensaje = document.querySelector('#fecha');
    const parrafo = document.createElement('p');
    parrafo.innerHTML = /* html */ `
        <p> El numero de medicamentos vendidos durante esta fecha fueron de : ${totalDeMedicamentosVendidos}  Medicamentos.
        </p>
    `;
    mensaje.appendChild(parrafo);
}
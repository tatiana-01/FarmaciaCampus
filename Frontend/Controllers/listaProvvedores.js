import { getMedicamentoById } from "../Apis/ApiFarmacia/concultasApi.js";

document.querySelector('#dato').addEventListener('click', (e) => {
    const smedicamneto = document.querySelector('#medicamneto');
    const data = Object.fromEntries(new FormData(smedicamneto).entries());
    //console.log(data)

    getMedicamentoById(data.medicamento)
        .then((data) => {
            console.log(data);
            llenarTabla(data);
        })
})

function llenarTabla(datos) {

    const cuerpotabla = document.querySelector('#cuerpoTabla');
    const fila  = document.createElement('tr');
    fila.innerHTML = /* html */ `
        <td>${datos.id}</td>
        <td>${datos.nombre}</td>
        <td>${datos.totalVendidos}</td>
        <td>${datos.precioVenta}</td>
    `;
    cuerpotabla.appendChild(fila);
}


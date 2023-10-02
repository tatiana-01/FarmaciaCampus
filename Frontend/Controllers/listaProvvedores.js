import { getMedicamentoById, getPromedioVentas, getListaProvvedores } from "../Apis/ApiFarmacia/concultasApi.js";

document.querySelector('#dato').addEventListener('click', (e) => {

    document.querySelector('#ocultarTabla').style.display = "block";
    const smedicamneto = document.querySelector('#medicamneto');
    const data = Object.fromEntries(new FormData(smedicamneto).entries());
    console.log(data.medicamento)
    if (data.medicamento == '' || data.medicamento == null) {
        alert("Ingrese un nombre de medicamento a consultar");
        document.querySelector('#ocultarTabla').style.display = "none";
    } else {
        //console.log(data)
        getMedicamentoById(data.medicamento)
            .then((data) => {
                console.log(data);
                llenarTabla(data);
            })
    }
    
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

document.querySelector('#datos').addEventListener('click', (e) => {
    document.querySelector('#ocultarTabla').style.display = "none";
    const smedicamneto = document.querySelector('#medicamento');
    smedicamneto.value = '';
})

//-------------------------------------------------------------------------------------------------------------

document.querySelector('#promedioVenta').addEventListener('click', (e) => {
    document.querySelector('#promedio').style.display = "block";

    getPromedioVentas()
        .then((dato) => {
            console.log(dato);
            promedioVenta(dato);
        })

})

function promedioVenta(datos) {
    
    const mensaje = document.querySelector('#promedio');

    datos.forEach(element => {
        const { promedioMedicPorVentaEs } = element;
        const parrafo = document.createElement('div');
        mensaje.innerHTML = '';
            parrafo.innerHTML = /* html */ `
            <p> El promedio de compra de medicamentos por venta es de: ${promedioMedicPorVentaEs} Medicamentos
            </p>
        `;
        mensaje.appendChild(parrafo);
    });
    
}

document.querySelector('#nuevoPromedio').addEventListener('click', (e) => {
    document.querySelector('#promedio').style.display = "none";
})

//---------------------------------------------------------------------------------------------------------------

document.querySelector('#listaProvee').addEventListener('click', (e) => {
    document.querySelector('#ocultarTablaSeis').style.display = "block";
    
    getListaProvvedores()
        .then((data) => {
            console.log(data);
            llenarTablaDatosSeis(data);
        })  
})

function llenarTablaDatosSeis(datos) {

    const cuerpotabla = document.querySelector('#cuerpoTablaSeis');
    cuerpotabla.innerHTML = '';
    let contador = 0;
    datos.forEach(element => {
        contador += 1;
        const fila  = document.createElement('tr');
        fila.innerHTML = /* html */ `
            <td>${element.nombre}</td>
            <td>${element.telefono}</td>
            <td id="medic${contador}">

            </td>
        `;
        cuerpotabla.appendChild(fila);

        const columna = document.querySelector(`#medic${contador}`);
        element.medicamentos.forEach(medic => {
            const parrafo = document.createElement('div');
            parrafo.innerHTML = /* html */ `
                <p>${medic.nombre}</p>
            `;
            columna.appendChild(parrafo);
            
        })
        
    });
    
}

document.querySelector('#nuevoListaProve').addEventListener('click', (e) => {
    document.querySelector('#ocultarTablaSeis').style.display = "none";
})

//---------------------------------------------------------------------------------------------------------------


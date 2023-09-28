import { getDataVenta, postDataVenta, putDataVenta, deleteDataVenta, getVentaById,getMedicamentoById } from '../Apis/apiVenta.js';
let params = new URL(document.location).searchParams;
let id = parseInt(params.get("id"));
console.log(id);
getVentaById(id)
    .then((response) => { llenarCampos(response) });

function llenarCampos(data){
    let id=document.querySelector('.noFactura')
    let fecha=document.querySelector('.fecha')
    let paciente=document.querySelector('.paciente')
    let empleado=document.querySelector('.empleado')
    let medicamentos=document.querySelector('.medsFactura')
    let campoTotal=document.querySelector('.total')
    let identificacionPaciente=document.querySelector('.identificacion')
    id.innerHTML=`Factura No.${data.id}`
    let fechaInfo=data.fechaVenta.substring(0,10);
    let total=0;
    fecha.innerHTML=fechaInfo
    console.log(data.paciente.nombre);
    paciente.innerHTML=data.paciente.nombre
    empleado.innerHTML=data.empleado.nombre
    identificacionPaciente.innerHTML=data.paciente.numIdentificacion
    data.medicamentosVendidos.forEach(element => {
        getMedicamentoById(element.medicamentoId).then((response)=>{
            medicamentos.innerHTML+=`
            <div class="row mt-3">
                                <div class="col-xl-4 d-flex justify-content-center">
                                    ${response.nombre}
                                </div>
                                <div class="col-xl-4 d-flex justify-content-center">
                                    ${element.cantidadVendida}
                                </div>
                                <div class="col-xl-4 d-flex justify-content-center">
                                ${element.precio}
                                </div>
                            </div>
            `
            total+=element.precio
            campoTotal.innerHTML=total
        })
        
    });
    
}
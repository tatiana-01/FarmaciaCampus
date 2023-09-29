import { getCompraById, getMedicamentoById } from "../Apis/ApiFarmacia/compra-serviceApi.js";

let params = new URL(document.location).searchParams;
let idCod = parseInt(params.get("idCod"));
console.log(idCod);
getCompraById(idCod)
    .then((response) => { llenarCampos(response) });

function llenarCampos(data){
    let id=document.querySelector('.noFactura')
    let fecha=document.querySelector('.fecha')
    let proveedor=document.querySelector('.proveedor')
    let medicamentos=document.querySelector('.medsFactura')
    let campoTotal=document.querySelector('.total')
    let identificacionProveedor=document.querySelector('.identificacion')
    id.innerHTML=`Factura No.${data.id}`
    let fechaInfo=data.fechaCompra.slice(0,-9);
    let total=0;
    fecha.innerHTML=fechaInfo
    proveedor.innerHTML=data.proveedor.nombre
    identificacionProveedor.innerHTML=data.proveedor.numIdentificacion
    data.medicamentosComprados.forEach(element => {
        getMedicamentoById(element.medicamentoId).then((response)=>{
            medicamentos.innerHTML+=`
            <div class="row mt-3">
                                <div class="col-xl-4 d-flex justify-content-center">
                                    ${response.nombre}
                                </div>
                                <div class="col-xl-4 d-flex justify-content-center">
                                    ${element.cantidadComprada}
                                </div>
                                <div class="col-xl-4 d-flex justify-content-center">
                                ${element.precioCompra}
                                </div>
                            </div>
            `
            total+=element.precioCompra;
            campoTotal.innerHTML=total;
        })
        
    });
    
}
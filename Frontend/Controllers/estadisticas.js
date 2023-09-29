import { getComprasMeds, getProveedorMasMed, getMedMenos, getMedsTrimestre, getVentasEmpleados, getClienteGastador} from '../Apis/apiTatiana.js';
let total=0;
getProveedorMasMed().then((response)=>{
    let data=response[0]
    getComprasMeds().then((response)=>{
        response.registers.forEach(element => {
            element.medicamentosComprados.forEach((med)=>{
                total+=med.cantidadComprada
                console.log(typeof med.cantidadComprada);
            })
        });
        console.log(total);
        document.querySelector('.proveedor').innerHTML=data.nombre
    document.querySelector('.cantidadProveedor').innerHTML=`${data.totalMedicamentosSuministrados} medicamentos`
    document.querySelector('.barraProveedor').dataset.value=`${(data.totalMedicamentosSuministrados*100)/total}%`
    console.log(`${(data.totalMedicamentosSuministrados*100)/total}%`);
    document.querySelector('.labelProveedor').innerHTML=`${(data.totalMedicamentosSuministrados*100)/total}%`
    const allProgress = document.querySelectorAll('main .card .progress');
        allProgress.forEach(item=> {
            item.style.setProperty('--value', item.dataset.value)
        })
    })
    
    
})

getMedMenos().then((response)=>{
    let data=response[0]
    document.querySelector('.proveedorMenos').innerHTML=data.proveedor
    document.querySelector('.cantidadMenos').innerHTML=`${data.totalVentas} medicamentos`
    document.querySelector('.medMenosVendido').innerHTML=data.nombre
})

getMedsTrimestre().then((response)=>{
    console.log(response);
    document.querySelector('.medsTrimestre').innerHTML=`se vendieron ${response[1].totalMedicamentosVendidos} medicamentos`
})

getVentasEmpleados().then((response)=>{
    let totalVentas=0;
    let ventas=[]
    response.forEach(element => {
        totalVentas+=element.cantidadDeVentas
        console.log(element.cantidadDeVentas);
        ventas.push(element.cantidadDeVentas)
    });
    let maximo=Math.max(ventas)
    response.forEach(element=>{
        element.cantidadDeVentas==maximo
        document.querySelector('.empleado').innerHTML=element.infoEmpleado.nombre
        document.querySelector('.ventasEmpleado').innerHTML=`con ${element.cantidadDeVentas} ventas`
        document.querySelector('.porcentajeVentas').dataset.value=`${(element.cantidadDeVentas*100)/totalVentas}%`
        document.querySelector('.labelPorcentaje').innerHTML=`${(element.cantidadDeVentas*100)/totalVentas}%`

        const allProgress = document.querySelectorAll('main .card .progress');
        allProgress.forEach(item=> {
            item.style.setProperty('--value', item.dataset.value)
        })
    })
})

getClienteGastador().then((response)=>{
    document.querySelector('.clienteFiel').innerHTML=`${response.paciente.nombre} es nuestro cliente fiel`
        document.querySelector('.gastoCliente').innerHTML=`con un total de ${response.totalGastado} invertido en su salud`
})
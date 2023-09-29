import { getDataVenta, postDataVenta, putDataVenta, deleteDataVenta, getVentaById } from '../Apis/apiVenta.js';
import { getDataProducto, postDataProducto, putDataProducto, deleteDataProducto, getDataEmpleado, getProductoById, getEmpleadoById } from '../Apis/apiProductoo.js';
import { getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais, getPaisById, getDepartamentoById, getPacienteById } from '../Apis/apiPaciente.js';
class SideBarPaciente extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.sethref();

        // this.redireccionarPagina();
        /* this.postDataVenta();
       this.eventoSelects(); */
    }

    render() {
        this.innerHTML =/*html*/`
        <a href="#" class="brand noLine"><i class='bx bxs-smile icon'></i> AdminSite</a>
		<ul class="side-menu">
			<li><a  href="#" class="active noLine home"><i class='bx bxs-dashboard icon' ></i> Home</a></li>
			<li class="divider" data-text="main">Main</li>
			<li><a class="noLine" href="#" id="datos" class="noLine "><i class='bx bxs-widget icon' ></i> Mis Datos</a></li>
			<li><a class="noLine" href="#" id="compras" class="noLine"><i class='bx bx-table icon' ></i> Mis Compras</a></li>
		</ul>
          `
    }

    sethref() {
        let params = new URL(document.location).searchParams;
        let id = parseInt(params.get("id"));
        let datos=document.querySelector('#datos')
        let compras=document.querySelector('#compras')
        let brand=document.querySelector('.brand')
        let home=document.querySelector('.home')
        datos.href=`./PacienteDatos.html?id=${id}`
        compras.href=`./comprasPaciente.html?id=${id}`
        brand.href=`../indexPaciente.html?id=${id}`
        home.href=`../indexPaciente.html?id=${id}`
    }

   

};
customElements.define('sidebar-paciente', SideBarPaciente);
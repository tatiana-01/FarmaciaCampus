import './components/navBar.js';
import './components/sideBar.js';
import { FrmProveedor } from './components/Forms/frmProveedor.js';
import { ListaProveedor } from './components/Listas/listaProveedor.js';
import { getProveedor } from './Apis/ApiFarmacia/proveedor-serviceApi.js';
import { activarDesactivarBoton } from './Controllers/activarDesactivarBoton.js';

document.addEventListener('DOMContentLoaded', () => {
    //initMenu();
    activarDesactivarBoton();
    //listarIdTeamSelect();
});
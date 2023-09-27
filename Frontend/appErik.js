import './components/navBar.js';
import './components/sideBar.js';
import { FrmProveedor } from './components/Forms/frmProveedor.js';
import { ListaProveedor } from './components/Listas/listaProveedor.js';
import { activarDesactivarBoton, listarPaises} from './Controllers/activarDesactivarBoton.js';

document.addEventListener('DOMContentLoaded', () => {

    activarDesactivarBoton();
    listarPaises();
    
});
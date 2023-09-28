import './components/navBar.js';
import './components/sideBar.js';
import { FrmProveedor } from './components/Forms/frmProveedor.js';
import { ListaProveedor } from './components/Listas/listaProveedor.js';
import { activarDesactivarBoton, listarPaises} from './Controllers/activarDesactivarBoton.js';
import { FrmUsuarioProveedor } from './components/Forms/frmUsuarioProveedor.js';
import { ListaUsuario } from './components/Listas/listaUsuario.js';

document.addEventListener('DOMContentLoaded', () => {

    activarDesactivarBoton();
    listarPaises();
    
});
import './components/navBar.js';
import './components/sideBar.js';
import './components/meds.js';
import { FrmProveedor } from './components/Forms/frmProveedor.js';
import { ListaProveedor } from './components/Listas/listaProveedor.js';
import { activarDesactivarBoton, listarPaises } from './Controllers/activarDesactivarBoton.js';
import { FrmUsuarioProveedor } from './components/Forms/frmUsuarioProveedor.js';
import { ListaUsuario } from './components/Listas/listaUsuario.js';
import { FrmCompra } from './components/Forms/frmCompra.js';
import { ListaCompra } from './components/Listas/listaCompra.js';
import { FrmMedicamento } from './components/Forms/frmMedicamento.js';

document.addEventListener('DOMContentLoaded', () => {
    
    activarDesactivarBoton();
    listarPaises();
    
});
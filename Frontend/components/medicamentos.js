import { getDataProducto, postDataProducto, putDataProducto, deleteDataProducto, getDataEmpleado, getProductoById } from '../Apis/apiProductoo.js';
import { getUserByUsername, getEmpleadoById, getProveedorById } from '../Apis/apiProductoo.js';
import { getPacienteById } from '../Apis/apiPaciente.js';
class Medicamentos extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.getApiMedicamentos();
        

        // this.redireccionarPagina();
        /* this.postDataDepartamento();
       this.eventoSelects(); */
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="container mt-4">
            <div class="row  todosMeds">
            </div>
        </div>
          `
    }

    getApiMedicamentos() {
        getDataProducto()
            .then((response) => { this.mostrarMedicamentos(response) });
    }

    mostrarMedicamentos(data) {
        let mainSection = document.querySelector(".todosMeds");
        let template = ""
        data.forEach(element => {
            const { nombre, precio, stock } = element;
            if (stock > 0) {
                template += `
                <div class="col-lg-6 col-md-12 col-md-6 col-xl-3 mt-4 d-flex justify-content-center">
                <div class="card" style="width: 18rem;">
                    <img src="./Inicio/images/meds.png" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between"><p>Precio</p><p>${precio}</p></li>
                    </ul>
                </div>
            </div>
            `
            }


        });
        mainSection.innerHTML = template;
    }

    
};
customElements.define('medicamentos-inicio', Medicamentos);
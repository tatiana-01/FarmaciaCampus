import { getDataCompra, getCompraById, deleteDataCompra } from "../../Apis/ApiFarmacia/compra-serviceApi.js";

export { ListaCompra };
class ListaCompra extends HTMLElement {
    constructor() {
        super();
        this.listaCompra();
        this.cargarDatosCompra();

    }
    listaCompra() {
        this.innerHTML = /* html */ `
            <div class="container mt-4">
                <header class="headPricipal row">
                </header>
                <section class=" mainContent row">
                <div class="col sm-12">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Fecha Compra</th>
                            <th scope="col">Proveedor</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody id="datosCompra">
                        
                        </tbody>
                    </table>
        
                </div>
        
                </section>
            </div>
        `;
    }

    cargarDatosCompra = () => {
        getDataCompra()
            .then((data) => {
                console.log(data)
                this.mostraDatosCompra(data.registers);
            })
    }

    mostraDatosCompra(data) {
        console.log(data);
        let mainSection = document.querySelector('#datosCompra');
        let template = ""
        data.forEach(element => {
            const { proveedor, fechaCompra, id } = element;
            let fecha = fechaCompra.slice(0, -9);
            template += /* html */ `
            <tr>
                <td scope="row">${id}</td>
                <td>${fecha}</td>
                <td scope="row">${proveedor.nombre}</td>
                <td>
                    <button data-id="${id}" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#editarModal" id="${id}">Editar</button>

                    <button data-id="${id}" id="masInfoComp" class="btn btn-success masInfoComp">Mas Info</button>
                </td>
            </tr>
            `
            
        });

        mainSection.innerHTML = template;
        console.log(template);
        this.redireccionarPagina();
        this.editarLaCompra();
    }

    redireccionarPagina() {
        let mas = document.querySelectorAll('.masInfoComp')
        mas.forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.location = `masInfoCompra.html?idCod=${e.target.dataset.id}`
            })
        })

    }

    editarLaCompra = () => {
        document.querySelectorAll('.editar').forEach((editarCompra) => {
            editarCompra.addEventListener('click', (e) => {
                let idCod = e.target.id;
                alert("Esta en construccion :(");
                e.preventDefault();
            });
        });
    }



}
customElements.define('list-compra-medic', ListaCompra);
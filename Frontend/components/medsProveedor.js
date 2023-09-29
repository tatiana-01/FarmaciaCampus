import { getMedsExpiranAntes2024, getProveedorName, getProveedor } from '../Apis/apiTatiana.js';

class MedsProveedor extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.getApiRol();

        // this.redireccionarPagina();
        /* this.postDataRol();
       this.eventoSelects(); */
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="container mt-4">
        <label for="selectPais" class="form-label">Proveedor</label>
        <select class="form-select" id="selectProveedor">
            <option value="0" selected>Seleccione una opcion</option>
        </select>
            <header class="headPricipal row">
            </header>
            <section class=" mainContent row mt-4">
              <div class="col sm-12">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">nombre medicamento</th>
                        <th scope="col">fecha expiracion</th>
                        <th scope="col">stock</th>
                        <th scope="col">precio</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                </table>
      
              </div>
      
            </section>
          </div>
        </div>
          `
    }

    getApiRol() {
        getProveedor()
            .then((response) => { this.selectLlenado(response.result, '#selectProveedor') });
    }

    selectLlenado = (data, selectID) => {
        console.log(data);
        let select = document.querySelector(selectID);
        select.innerHTML = '';
        const itemStart = document.createElement('option');
        itemStart.innerHTML = 'Seleccione una opcion'
        itemStart.selected;
        select.appendChild(itemStart);

        data.forEach(element => {
            const item = document.createElement('option');
            item.value = element.nombre;
            item.innerHTML = element.nombre;
            select.appendChild(item);
        });
        this.mostrarTablaRoles()
    }

    mostrarTablaRoles() {
        let select = document.querySelector('#selectProveedor')
        select.addEventListener('change', (e) => {
            console.log(e.target.value);
            getProveedorName(e.target.value).then((response) => {
                console.log(response);
                let mainSection = document.querySelector("tbody");
                let template = ""
                response.forEach(element => {
                    const { nombre, id, stock, fechaExpiracion, precio } = element;
                    let fecha = fechaExpiracion.substring(0, 10)
                    template += `
            <tr>
                <td scope="row">${id}</td>
                <td scope="row">${nombre}</td>
                <td scope="row">${fecha}</td>
                <td scope="row">${stock}</td>
                <td scope="row">${precio}</td>
            </tr>
            `


                });
                mainSection.innerHTML = template;
            })

        })


    }




};
customElements.define('lista-meds-proveedor', MedsProveedor);
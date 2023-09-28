import {getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais,  getPaisById} from '../Apis/apiPaciente.js';
import { getDataDepartamento, postDataDepartamento, putDataDepartamento, deleteDataDepartamento, getDepartamentoById } from '../Apis/apiDepartamento.js';
class FrmDepartamento extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.getPaises()
        this.postDepartamento();
    }

    render() {
        this.innerHTML =/*html*/`
        <div class="container mt-5" id="departamentoForm">
        <div class="card">
            <div class="card-header">
                Departamento
            </div>
            <div class="card-body">
                <h5 class="card-title">Ingrese los datos del departamento</h5>
                <div class="container mb-3">
                    <form id="formDepartamento">
                            <div class="row">
                                <div class=" mb-3 col-6">
                                    <label for="NombreDepartamento" class="form-label">Nombre Departamento</label>
                                    <input type="text" aria-label="First name" class="form-control" name="nombre">
                                </div>
                                <div class=" mb-3 col-6">
                                    <label for="selectPais" class="form-label">Pais</label>
                                    <select class="form-select" id="selectPais" name="paisId">
                                        <option value="0" selected>Seleccione una opcion</option>;
                                    </select>
                                </div>
    
                            </div>
                           
                            <div class="botonEnviarDepartamento">
                                <button type="submit" class="btn enviar">Enviar</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`
    }

   getPaises(){
   
        getDataPais().then((response)=>{
            this.selectLlenado(response.registers,'#selectPais')
        })
   }
   selectLlenado = (data,selectID) =>{
    let select=document.querySelector(selectID);
    select.innerHTML='';
    const itemStart=document.createElement('option');
    itemStart.innerHTML='Seleccione una opcion'
    itemStart.selected;
    select.appendChild(itemStart);

        data.forEach(element => {
            const item= document.createElement('option');
            item.value=element.id;
            item.innerHTML=element.nombre;
            select.appendChild(item);
        });
    }

    postDepartamento(){
        let btn=document.querySelector('.enviar')
        btn.addEventListener('click',(e)=>{
            let form=document.querySelector('#formDepartamento')
            let dataDpto= Object.fromEntries(new FormData(form));
            postDataDepartamento(dataDpto).then((response)=>{
                console.log(response);
            })
            e.preventDefault();
           
        })
        
    }
};
customElements.define('frm-departamento', FrmDepartamento);
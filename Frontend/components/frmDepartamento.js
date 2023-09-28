/* import { CuerpoApoyo } from '../app/CuerpoApoyo.js';
let cuerposApoyo=[]; */
class FrmDepartamento extends HTMLElement {
    constructor() {
        super();
        this.render();
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
                                    <input type="text" aria-label="First name" class="form-control" name="NombreDepartamento">
                                </div>
                                <div class=" mb-3 col-6">
                                    <label for="selectPais" class="form-label">Pais</label>
                                    <select class="form-select" id="selectPais">
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

    /*  saveData = () =>{
         document.querySelector('#guardarDataCuerpo').addEventListener('click',(e)=>{
         const idCuerpo = document.querySelector('#codCuerpo')
         const frmDataCuerpo=document.forms['frmCuerpoApoyo'];
         const nombre=frmDataCuerpo['txtNombreCuerpo'];
         const fecha=frmDataCuerpo['txtFechaCuerpo'];
         const email=frmDataCuerpo['txtEmailCuerpo'];
         const ciudad=frmDataCuerpo['txtCiudadCuerpo'];
         const año=frmDataCuerpo['txtAñoCuerpo'];
         const especialidad=frmDataCuerpo['txtEspecialidad'];
         const cargo= frmDataCuerpo['txtCargo'];
         const idequipo= frmDataCuerpo['txtIdEquiCuerpo'];
         const foto= frmDataCuerpo['txtFotoCuerpo'];
         let CApoyo = new CuerpoApoyo(this.dateToJulian(new Date()),nombre.value, fecha.value, email.value, ciudad.value,año.value,especialidad.value, cargo.value,idequipo.value,foto.files[0].name);
         cuerposApoyo.push(CApoyo);
         console.log(cuerposApoyo);
         localStorage.setItem("cuerposApoyo",JSON.stringify(cuerposApoyo))
         idCuerpo.innerHTML=CApoyo._id;
     });
 }
 regCuerpoEventClick = () =>{
     document.querySelector('#regCuerpo').addEventListener('click',(e) => {
         let data = JSON.parse(e.target.dataset.verocultar);
         let cardVer = document.querySelector(data[0]);
         cardVer.style.display = 'block';
         data[1].forEach(card => {
             let cardActual = document.querySelector(card);
             cardActual.style.display = 'none';
         });
         e.stopImmediatePropagation();
         e.preventDefault();
     })
 }
 listCuerpoEventClick = () =>{
     document.querySelector('#listCuerpo').addEventListener('click',(e) => {
         let data = JSON.parse(e.target.dataset.verocultar);
         let cardVer = document.querySelector(data[0]);
         cardVer.style.display = 'block';
         data[1].forEach(card => {
             let cardActual = document.querySelector(card);
             cardActual.style.display = 'none';
         });
         e.stopImmediatePropagation();
         e.preventDefault();
         this.cargarCuerposApoyo();
     })
 }
 cargarCuerposApoyo= ()=>{
     let cuerposApoyoHTML = '';
     for(let cuerpo of cuerposApoyo){
         cuerposApoyoHTML += this.cuerposApoyoHTML(cuerpo);
     
     }
     document.getElementById('cardCuerpo').innerHTML = cuerposApoyoHTML;
     
 } */
    //cuerposApoyoHTML = (cuerpo)=>{
    //   let cuerposApoyoHTML =/*html*/ `
    /*    <div class="col-xxl-3 col-lg-4 col-md-6 mb-4" style="display:flex; justify-content:center;" >
           <div class="card" style="width: 18rem;">
               <div class="container text-center mt-3" style="height: 10rem; ">
                   <img src="images/logos/${cuerpo._foto}" class="card-img-top" id="imgCard" alt="..."  style="max-height: 100%; width: auto;">
               </div>
                   <div class="card-body">
                   <h5 class="card-title">${cuerpo._nombre}</h5>
                   <div class="row">
                       <div class="col-6">
                           <a href="#" class="btn btn-success">Mas info</a>
                       </div>
                       <div class="col-6">
                           <a href="#" class="btn btn-danger">Eliminar</a>
                       </div>
                   </div>
                   </div>
           </div>              
       </div>
       `;
       return cuerposApoyoHTML;
   } */

};
customElements.define('frm-departamento', FrmDepartamento);
import {getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais,  getPaisById, getDepartamentoById, registerPaciente} from '../Apis/apiPaciente.js';
    getDataPais()
    .then((response) => {selectPais(response.registers)});

eventoSelects();
postPaciente();
function eventoSelects(){
    let selectPais=document.querySelector('#selectPais');
    let selectDepartamento=document.querySelector('#selectDepartamento');
    let selectCiudad=document.querySelector('#selectCiudad');
    selectPais.addEventListener('change',(e)=>{
        selectCiudad.innerHTML='<option value="0" selected>Seleccione una opcion</option>'
        getPaisById(e.target.value)
        .then((response) => {cambioSelects(response)});
    })
}

function cambioSelects(data){
    selectLlenado(data.departamentos,'#selectDepartamento')
    let selectDepartamento=document.querySelector('#selectDepartamento');
    selectDepartamento.addEventListener('change',(e)=>{
        getDepartamentoById(e.target.value)
        .then((response) => {selectLlenado(response.ciudades,'#selectCiudad')});
    })
}

function selectLlenado (data,selectID) {
    console.log(data);
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

function selectPais(data) {
    let select=document.querySelector('#selectPais');
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

function postPaciente(){
    let formPersonal=document.querySelector('#formPaciente');
    let formDireccionPaciente=document.querySelector('#formDireccionPaciente');
    let boton=document.querySelector('#savePaciente');
    boton.addEventListener('click',(e)=>{
        //let token='eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0YXRpYW5hIiwianRpIjoiYzkxY2JjZTMtNjU0Zi00YTkzLWFjNDgtNzVjYjg1ZDRiYmRkIiwiZW1haWwiOiJ0YXRpYW5hQGdtYWlsLmNvbSIsInVpZCI6IjEiLCJyb2xlcyI6WyJHZXJlbnRlIiwiUGVyc29uYSJdLCJleHAiOjE2OTU3MzkxNzcsImlzcyI6IkFwaUZhcm1hY2lhIiwiYXVkIjoiQXBpRmFybWFjaWEifQ.TsjWtu4vmMwGtC42vaIVcGA_4iJSJ0FvvDXerLVcI6g';
        let data=[];
        let dataPersonal=Object.fromEntries(new FormData(formPersonal));
        let dataDireccion=Object.fromEntries(new FormData(formDireccionPaciente));
        let divRegister=document.querySelector('.pacienteRegister')
        let divUser=document.querySelector('.usuarioPaciente')
        dataDireccion.ciudadId=document.querySelector("#selectCiudad").value;
        dataPersonal.Direccion=dataDireccion;
        data.push(dataPersonal);
        console.log(dataPersonal);
       
            postDataPaciente(data).then((response)=>{
                if(response=="error"){
                    alert("Ocurrio un error al momento de registrar, recuerde por favor llenar todos los campos")
                }else{
                    alert("se registro correctamento los datos, por favor continue a la creacion de su usuario")
                    divRegister.classList.add('d-none')
                    divUser.classList.remove('d-none')
                    document.querySelector('.client_taital').innerHTML="Crea tu usuario"
                    console.log(response);
                    registrarUsuario(response)
                }
            })
       
       
        //location.reload();
    })

    function registrarUsuario(data){
        let btnUsuario = document.querySelector('.enviarUsuario')
    btnUsuario.addEventListener('click', (e) => {
    
            let dataUsuario = Object.fromEntries(new FormData(document.querySelector('#formUsuario')));
            console.log(data[0].id);
            registerPaciente(dataUsuario, data[0].id).then((response) => {
               if(response.rta.includes('exitosamente')){
                alert(response.rta)
                window.location=`./contact.html`
               }else{
                alert(response.rta)
               }
            }).catch((error)=>{
                alert('Ocurrio un error en la creacion del usuario, por favor asegurese de llenar todos los campos')
            })
            
       
  
        /* getDataPais().then((response) => { selectPais(response.registers) });
        getPacienteById(id).then((response) => fillModalEdit(response));
        eventoSelects(); */
    })
    }
}

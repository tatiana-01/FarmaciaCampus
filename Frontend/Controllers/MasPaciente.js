import {getDataPaciente, postDataPaciente, putDataPaciente, deleteDataPaciente, getDataCiudad, getDataPais,  getPaisById, getDepartamentoById} from '../Apis/apiPaciente.js';

    getDataPaciente()
    .then((response) => {llenarCampos(response.result)});


function llenarCampos(data){
    let campos=document.querySelectorAll('p');

    console.log(campos);
}


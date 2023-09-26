//export { activarDesactivarBoton, listarIdTeamSelect };
export { activarDesactivarBoton};

const activarDesactivarBoton = () => {
    document.querySelectorAll(".botonn").forEach((boton) => {
        boton.addEventListener('click', (e) => {
            let botondatos = JSON.parse(e.target.dataset.habilitardesabilitar);
            botondatos[0].forEach(item1 => {
                let botonHabilitar = document.querySelector(item1);
                botonHabilitar.disabled = false;
            });
            botondatos[1].forEach(item2 => {
                let botonDesabilitar = document.querySelector(item2);
                botonDesabilitar.disabled = true;
            });

            //e.preventDefault();
            //e.stopImmediatePropagation();
        });
    });
}

//--------llenamos el selector de Id de los TEAM para los CAMPERS--------
//----listar datos del team-------------
const listarIdTeamSelect = () => {
    getTeam()
        .then((data)=>{
            console.log(data)
            cargarIdTeam1(data);
        })
}

//-----cargamos los Id para el selector de CAMPERS-
function cargarIdTeam1(datosTeam) {
    document.querySelectorAll('#id_team').forEach((itemSelectGenero) => {
        console.log(datosTeam);
        datosTeam.forEach(itemTeam => {
            const item = document.createElement('option');
            item.value = itemTeam.id;
            item.innerHTML = itemTeam.id;
            itemSelectGenero.appendChild(item);
        });
    });
}
//------------------------------------------------------------------------
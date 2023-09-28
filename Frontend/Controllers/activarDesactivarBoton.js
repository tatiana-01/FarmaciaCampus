import { getDataPais, getDepartamentoById, getPaisById } from "../Apis/ApiFarmacia/proveedor-serviceApi.js";
export { activarDesactivarBoton, listarPaises};

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

            e.preventDefault();
            e.stopImmediatePropagation();
        });
    });
}

//--------llenamos el selector de Id de los provedores---------------------
//----obtener los datos del Paises-----------------------------------------
const listarPaises = () => {
    getDataPais()
        .then((data)=>{
            console.log(data.registers);
            cargarIdPais(data.registers);
        })
}

//-----cargamos los paises en el select------------------------------------
function cargarIdPais(datosPais) {
    document.querySelectorAll('#pais').forEach((itemSelectPais) => {
        console.log(datosPais);
        datosPais.forEach(itemPais => {
            const item = document.createElement('option');
            item.value = itemPais.id;
            item.innerHTML = itemPais.nombre;
            itemSelectPais.appendChild(item);
        });
        itemSelectPais.addEventListener('change', (e) => {
            getPaisById(e.target.value)
                .then((data) => {
                    console.log(data.departamentos);
                    cargarDepartamentos(data.departamentos);
                })
        });
    });
}

//----------------cargamos los departamentos en el select--------------------
function cargarDepartamentos(datoDept) {
    document.querySelectorAll('#departamento').forEach((itemSelectDept) => {
        const options = itemSelectDept.querySelectorAll('option')
        options.forEach(elemento => {
            itemSelectDept.removeChild(elemento);
        });
        const newOptions = document.createElement('option');
        newOptions.innerHTML = "Departamento";
        newOptions.selected;
        itemSelectDept.appendChild(newOptions);
        datoDept.forEach((itemDept) => {
            const item = document.createElement('option');
            item.value = itemDept.id;
            item.innerHTML = itemDept.nombre;
            itemSelectDept.appendChild(item);
        });
        itemSelectDept.addEventListener('change', (e) => {
            getDepartamentoById(e.target.value)
                .then((data) => {
                    console.log(data.ciudades);
                    cargarCiudades(data.ciudades);
                })
        });
        
    });
}

//----------------cargamos las ciudades en el select--------------------------
function cargarCiudades(datoCiud) {
    document.querySelectorAll('#ciudad').forEach((itemSelectCiud) => {
        const options = itemSelectCiud.querySelectorAll('option')
        options.forEach(elemento => {
            itemSelectCiud.removeChild(elemento);
        });
        const newOptions = document.createElement('option');
        newOptions.innerHTML = "Ciudad";
        newOptions.selected;
        itemSelectCiud.appendChild(newOptions);
        datoCiud.forEach((itemCiud) => {
            const item = document.createElement('option');
            item.value = itemCiud.id;
            item.innerHTML = itemCiud.nombre;
            itemSelectCiud.appendChild(item);
        });
    });
}
//-----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded",()=>{
    var formulario = document.getElementById("form-registroEmpleado");

    formulario.addEventListener("submit",(e)=>{
        e.preventDefault();

        var formData = new FormData(formulario);

        console.log(formData.get("nombre"));
    })
})
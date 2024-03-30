
//alert("Si se ligo el JS para validaciones :) !!!")
//Referencia al DOM
const idCliente = document.getElementById("identificacion")
const nombre = document.getElementById("nombre")
const primerApellido = document.getElementById("primerApellido")
const segundoApellido = document.getElementById("segundoApellido")
const correo = document.getElementById("correo")
const telefono = document.getElementById("telefono")
const contrasenna = document.getElementById("contrasenna")

//crear una funcion para validar campos vacios
function validarCamposVacios(){
    //recordar que "segundoApellido" NO es requerido 
    let camposRequeridos = document.querySelectorAll("#formularioCuentaCliente [required]")
    let error = false

    for (let i=0; i< camposRequeridos.length;i++){
        if(camposRequeridos[i].value==""){
            error=true
        }

    }





}



//validar identificacion
function validarNombre(){

}


function validarIdentificacion(){
}
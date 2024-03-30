
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
            camposRequeridos[i].classList.add("error")
        }else{
            camposRequeridos[i].classList.remove("error")
        }
    }
    return error

}

//validar nombre
function validarNombre(){
    let error = false
    let imput


}

//validar identificacion
function validarIdentificacion(){
}
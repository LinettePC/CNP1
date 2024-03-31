
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

//validar identificacion
function validarIdentificacion(){
}

//funcion para validar nombre
function validarNombre(){
    let error = false
    let inputNombre = nombre.value
    let expresion = /^[a-zA-ZáéíóúñÑü]+$/
    if(expresion.test(inputNombre)==false){
        error = true
        nombre.classList.add("error")
    }
    return error
}

//funcion para validar primerApellido
function validarPrimerApellido(){
    let error = false
    let inputPrimerApellido = primerApellido.value
    let expresion = /^[a-zA-ZáéíóúñÑü]+$/
    if(expresion.test(inputPrimerApellido)==false){
        error = true
        primerApellido.classList.add("error")
    }
    return error
}
//funcion para validar correo

//funcion para validar telefono

//funcion para validar contrasenna
//debe tener longitud de 8 caracteres




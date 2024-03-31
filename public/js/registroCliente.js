
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
    //para que me seleccione lo que este marcado
    let tipoId = document.querySelector('input[name="tipoIdentificacion"]:checked')
    let seleccionUsuario = tipoId.value

    let inputIdentificacion = idCliente.value
    let error = false
    let expresion 

// evaluar segun el boton que selecciona cliente: cedula, pasaporte o DIMEX
    if(seleccionUsuario=="nacional" || seleccionUsuario=="pasaporte"){
        expresion = /^[0-9]{9}$/
    }else if(seleccionUsuario=="dimex"){
        expresion = /^[0-9]{12}$/
    }
// evaluar todos los tipos de identificaciones
    if(expresion.test(inputIdentificacion)==false){
        error=true
        idCliente.classList.add("error")
    }
    return error
    
    
    
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

//FUNCION para validar primerApellido
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
//FUNCION para validar correo
function validarCorreo(){
    let error = false
    let inputCorreo = correo.value
    let expresion = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/
    if(expresion.test(inputCorreo)==false){
        error = true
        correo.classList.add("error")
    }
    return error
}

//FUNCION para validar telefono
function validarTelefono(){
    let error = false
    let inputTelefono = telefono.value
    let expresion = /^[0-9]{8}$/
    if(expresion.test(inputTelefono)==false){
        error = true
        telefono.classList.add("error")
    }
    return error
}


//FUNCION para validar contrasenna
// ^(?=.*[bcdfghjklmnñpqrstvwxyz])(?=.*[BCDFGHJKLMNÑPQRSTVWXYZ])(?=.*[0-9])(?=.*[!@#$%^&*()-_+]).{8}
//debe tener como minimo de 8 caracteres
//no puede tener vocales
//debe tener al menos 1 consonante (al menos una mayuscula, al menos una minuscula)
//debe tener al menos 1 caracter especial
//debe tener al menos 1 numero
function validarContrasenna(){
    let error = false
    let inputContrasenna = contrasenna.value
    let expresion = /^(?=.*[bcdfghjklmnñpqrstvwxyz])(?=.*[BCDFGHJKLMNÑPQRSTVWXYZ])(?=.*[0-9])(?=.*[!@#$%^&*()-_+]).{8,}/
    if(expresion.test(inputContrasenna)==false){
        error=true
        contrasenna,classList.add("error")
    }
    return error   
}


//Autor: Linette
//alert("Si se ligo el JS para validaciones :) !!!")
//Referencia al DOM
const idCliente = document.getElementById("identificacion")
const nombre = document.getElementById("nombre")
const primerApellido = document.getElementById("primerApellido")
// const segundoApellido = document.getElementById("segundoApellido")
const correo = document.getElementById("correo")
const telefono = document.getElementById("telefono")
const contrasenna = document.getElementById("contrasenna")
const boton = document.getElementById("botonEnviar")

//crear una funcion para validar campos vacios
function validarCamposVacios(){
    //recordar que "segundoApellido" NO es requerido 
    let camposRequeridos = document.querySelectorAll("#formularioCuentaCliente [required]")
    let error = false

    for (let i=0;i<camposRequeridos.length;i++){
    // for (let i=0; i<6;i++){
        if(camposRequeridos[i].value==""){
            error=true
            camposRequeridos[i].classList.add("error")
        }
        else{
            camposRequeridos[i].classList.remove("error")
        }
    }
    return true
}

//validar identificacion
function validarIdentificacion(){
    //para que me seleccione lo que este marcado
    const tipoId = document.querySelector('input[name="tipoIdentificacion"]:checked')
    let seleccionUsuario = tipoId.value

    let inputIdentificacion = idCliente.value
    let error = false
    let expresion 

// evaluar segun el boton que selecciona cliente: cedula, pasaporte o DIMEX
    // if(seleccionUsuario=="nacional" || seleccionUsuario=="pasaporte"){
    if(seleccionUsuario=="nacional"){
        expresion = /^[0-9]{9}$/
    }else if(seleccionUsuario=="dimex"){
        expresion = /^[0-9]{12}$/
    }
// evaluar todos los tipos de identificaciones
    if(expresion.test(inputIdentificacion)==false){
        error=true
        idCliente.classList.add("error")
    }else{
        idCliente.classList.remove("error")
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
    }else{
        nombre.classList.remove("error")
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
    }else{
        primerApellido.classList.remove("error")
    }
    return error
}
//FUNCION para validar correo
function validarCorreo(){
    let error = false
    let inputCorreo = correo.value
    //let expresion = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    // let expresion = /^[a-zA-ZáéíóúñÑü]+$/
    let expresion = /^[a-zA-Z0-9]+\@*[a-zA-Z0-9]\@{1}[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+$/
    if(expresion.test(inputCorreo)==false){
        error = true
        correo.classList.add("error")
    }else{
        correo.classList.remove("error")
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
    }else{
        telefono.classList.remove("error")
    }
    return error
}

//FUNCION para validar contrasenna
//debe tener como minimo de 8 caracteres
//no puede tener vocales
//debe tener al menos 1 consonante (al menos una mayuscula, al menos una minuscula)
//debe tener al menos 1 caracter especial
//debe tener al menos 1 numero
function validarContrasenna(){
    let error = false
    let inputContrasenna = contrasenna.value
    let expresion = /^(?=.*[bcdfghjklmnñpqrstvwxyz])(?=.*[BCDFGHJKLMNÑPQRSTVWXYZ])(?=.*[0-9])(?=.*[!@#$%^&*()-_+]).{8,}$/
    if(expresion.test(inputContrasenna)==false){
        error=true
        contrasenna.classList.add("error")
    }else{
        contrasenna.classList.remove("error")
    }
    return error   
}

//funcion para limpiar todos los campos una vez que se envia la informacion
function limpiarCampos(){
    idCliente.value=""
    nombre.value=""
    primerApellido.value=""
    //segundoApellido.value=""
    correo.value=""
    telefono.value=""
    contrasenna.value=""
}


//FUNCION PRINCIPAL ************************************************************************
function principal(){
    //alert("funcion principal sirve")
    let errorCamposVacios = validarCamposVacios()
    let errorId = validarIdentificacion()
    let errorNombre = validarNombre()
    let errorPrimerApellido = validarPrimerApellido()
    let errorCorreo = validarCorreo()
    let errorTelefono = validarTelefono()
    let errorContrasenna = validarContrasenna()

    if(errorCamposVacios){
        // alert("Existen campos vacios")
        Swal.fire({
            title: "Existen Campos Vacíos",
            text: "Completa todos los campos señalados en rojo",
            icon: "warning"
          });  
        }
    else if(errorId){
        Swal.fire({
            title: "La identificacion esta incorrecta",
            text: "Revisa el formato utilizado",
            icon: "warning"
          });
    }
    else if(errorNombre){
        Swal.fire({
            title: "El Nombre es inválido",
            text: "Revisa el formato utilizado",
            icon: "warning"
          });

    }else if(errorPrimerApellido){
        Swal.fire({
            title: "El Primer Apellido es inválido",
            text: "Revisa el formato utilizado",
            icon: "warning"
          });

    }else if(errorCorreo){
        Swal.fire({
            title: "El Correo es inválido",
            text: "Revisa el formato utilizado",
            icon: "warning"
          });

    }else if(errorTelefono){
        Swal.fire({
            title: "El Numero de Telefono es inválido",
            text: "Recuerda que solo debe contener 8 numeros",
            icon: "warning"
          });
    }else if(errorContrasenna){
        Swal.fire({
            title: "La contraseña es inválida",
            text: "Revisa el formato utilizado",
            icon: "warning"
          });
    }else{
        alert("No hay campos vacios")
        Swal.fire({
            title: "Datos correctos",
            text: "Tu Cuenta de Cliente ha sido Creada",
            icon: "success"
          });
        limpiarCampos()
    }
    }



boton.addEventListener("click",principal)
// Swal.fire({
//     title: "Sweet Alert si sirve",
//     text: ":)",
//     icon: "warning"
//   });





const btn_comprar = document.getElementById("boton");
const txt_nombre = document.getElementById("nombre");
const txt_apellidos = document.getElementById("apellidos");
const txt_telefono = document.getElementById("telefono");
const txt_email = document.getElementById("email");
const txt_provincia = document.getElementById("provincia");
const txt_canton = document.getElementById("canton");
const txt_distrito = document.getElementById("distrito");

btn_comprar.addEventListener('click', principal);


function principal() {
 
    let error_campos_vacios = ValidarCamposVacios();
    let error_nombre = ValidarNombre();
    let error_apellidos = ValidarApellidos();
    let error_email = ValidarEmail();
    let error_provincia = ValidarProvincia();
    let error_canton = ValidarCanton();
    let error_distrito = ValidarDistrito();
    let error_telefono = ValidarTelefono();
   
    if (error_campos_vacios) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Debe completar todos los campos",
            icon: "warning",
            confirmButtonText: "Entendido!"
        });
    } else if (error_nombre) {
        Swal.fire({
            title: "Nombre incorrecto",
            text: "Favor revisar el nombre, solo se aceptan letras",
            icon: "warning",
            confirmButtonText: "Entendido!"
        });
    } else if (error_apellidos) {
        Swal.fire({
            title: "Correo incorrecto",
            text: "Favor revisar los apellidos, solo se aceptan letras",
            icon: "warning",
            confirmButtonText: "Entendido!"
        });
    } else if (error_provincia) {
        Swal.fire({
            title: "Provincia incorrecta",
            text: "El campo de Provincia tiene un caracter no valido",
            icon: "warning",
            confirmButtonText: "Entendido!"
        });

    } else if (error_canton) {
        Swal.fire({
            title: "Canton incorrecto",
            text: "El campo de Canton tiene un caracter no valido",
            icon: "warning",
            confirmButtonText: "Entendido!"
        });

    } else if (error_distrito) {
        Swal.fire({
            title: "Distrito incorrecto",
            text: "El campo de Distrito tiene un caracter no valido",
            icon: "warning",
            confirmButtonText: "Entendido!"
        });

    } else if (error_email) {
        Swal.fire({
            title: "Correo incorrecto",
            text: "El correo tiene un formato incorrecto",
            icon: "warning",
            confirmButtonText: "Entendido!"
        });
    } else if (error_telefono) {
        Swal.fire({
            title: "Teléfono incorrecto",
            text: "El telefono tiene que tener el formato 2222-2222",
            icon: "warning",
            confirmButtonText: "Entendido!"
        });
    } else {
        Swal.fire({
            title: "Información Correcta",
            text: "Su solicitud se envió correctamente",
            icon: "success",
        });
    }
    
}

function ValidarCamposVacios(){
    let camposRequeridos = document.querySelectorAll("#inputsDatos [required]")
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
    return error;
}


function ValidarNombre() {
    let error = false;
    let inputNombre = txt_nombre.value;
    let expresion = /^[a-zA-Z\s.,;:'"-]+$/
    if (expresion.test(inputNombre) == false) {
        error = true;
        txt_nombre.classList.add("error");
    } else {
        txt_nombre.classList.remove("error");
    }
    return error;
}

function ValidarApellidos() {
    let error = false;
    let InputApellidos = txt_apellidos.value;
    let expresion = /^[a-zA-Z\s.,;:'"-]+$/
    if (expresion.test(InputApellidos) == false) {
        error = true;
        txt_apellidos.classList.add("error");
    } else {
        txt_apellidos.classList.remove("error");
    }
    return error;
}

function ValidarTelefono() {
    let error = false;
    let input_telefono = txt_telefono.value;
    let expression = /^[0-9]{4}-[0-9]{4}$/;//1111-1111 4329-8523
    if (expression.test(input_telefono) == false) {
        error = true;
        txt_telefono.classList.add("error");
    } else {
        txt_telefono.classList.remove("error");
    }
    return error;
}

function ValidarProvincia() {
    let error = false;
    let inputProvincia = txt_provincia.value;
    let expresion = /^[a-zA-Z\s.,;:'"-]+$/
    if (expresion.test(inputProvincia) == false) {
        error = true;
        txt_provincia.classList.add("error");
   
    } else {
        txt_provincia.classList.remove("error");
    }
    return error;
}

function ValidarCanton() {
    let error = false;
    let inputCanton = txt_canton.value;
    let expresion = /^[a-zA-Z\s.,;:'"-]+$/
    if (expresion.test(inputCanton) == false) {
        error = true;
        txt_canton.classList.add("error");

    } else {
        txt_canton.classList.remove("error");
    }
    return error;
}

function ValidarDistrito() {
    let error = false;
    let inputDistrito = txt_distrito.value;
    let expresion = /^[a-zA-Z\s.,;:'"-]+$/
    if (expresion.test(inputDistrito) == false) {
        error = true;
        txt_distrito.classList.add("error");
     
    } else {
        txt_distrito.classList.remove("error");
    }
    return error;
}

function ValidarEmail() {
    let error = false;
    let email_input = txt_email.value;
    let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (expresion.test(email_input) == false) {
        error = true;
        txt_email.classList.add("error");
      
    } else {
        txt_email.classList.remove("error");
    }
    return error;
}



// Autor: Julio
// DOM listener
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón de envío
    const loginButton = document.getElementById("loginbutton");

    // Agrega un evento de escucha para el evento de clic en el botón de envío
    loginButton.addEventListener("click", function(event) {
        // Previene el envío automático del formulario
        event.preventDefault();

        // Valida los campos antes de enviar el formulario
        if (validarCamposVacios() && validarCorreo()) {
            // Si los campos están completos y el correo es válido, selecciona el formulario y envíalo
            document.getElementById("formLogin").submit();
        }
    });
});

// Esta función valida que no hayan campos vacíos
function validarCamposVacios() {
    let camposRequeridos = document.querySelectorAll(".form-group [required]");
    let error = false;

    camposRequeridos.forEach(campo => {
        if (campo.value.trim() === "") {
            error = true;
            campo.classList.add("error");
        } else {
            campo.classList.remove("error");
        }
    });

    if (error) {
        // Si hay campos vacíos, muestra el mensaje de error con SweetAlert
        Swal.fire({
            title: "Existen Campos Vacíos",
            text: "Completa todos los campos de Usuario y Contraseña",
            icon: "warning"
        });
    }

    return !error;
}

// Validar correo electrónico
function validarCorreo() {
    const correoInput = document.getElementById("correo");
    const correoValue = correoInput.value.trim();
    const correoExpresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoExpresion.test(correoValue)) {
        correoInput.classList.add("error");
        Swal.fire({
            title: "El Correo es inválido",
            text: "Revisa el formato utilizado",
            icon: "warning"
        });
        return false;
    } else {
        correoInput.classList.remove("error");
        return true;
    }
}

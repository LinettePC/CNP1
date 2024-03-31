//Autor: Linette
//dom listener
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón de envío
    const loginButton = document.getElementById("loginbutton");

    // Agrega un evento de escucha para el evento de clic en el botón de envío
    loginButton.addEventListener("click", function(event) {
        // Previene el envío automático del formulario
        event.preventDefault();

        // Valida los campos antes de enviar el formulario
        if (validarCamposVacios()) {
            // Si los campos están completos, selecciona el formulario y envíalo
            document.getElementById("formLogin").submit();
        }
    });
});

//esta función valida que no hayan campos vacíos

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

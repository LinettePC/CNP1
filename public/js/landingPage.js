document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el formulario
    const form = document.querySelector("form");

    // Agrega un evento de escucha para el evento de envío del formulario
    form.addEventListener("submit", function(event) {
        // Previene el envío automático del formulario
        event.preventDefault();

        // Valida los campos antes de enviar el formulario
        if (validarCamposVacios()) {
            // Si los campos están completos, envía el formulario
            form.submit();
        }
    });
});

function validarCamposVacios() {
    let camposRequeridos = document.querySelectorAll("#formularioCuentaCliente [required]");
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
            text: "Completa todos los campos señalados en rojo",
            icon: "warning"
        });
    }

    return !error;
}

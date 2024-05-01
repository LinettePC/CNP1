//funcion para show/hide el login del administrador
document.getElementById('toggleButton').addEventListener('click', function() {
    var contenedor = document.getElementById('ocultar');
    var estilo = window.getComputedStyle(contenedor);
    if (estilo.display === 'none') {
        contenedor.style.display = 'block';
    } else {
        contenedor.style.display = 'none';
    }
});


// Referencias al DOM
const inputs = {
    idAdmin: document.getElementById('username'),
    contrasenna: document.getElementById('password')
};
const botonEnviar = document.getElementById('botonEnviar');

// Función para validar campos vacíos
function validarCamposVacios() {
    let error = false;
    Object.values(inputs).forEach((input) => {
        if (!input.value.trim()) {
            error = true;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (error) {
        Swal.fire({
            title: 'Existen Campos Vacíos',
            text: 'Completa todos los campos señalados en rojo',
            icon: 'warning',
        });
    }

    return !error;
}

// Validar identificación
function validarIdentificacion() {
    // Expresión regular para validar la identificación
    const identificacion = inputs.idAdmin.value.trim();
    const expresion = /^[0-9]{9}$/; // 9 dígitos para identificación nacional
    
    if (!expresion.test(identificacion)) {
        // La identificación no cumple con los requisitos
        Swal.fire({
            title: 'La identificación es incorrecta',
            text: 'Revisa el formato de la identificación.',
            icon: 'warning',
        });
        inputs.idAdmin.classList.add('error');
        return false;
    } else {
        // La identificación cumple con los requisitos
        inputs.idAdmin.classList.remove('error');
        return true;
    }
}

// Event listener para el botón de enviar
botonEnviar.addEventListener('click', function() {
    if (validarCamposVacios() && validarIdentificacion()) {
        // Aquí puedes colocar el código para la funcion del Servicio si todos los campos son válidos
        boton = document.getElementById('submit-button');
		
		const inputs = {
		 	idAdmin: document.getElementById('username'),
		 	contrasenna: document.getElementById('password'),
		};
		validarAdministrador(inputs.idAdmin.value,inputs.contrasenna.value)
		//validarCliente(idCliente,contrasenna)
		limpiarCampos();



        console.log('');
    }
});
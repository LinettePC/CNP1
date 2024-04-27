// Referencias al DOM
const form = document.getElementById('formLogin');
const inputs = {
	idCliente: document.getElementById('username'),
	contrasenna: document.getElementById('password'),
};
const botonEnviar = document.getElementById('submit-button');

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



// Función para validar un campo con una expresión regular
function validarCampo(input, expresion, errorMessage) {
	if (!expresion.test(input.value.trim())) {
		input.classList.add('error');
		Swal.fire({
			title: errorMessage.title,
			text: errorMessage.text,
			icon: 'warning',
		});
		return true;
	}
	input.classList.remove('error');
	return false;
}


// Validar identificación
function validarIdentificacion() {
	const tipoId = document.querySelector(
		'input[name="tipoIdentificacion"]:checked'
	);
	const seleccionUsuario = tipoId ? tipoId.value : null;
	let expresion;
	if (seleccionUsuario === 'nacional') {
		expresion = /^[0-9]{9}$/;
	} else if (seleccionUsuario === 'dimex') {
		expresion = /^[0-9]{12}$/;
	}
	if (expresion) {
		return validarCampo(inputs.idCliente, expresion, {
			title: 'La identificación es incorrecta',
			text: 'Revisa el formato utilizado',
		});
	}
	return false;
}


// Limpiar todos los campos del formulario
function limpiarCampos() {
	Object.values(inputs).forEach((input) => (input.value = ''));
}


// Función principal de validación
function principal() {
	if (
		validarCamposVacios() &&
		!validarIdentificacion()
	) {
		Swal.fire({
			title: 'Datos correctos',
			text: 'Datos correctos',
			icon: 'success',
		});

		idCliente = document.getElementById('username');
		contrasenna = document.getElementById('password');
		boton = document.getElementById('submit-button');

		limpiarCampos();
		
		
	}

}



// Evento de clic en el botón de enviar
botonEnviar.addEventListener('click', principal);

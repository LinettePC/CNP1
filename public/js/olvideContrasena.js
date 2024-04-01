// Autor: Julio
// DOM listener
// Revisión por Isaac Ch.

function validateForm() {
	var email = document.getElementById('correo').value;
	if (email.trim() === '') {
		Swal.fire({
			title: 'Existen Campos Vacíos',
			text: 'Completa todos los campos obligatorios.',
			icon: 'warning',
		});
		return false;
	} else if (!validateEmail(email)) {
		Swal.fire({
			title: 'El Correo es inválido',
			text: 'Revisa el formato utilizado. Debe ser: usuario@dominio.com',
			icon: 'warning',
		});
		return false;
	}

	Swal.fire({
		title: 'Formulario válido',
		text: 'Los campos son válidos, se puede enviar el formulario.',
		icon: 'success',
	});

	return true;
}

function validateEmail(email) {
	// Simple email validation regex
	var regex = /\S+@\S+\.\S+/;
	return regex.test(email);
}

const headerComprador = document.getElementById('headerComprador');
const headerVendedor = document.getElementById('headerVendedor');

const imgUsuario = document.getElementById('imgUsuario');
const nombreUsuario = document.getElementById('nombreUsuario');
const apellidoUsuario = document.getElementById('apellidoUsuario');

const nombre = document.getElementById('nombre');
const primerApellido = document.getElementById('primerApellido');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');

const botonEnviar = document.getElementById('botonEnviar');

const inputPermiso = document.getElementById('inputPermiso');

const containerIngreseContra = document.getElementById(
	'containerIngreseContra'
);
const containerNuevaContra = document.getElementById('containerNuevaContra');
const hrefInicio = document.getElementById('hrefInicio');

const btnIngresarContra = document.getElementById('btnIngresarContra');
const btnNuevaContra = document.getElementById('btnIngresarContra');

var agregoPermisos = false;

document
	.getElementById('file-upload')
	.addEventListener('change', function (event) {
		var file = event.target.files[0];

		if (file) {
			agregoPermisos = true;
		}
	});

// COMPROBAR SI LA CONTRASENNA TIENE LOS DATOS QUE SE PIDIERON
function contrasennaValidaFormato(str) {
	// Comprobar si la longitud de la cadena es 8 caracteres
	if (str.length !== 8) {
		return false;
	}

	// Comprobar si la cadena contiene vocales
	if (/[aeiou]/i.test(str)) {
		return false;
	}

	// Comprobar si la cadena contiene al menos una consonante
	if (!/[bcdfghjklmnpqrstvwxyz]/i.test(str)) {
		return false;
	}

	// Comprobar si la cadena contiene al menos un carácter especial
	if (!/[^a-zA-Z0-9]/.test(str)) {
		return false;
	}

	// Comprobar si la cadena contiene al menos un número
	if (!/\d/.test(str)) {
		return false;
	}

	// Si se cumplen todas las condiciones, devolver true
	return true;
}

async function verificarNuevaContrasenna() {
	let nuevaContrasenna = document.getElementById('nuevaContrasenna');
	let nuevaContrasennaInput = nuevaContrasenna.value;

	let repitaContrasenna = document.getElementById('repitaContrasenna');
	let repitaContrasennaInput = repitaContrasenna.value;

	if (nuevaContrasennaInput === '' || repitaContrasennaInput === '') {
		nuevaContrasenna.classList.add('incompleto');
		repitaContrasenna.classList.add('incompleto');

		Swal.fire({
			title: 'Contraseñas incompletas',
			text: 'Por favor, ingrese ambos campos.',
			icon: 'error',
			timer: 2500,
			timerProgressBar: true,
		});
	} else {
		nuevaContrasenna.classList.remove('incompleto');
		repitaContrasenna.classList.remove('incompleto');

		if (nuevaContrasennaInput !== repitaContrasennaInput) {
			nuevaContrasenna.classList.add('error');
			repitaContrasenna.classList.add('error');
			Swal.fire({
				title: 'Contraseñas diferentes',
				text: 'Ambas campos deben ser iguales.',
				icon: 'error',
				timer: 2500,
				timerProgressBar: true,
			});
		} else {
			nuevaContrasenna.classList.remove('incompleto');
			repitaContrasenna.classList.remove('incompleto');
			nuevaContrasenna.classList.remove('error');
			repitaContrasenna.classList.remove('error');

			if (nuevaContrasennaInput === usuarioActual.contrasenna) {
				nuevaContrasenna.classList.add('error');
				repitaContrasenna.classList.add('error');

				Swal.fire({
					title: 'Contraseñas iguales',
					text: 'No puede usar su contraseña anterior.',
					icon: 'error',
					timer: 2500,
					timerProgressBar: true,
				});
			} else {
				if (!contrasennaValidaFormato(nuevaContrasennaInput)) {
					nuevaContrasenna.classList.add('error');
					repitaContrasenna.classList.add('error');

					Swal.fire({
						title: 'Contraseñas inválida',
						html: '<p>- Al menos 8 caracteres<br>- No puede tener vocales<br>- Al menos 1 consonante<br>- Al menos 1 carácter especial<br>- Al menos 1 número</p>',
						icon: 'error',
					});
				} else {
					nuevaContrasenna.classList.remove('error');
					repitaContrasenna.classList.remove('error');

					nuevaContraJSON = {
						contrasenna: nuevaContrasennaInput,
					};

					switch (rol) {
						case 'Cliente':
							await actualizarDatosCliente(
								cedula_usuario,
								nuevaContraJSON
							);
							break;
						case 'Vendedor':
							await actualizarDatosVendedor(
								cedula_usuario,
								nuevaContraJSON
							);
							break;
						case 'Admin':
							await actualizarDatosAdmin(
								cedula_usuario,
								nuevaContraJSON
							);
							break;
						default:
							break;
					}

					Swal.fire({
						title: 'Información de cuenta actualizada',
						text: 'Gracias por usar nuestros servicios',
						icon: 'success',
						timer: 2500,
						timerProgressBar: true,
						showConfirmButton: false,
						allowOutsideClick: false,
					});

					setTimeout(() => {
						window.location.reload();
					}, 2500);
				}
			}
		}
	}
}

btnIngresarContra.addEventListener('click', () => {
	let contrasenna = document.getElementById('contrasenna');
	let contrasennaIngresada = contrasenna.value;

	if (contrasennaIngresada !== '') {
		contrasenna.classList.remove('incompleto');

		if (contrasennaIngresada === usuarioActual.contrasenna) {
			containerNuevaContra.style.display = 'block';
			containerIngreseContra.style.display = 'none';
			contrasenna.classList.remove('error');
		} else {
			Swal.fire({
				title: 'Contraseña incorrecta',
				text: 'La contraseña ingresada no es válida.',
				icon: 'error',
				timer: 2500,
				timerProgressBar: true,
				showConfirmButton: false,
				allowOutsideClick: false,
			});
			contrasenna.classList.add('error');
			contrasenna.classList.remove('incompleto');
		}
	} else {
		contrasenna.classList.add('incompleto');
		contrasenna.classList.remove('error');

		Swal.fire({
			title: 'Contraseña incompleta',
			text: 'Por favor, ingrese su contraseña.',
			icon: 'error',
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false,
		});
	}
});

telefono.addEventListener('input', function (event) {
	// Remove non-numeric characters
	telefono.value = telefono.value.replace(/\D/g, '');

	// Limit to 9 characters
	if (telefono.value.length > 9) {
		telefono.value = telefono.value.slice(0, 9);
	}
});

function correoValido(correo) {
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Check if the email matches the regex pattern
	return emailRegex.test(correo);
}

function telefonoValido(telefono) {
	// Regular expression for the format "1234-5678" (any number)
	var telefonoRegex = /^\d{8}$/;
	var telefonoRegex2 = /^\d{4}-\d{4}$/;

	// Check if the telefono matches the regex pattern
	return telefonoRegex.test(telefono) || telefonoRegex2.test(telefono);
}

document
	.getElementById('botonEnviar')
	.addEventListener('click', async function (event) {
		event.preventDefault(); // Prevent the form from submitting normally

		// Obtener los valores de los campos del formulario
		var nombre = document.getElementById('nombre').value;
		var primerApellido = document.getElementById('primerApellido').value;
		var correo = document.getElementById('correo').value;
		var telefono = document.getElementById('telefono').value;
		var fotoCliente = imgUsuario.src;

		// Verificar que todos los campos obligatorios estén llenos
		if (
			nombre === '' ||
			primerApellido === '' ||
			correo === '' ||
			telefono === ''
		) {
			// Mostrar alerta utilizando SweetAlert
			Swal.fire({
				title: 'Campos vacíos',
				text: 'Por favor, llene todos los campos del formulario.',
				icon: 'error',
			});

			if (nombre === '') {
				document.getElementById('nombre').classList.add('incompleto');
			} else {
				document
					.getElementById('nombre')
					.classList.remove('incompleto');
			}
			if (primerApellido === '') {
				document
					.getElementById('primerApellido')
					.classList.add('incompleto');
			} else {
				document
					.getElementById('primerApellido')
					.classList.remove('incompleto');
			}
			if (correo === '') {
				document.getElementById('correo').classList.add('incompleto');
			} else {
				document
					.getElementById('correo')
					.classList.remove('incompleto');
			}
			if (telefono === '') {
				document.getElementById('telefono').classList.add('incompleto');
			} else {
				document
					.getElementById('telefono')
					.classList.remove('incompleto');
			}
			return; // Detener la ejecución del código
		}

		if (!correoValido(correo)) {
			Swal.fire({
				title: 'Correo inválido',
				text: 'Por favor, use un formato válido de correo.',
				icon: 'error',
			});
			document.getElementById('correo').classList.add('error');
			document.getElementById('correo').classList.remove('incompleto');
			return;
		} else {
			document.getElementById('correo').classList.remove('error');
		}

		if (!telefonoValido(telefono)) {
			Swal.fire({
				title: 'Teléfono inválido',
				html: 'Por favor, use un formato válido de teléfono: <br/> "XXXXXXXX"',
				icon: 'error',
			});
			document.getElementById('telefono').classList.add('error');
			document.getElementById('telefono').classList.remove('incompleto');
			return;
		} else {
			document.getElementById('telefono').classList.remove('error');
		}

		// Crear un objeto JSON con los datos del formulario
		var datosFormulario = {
			nombre: nombre,
			primerApellido: primerApellido,
			correo: correo,
			telefono: telefono,
		};

		if (fotoCliente) {
			datosFormulario.foto = fotoCliente;
		} else {
			datosFormulario.foto = 'img/avatar.png';
		}

		if (agregoPermisos) {
			datosFormulario.permisos = true;
		}

		switch (rol) {
			case 'Cliente':
				await actualizarDatosCliente(cedula_usuario, datosFormulario);
				console.log('hola');
				break;
			case 'Vendedor':
				await actualizarDatosVendedor(cedula_usuario, datosFormulario);
				break;
			case 'Admin':
				await actualizarDatosAdmin(cedula_usuario, datosFormulario);
				break;
			default:
				break;
		}

		Swal.fire({
			title: 'Información de cuenta actualizada',
			text: 'Gracias por usar nuestros servicios',
			icon: 'success',
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false,
			allowOutsideClick: false,
		});

		setTimeout(() => {
			window.location.reload();
		}, 2500);
	});

function llenarCampos(persona) {
	if (persona.foto == '' || !persona.foto) {
		imgUsuario.src = 'img/avatar.png';
	} else {
		imgUsuario.src = persona.foto;
	}
	nombreUsuario.innerText = persona.nombre;
	apellidoUsuario.innerText = persona.primerApellido;

	nombre.value = persona.nombre;
	primerApellido.value = persona.primerApellido;
	correo.value = persona.correo;
	telefono.value = persona.telefono;
}

let usuarioActual = {};
const cedula_usuario = sessionStorage.getItem('cedula');
const rol = sessionStorage.getItem('rol');

window.addEventListener('load', async () => {
	if (rol === 'Cliente') {
		headerComprador.style.display = 'flex';

		usuarioActual = await conseguirCompradorCedula(cedula_usuario);
	} else {
		headerVendedor.style.display = 'flex';

		if (rol === 'Vendedor') {
			usuarioActual = await conseguirVendedorCedula(cedula_usuario);
			inputPermiso.style.display = 'flex';
		} else {
			hrefInicio.href = 'portalAdmin.html';
			usuarioActual = await conseguirAdminCedula(cedula_usuario);
		}
	}

	llenarCampos(usuarioActual);
});

console.log(contrasennaValidaFormato('Bcdfg1!3')); // Should return true

// Obtener el elemento de la imagen de usuario

const headerComprador = document.getElementById('headerComprador');
const headerVendedor = document.getElementById('headerVendedor');

const imgUsuario = document.getElementById('imgUsuario');
const nombreUsuario = document.getElementById('nombreUsuario');
const apellidoUsuario = document.getElementById('apellidoUsuario');

const nombre = document.getElementById('nombre');
const primerApellido = document.getElementById('primerApellido');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');

const btnoriginal = document.getElementById('btnoriginal');
const botonpersonal = document.getElementById('botonpersonal');

const botonEnviar = document.getElementById('botonEnviar');

const containerIngreseContra = document.getElementById(
	'containerIngreseContra'
);
const containerNuevaContra = document.getElementById('containerNuevaContra');

const btnIngresarContra = document.getElementById('btnIngresarContra');
const btnNuevaContra = document.getElementById('btnIngresarContra');

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
					window.location.href = 'miPerfil.html';
				}, 2500);
			}
		}
	}
}

let usuarioActual = {};
const cedula_usuario = sessionStorage.getItem('cedula');
const rol = sessionStorage.getItem('rol');

window.addEventListener('load', async () => {
	if (rol === 'Cliente') {
		usuarioActual = await conseguirCompradorCedula(cedula_usuario);
	} else {
		if (rol === 'Vendedor') {
			usuarioActual = await conseguirVendedorCedula(cedula_usuario);
		} else {
			usuarioActual = await conseguirAdminCedula(cedula_usuario);
		}
	}
});

console.log(contrasennaValidaFormato('bcdfg1!3')); // Should return true

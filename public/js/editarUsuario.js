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

telefono.addEventListener('input', function (event) {
	// Remove non-numeric characters
	telefono.value = telefono.value.replace(/\D/g, '');

	// Add dash after 4 numbers
	if (telefono.value.length > 4) {
		telefono.value = telefono.value.replace(/(\d{4})(\d{1})/, '$1-$2');
	}

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
	var telefonoRegex = /^\d{4}-\d{4}$/;

	// Check if the telefono matches the regex pattern
	return telefonoRegex.test(telefono);
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
		var fotoCliente = document.getElementById('btnoriginal').files[0]; // La imagen

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
				html: 'Por favor, use un formato válido de teléfono: <br/> "XXXX-XXXX"',
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
			fotoCliente: fotoCliente ? fotoCliente.name : 'noimg', // Si hay una imagen adjunta, se guarda el nombre, de lo contrario, se guarda una cadena vacía
		};

		switch (tipo_usuario) {
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
			window.location.href = 'administrarUsuarios.html';
		}, 2500);
	});

function llenarCampos(persona) {
	// imgUsuario.src = persona.img;
	nombreUsuario.innerText = persona.nombre;
	apellidoUsuario.innerText = persona.primerApellido;

	nombre.value = persona.nombre;
	primerApellido.value = persona.primerApellido;
	correo.value = persona.correo;
	telefono.value = persona.telefono;
}

function conseguirParamPorNombre(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let cedula_usuario = conseguirParamPorNombre('cedula');
const tipo_usuario = conseguirParamPorNombre('tipo');
let usuario = {};

window.addEventListener('load', async () => {
	if (tipo_usuario === 'Cliente') {
		usuario = await conseguirCompradorCedula(cedula_usuario);
	} else {
		usuario = await conseguirVendedorCedula(cedula_usuario);
	}

	llenarCampos(usuario);
});

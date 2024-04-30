//Autor: Linette
// Referencias al DOM
const form = document.getElementById('formularioCuentaCliente');
const inputs = {
	idCliente: document.getElementById('identificacion'),
	nombre: document.getElementById('nombre'),
	primerApellido: document.getElementById('primerApellido'),
	nomTramo: document.getElementById('nomTramo'),
	correo: document.getElementById('correo'),
	telefono: document.getElementById('telefono'),	
};
const foto = document.querySelector("#foto-usuario");
const permiso = document.querySelector("#foto-permiso");
const botonEnviar = document.getElementById('botonEnviar');




// Función para validar campos vacíos
function validarCamposVacios() {
	let error = false;
	const listinputs = 	Object.values(inputs).filter((input) => input != null)
	listinputs.forEach((input) => {
		if (input.value && !input.value.trim()) {
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

// Validar nombre
function validarNombre() {
	return validarCampo(inputs.nombre, /^[a-zA-ZáéíóúñÑü]+$/, {
		title: 'El Nombre es inválido',
		text: 'Revisa el formato utilizado',
	});
}

// Validar primer apellido
function validarPrimerApellido() {
	return validarCampo(inputs.primerApellido, /^[a-zA-ZáéíóúñÑü]+$/, {
		title: 'El Primer Apellido es inválido',
		text: 'Revisa el formato utilizado',
	});
}

// Validar primer apellido
function validarnomTramo() {
    return validarCampo(inputs.nomTramo, /^[a-zA-Z0-9\s]+$/, {
        title: 'El nombre de tramo es inválido',
        text: 'Revisa el formato utilizado',
    });
}


// Validar correo electrónico
function validarCorreo() {
	return validarCampo(
		inputs.correo,
		/^[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
		{
			title: 'El Correo es inválido',
			text: 'Revisa el formato utilizado',
		}
	);
}

// Validar teléfono
function validarTelefono() {
	return validarCampo(inputs.telefono, /^[0-9]{8}$/, {
		title: 'El Número de Teléfono es inválido',
		text: 'Recuerda que debe contener 8 números',
	});
}

//FUNCION para validar contrasenna
//debe tener como minimo de 8 caracteres
//no puede tener vocales
//debe tener al menos 1 consonante (al menos una mayuscula, al menos una minuscula)
//debe tener al menos 1 caracter especial
//debe tener al menos 1 numero
function validarContrasenna() {
	return validarCampo(
		inputs.contrasenna,
		/^(?=.*[bcdfghjklmnñpqrstvwxyz])(?=.*[BCDFGHJKLMNÑPQRSTVWXYZ])(?=.*[0-9])(?=.*[!@#$%^&*()-_+])(?!.*[aeiouAEIOU]).{8,}$/,
		{
			title: 'La contraseña es inválida',
			text: 'Revisa el formato utilizado',
		}
	);
}

// Limpiar todos los campos del formulario
function limpiarCampos() {
	const listinputs = 	Object.values(inputs).filter((input) => input != null)
	listinputs.forEach((input) => (input.value = ''));
}

//se va a crear la primer contrasenna temporal aunque admin no lo haya aprobado todavia
//se va a crear la contrasenna con 7 caracterers para diferenciar esta de la contrasennna que 
//el vendedor crea que es de 8 o mas caracteres
const generarContrasenaTemporal = () => {
    // Longitud de la contraseña temporal
    const longitud = 7;
    // Caracteres que se usarán para generar la contraseña temporal
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let contrasenaTemporal = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        contrasenaTemporal += caracteres.charAt(indice);
        //contrasenaTemporal = contrasenaTemporal + caracteres.charAt(indice)
    }
    return contrasenaTemporal;
};





// Función principal de validación
function principal() {
	if (
		validarCamposVacios() &&
		!validarIdentificacion() &&
		!validarNombre() &&
		!validarPrimerApellido() &&
		!validarnomTramo() &&
		!validarCorreo() &&
		!validarTelefono()
	) {
		//cuando ya sirva, podemos comentar este Sweetalert para que no hayan dos
		//porque hay otro en el doc de servicioRegVendedor.js
		// Swal.fire({
		// 	title: 'Formulario enviado',
		// 	text: 'Recibirás un mensaje cuando tu solicitud sea revisada',
		// 	icon: 'success'
		// });
		let cedula = inputs.idCliente.value;
		let nombre = inputs.nombre.value;
		let primerApellido = inputs.primerApellido.value;
		let nomTramo = inputs.nomTramo.value;
		let correo = inputs.correo.value;
		let telefono = inputs.telefono.value;
		let pFoto = foto.src;
		let pPermiso = permiso.src;
		let contrasenna = generarContrasenaTemporal();
		
		
		preRegistroVendedor(cedula, nombre, primerApellido, nomTramo, correo, telefono, pPermiso, pFoto, contrasenna);
		
		limpiarCampos();
	}
}

// Evento de clic en el botón de enviar
botonEnviar.addEventListener('click', principal);

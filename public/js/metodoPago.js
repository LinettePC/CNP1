// HECHO POR ISAAC

//Referencias al DOM
const txtTipoTarjeta = document.getElementById('tipoTarjeta');
const txtNumeroTarjeta = document.getElementById('numTarjeta');
const txtNombrePropietario = document.getElementById('nombrePropietario');
const txtMes = document.getElementById('mes');
const txtAnnio = document.getElementById('annio');
const cvv = document.getElementById('cvv');
const boton = document.getElementById('enviar');

// Todos los Event Listeners constantes
cvv.addEventListener('input', function (event) {
	let input = event.target.value;
	let regex = /^[0-9]*$/; // Expresión regular para coincidir solo con números

	if (!regex.test(input)) {
		event.target.value = input.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
	}
});

txtMes.addEventListener('input', function () {
	// Limitar la entrada a 2 caracteres
	if (this.value.length > 2) {
		this.value = this.value.slice(0, 2);
	}
});

txtAnnio.addEventListener('input', function () {
	// Eliminar los ceros iniciales
	this.value = this.value.replace(/^0+/, '');

	// Limitar la entrada a 2 caracteres
	if (this.value.length > 2) {
		this.value = this.value.slice(0, 2);
	}
});

txtNumeroTarjeta.addEventListener('input', function () {
	let cardNumber = this.value.trim().replace(/-/g, '');
	if (cardNumber.length > 0) {
		cardNumber = cardNumber.match(new RegExp('.{1,4}', 'g')).join('-');
	}
	this.value = cardNumber;

	// Volver a solo números
	cardNumber = this.value.trim().replace(/-/g, '');

	var visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
	var mastercardPattern = /^5[1-5][0-9]{14}$/;
	var amexPattern = /^3[47][0-9]{13}$/;

	this.style.backgroundSize = '30px';

	if (visaPattern.test(cardNumber)) {
		this.style.backgroundImage = 'url("img/cardsimages/visa.png")';
		this.style.backgroundPosition = '250px center';
	} else if (mastercardPattern.test(cardNumber)) {
		this.style.backgroundImage = 'url("img/cardsimages/mastercard.png")';
		this.style.backgroundPosition = '260px center';
	} else if (amexPattern.test(cardNumber)) {
		this.style.backgroundImage = 'url("img/cardsimages/amex.png")';
		this.style.backgroundSize = '20px';
		this.style.backgroundPosition = '265px center';
	} else {
		this.style.backgroundImage = '';
	}
});

function validarCamposVacios() {
	// Comprobar si al menos uno de los campos está vacío
	let error = false;

	const fields = [
		txtTipoTarjeta,
		txtNumeroTarjeta,
		txtNombrePropietario,
		txtMes,
		txtAnnio,
		cvv,
	];

	fields.forEach((field) => {
		if (field.value === '') {
			field.classList.add('empty');
			error = true;
		} else {
			field.classList.remove('empty');
		}
	});

	return error;
}

//Funcion que validar la tarjeta
function validarNumTarjeta() {
	let error = false;
	let inputUsuario = txtNumeroTarjeta;

	let numeroTarjeta = inputUsuario.value.trim().replace(/-/g, '');

	let expresion = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
	if (numeroTarjeta === '' || numeroTarjeta === null) {
		error = true;
	} else {
		if (!numeroTarjeta.match(expresion)) {
			error = true;
			txtNumeroTarjeta.classList.add('error');
		} else {
			txtNumeroTarjeta.classList.remove('error');
		}
	}
	return error;
}

function validarNombre() {
	let error = false;
	let inputUsuario = txtNombrePropietario;

	//Tenia problemas con el formato ya que no se contemplaban espacios, por lo que se cambio la expresion para que se pudiera
	let expresion = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/;
	if (inputUsuario.value === '' || inputUsuario.value === null) {
		error = true;
	} else {
		if (!expresion.test(inputUsuario.value)) {
			error = true;
			txtNombrePropietario.classList.add('error');
		} else {
			txtNombrePropietario.classList.remove('error');
		}
	}
	return error;
}

// hecho por Isaac Ch. Incluye la validación del mes
function validarFecha() {
	let error = false;

	// Obtener el año y el mes actual
	let fechaActual = new Date();
	let annioActual = fechaActual.getFullYear();
	annioActual = annioActual % 100;
	let mesActual = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, se suma 1 para obtener el valor real

	let mes = parseInt(txtMes.value);

	// Comprobar si el campo está vacío o es nulo
	if (txtAnnio.value === '' || txtAnnio.value === null) {
		error = true;
	} else {
		// Convertir el valor del campo a un número entero
		let annio = parseInt(txtAnnio.value);

		// Verificar si el año está dentro del rango permitido (mayor al año actual)
		if (annio <= annioActual) {
			// Si el año es igual al año actual, verificar el mes
			if (annio === annioActual) {
				if (mes <= mesActual) {
					error = true;
					txtMes.classList.add('error');
				} else {
					txtMes.classList.remove('error');
				}
			} else {
				txtAnnio.classList.add('error');
				error = true;
			}
		} else {
			// Quitar estilos de error si el valor es válido
			txtAnnio.classList.remove('error');
		}

		if (mes > 12) {
			error = true;
			txtMes.classList.add('error');
		} else {
			txtMes.classList.remove('error');
		}
	}
	return error;
}

//Validar el cvv para que solo sean 3

function limpiarCampos() {
	txtNumeroTarjeta.value = '';
	txtNombrePropietario.value = '';
	txtMes.value = '';
	txtAnnio.value = '';
	cvv.value = '';
}

const cedula_usuario = sessionStorage.getItem('cedula');

async function enviarForm() {
	let errorCamposVacios = validarCamposVacios();
	let errorNumeroTarjeta = validarNumTarjeta();
	let errorNombre = validarNombre();
	let errorFecha = validarFecha();

	if (errorCamposVacios) {
		Swal.fire({
			title: 'Los campos son obligatorios',
			text: 'Favor llenar el formulario',
			icon: 'warning',
		});
	} else if (errorNumeroTarjeta) {
		Swal.fire({
			title: 'Numero de tarjeta Inválido',
			text: 'Utiliza un formato válido',
			icon: 'warning',
		});
	} else if (errorNombre) {
		Swal.fire({
			title: 'Nombre invalido',
			text: 'Utiliza un formato válido',
			icon: 'warning',
		});
	} else if (errorFecha) {
		Swal.fire({
			title: 'Fecha de vencimiento inválida',
			text: 'La fecha ingresada es inválida',
			icon: 'warning',
		});
	} else {
		var ultimosCuatro = txtNumeroTarjeta.value.split('-').pop();
		let dataJSON = {
			metodo_pago: `${txtTipoTarjeta.value} terminando en ${ultimosCuatro}`,
		};

		await actualizarDatosCliente(cedula_usuario, dataJSON);

		Swal.fire({
			title: 'Información de pago actualizada',
			text: 'Gracias por usar nuestros servicios',
			icon: 'success',
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false,
			allowOutsideClick: false,
		});

		setTimeout(() => {
			window.location.href = 'pagoDireccion.html';
		}, 2500);
	}
}

boton.addEventListener('click', enviarForm);

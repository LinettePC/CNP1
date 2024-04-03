//Referencias al DOM
const txtNumeroTarjeta = document.getElementById('numTarjeta');
const txtNombrePropietario = document.getElementById('nombrePropietario');
const txtMes = document.getElementById('mes');
const txtAnnio = document.getElementById('annio');
const cvv = document.getElementById('cvv');
const boton = document.getElementById('enviar');

// JavaScript to restrict input to numbers only
document.getElementById('cvv').addEventListener('input', function (event) {
	let input = event.target.value;
	let regex = /^[0-9]*$/; // Regular expression to match numbers only

	if (!regex.test(input)) {
		event.target.value = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
	}
});

function validarCamposVacios() {
	// Comprobar si al menos uno de los campos está vacío
	let error = false;

	const fields = [
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

txtNumeroTarjeta.addEventListener('input', function () {
	let cardNumber = this.value.trim().replace(/-/g, '');
	if (cardNumber.length > 0) {
		cardNumber = cardNumber.match(new RegExp('.{1,4}', 'g')).join('-');
	}
	this.value = cardNumber;
});

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

function validarAnnio() {
	let error = false;
	let inputUsuario = txtAnnio;

	//Validar que el mes + el annio no sean menores al actual (PENDIENTE)

	// Obtener el año actual para comparar
	let annioActual = new Date().getFullYear();
	console.log(annioActual);

	// Comprobar si el campo está vacío o es nulo
	if (inputUsuario.value === '' || inputUsuario.value === null) {
		error = true;
	} else {
		// Convertir el valor del campo a un número entero
		let annio = parseInt(inputUsuario.value);

		// Verificar si el año está dentro del rango permitido (mayor o igual a 24 y menor que 100)
		if (annio < annioActual % 100 || annio < 24 || annio >= 100) {
			error = true;
			// Aplicar estilos de error al campo de entrada
			txtAnnio.classList.add('error');
		} else {
			// Quitar estilos de error si el valor es válido
			txtAnnio.classList.remove('error');
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

function enviarForm() {
	let errorCamposVacios = validarCamposVacios();
	let errorNumeroTarjeta = validarNumTarjeta();
	let errorNombre = validarNombre();
	let errorAnnio = validarAnnio();

	if (errorCamposVacios) {
		Swal.fire({
			title: 'Los campos son obligatorios',
			text: 'Favor llenar el formulario',
			icon: 'warning',
		});
	} else if (errorNumeroTarjeta) {
		Swal.fire({
			title: 'Numero de tarjeta Invalido',
			text: 'Utiliza un formato valido',
			icon: 'warning',
		});
	} else if (errorNombre) {
		Swal.fire({
			title: 'Nombre invalido',
			text: 'Utiliza un formato valido',
			icon: 'warning',
		});
	} else if (errorAnnio) {
		Swal.fire({
			title: 'Año invalido',
			text: 'Utiliza un formato valido',
			icon: 'warning',
		});
	} else {
		Swal.fire({
			title: 'Datos correctos',
			text: ' Su informacion se ha enviado de forma correcta',
			icon: 'success',
		});
		limpiarCampos();
	}
}

boton.addEventListener('click', enviarForm);

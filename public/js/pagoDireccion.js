const btn_comprar = document.getElementById('boton');
const txt_nombre = document.getElementById('nombre');
const txt_apellidos = document.getElementById('apellidos');
const txt_telefono = document.getElementById('telefono');
const txt_email = document.getElementById('email');
const txt_provincia = document.getElementById('provincia');
const txt_canton = document.getElementById('canton');
const txt_distrito = document.getElementById('distrito');
const txt_direccion = document.getElementById('direccion');

const txt_tarjetaActual = document.getElementById('tarjetaActual');

const formulario = document.getElementById('inputsDatos');

// Add event listener to form submission
formulario.addEventListener('submit', function (event) {
	// Prevent default form submission behavior
	event.preventDefault();

	// Call the principal function to perform validation
	principal();
});

// let usuarioActual = {};
// const rol = 'Cliente';

const cedula_usuario = sessionStorage.getItem('cedula');

async function principal() {
	let error_campos_vacios = ValidarCamposVacios();
	let error_nombre = ValidarNombre();
	let error_apellidos = ValidarApellidos();
	let error_email = ValidarEmail();
	let error_provincia = ValidarProvincia();
	let error_canton = ValidarCanton();
	let error_distrito = ValidarDistrito();
	let error_telefono = ValidarTelefono();

	if (error_campos_vacios) {
		Swal.fire({
			title: 'Campos vacíos',
			text: 'Debe completar todos los campos',
			icon: 'warning',
			confirmButtonText: 'Entendido!',
		});
	} else if (error_nombre) {
		Swal.fire({
			title: 'Nombre incorrecto',
			text: 'Favor revisar el nombre, solo se aceptan letras',
			icon: 'warning',
			confirmButtonText: 'Entendido!',
		});
	} else if (error_apellidos) {
		Swal.fire({
			title: 'Correo incorrecto',
			text: 'Favor revisar los apellidos, solo se aceptan letras',
			icon: 'warning',
			confirmButtonText: 'Entendido!',
		});
	} else if (error_provincia) {
		Swal.fire({
			title: 'Provincia incorrecta',
			text: 'El campo de Provincia tiene un caracter no valido',
			icon: 'warning',
			confirmButtonText: 'Entendido!',
		});
	} else if (error_canton) {
		Swal.fire({
			title: 'Canton incorrecto',
			text: 'El campo de Canton tiene un caracter no valido',
			icon: 'warning',
			confirmButtonText: 'Entendido!',
		});
	} else if (error_distrito) {
		Swal.fire({
			title: 'Distrito incorrecto',
			text: 'El campo de Distrito tiene un caracter no valido',
			icon: 'warning',
			confirmButtonText: 'Entendido!',
		});
	} else if (error_email) {
		Swal.fire({
			title: 'Correo incorrecto',
			text: 'El correo tiene un formato incorrecto',
			icon: 'warning',
			confirmButtonText: 'Entendido!',
		});
	} else if (error_telefono) {
		Swal.fire({
			title: 'Teléfono incorrecto',
			text: 'El telefono tiene que tener el formato 2222-2222',
			icon: 'warning',
			confirmButtonText: 'Entendido!',
		});
	} else {
		let dataJSON = {
			direccion: {
				nombre: txt_nombre.value,
				apellidos: txt_apellidos.value,
				correo: txt_email.value,
				telefono: txt_telefono.value,
				provincia: txt_provincia.value,
				canton: txt_canton.value,
				distrito: txt_distrito.value,
				direccionExacta: txt_direccion.value,
			},
		};

		await actualizarDatosCliente(cedula_usuario, dataJSON);

		Swal.fire({
			title: 'Información de dirección actualizada',
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

txt_telefono.addEventListener('input', function (event) {
	// Get the current value of the input
	let input = event.target.value;

	// Remove any non-numeric characters from the input
	input = input.replace(/\D/g, '');

	// Format the input by adding a dash after every 4 characters
	input = input.replace(/(\d{4})(?=\d)/g, '$1-');

	// Update the input value
	event.target.value = input;
});

function ValidarCamposVacios() {
	let camposRequeridos = document.querySelectorAll('#inputsDatos [required]');
	let error = false;

	for (let i = 0; i < camposRequeridos.length; i++) {
		// for (let i=0; i<6;i++){
		if (camposRequeridos[i].value == '') {
			error = true;
			camposRequeridos[i].classList.add('error');
		} else {
			camposRequeridos[i].classList.remove('error');
		}
	}
	return error;
}

function ValidarNombre() {
	let error = false;
	let inputNombre = txt_nombre.value;
	let expresion = /^[a-zA-ZáéíóúÁÉÍÓÚ\s.,;:'"-]+$/;
	if (expresion.test(inputNombre) == false) {
		error = true;
		txt_nombre.classList.add('error');
	} else {
		txt_nombre.classList.remove('error');
	}
	return error;
}

function ValidarApellidos() {
	let error = false;
	let InputApellidos = txt_apellidos.value;
	let expresion = /^[a-zA-ZáéíóúÁÉÍÓÚ\s.,;:'"-]+$/;
	if (expresion.test(InputApellidos) == false) {
		error = true;
		txt_apellidos.classList.add('error');
	} else {
		txt_apellidos.classList.remove('error');
	}
	return error;
}

function ValidarTelefono() {
	let error = false;
	let input_telefono = txt_telefono.value;
	let expression = /^[0-9]{4}-?[0-9]{4}$/; //1111-1111 11112222
	if (expression.test(input_telefono) == false) {
		error = true;
		txt_telefono.classList.add('error');
	} else {
		txt_telefono.classList.remove('error');
	}
	return error;
}

function ValidarProvincia() {
	let error = false;
	let inputProvincia = txt_provincia.value;
	let expresion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;:'"-]+$/;
	if (expresion.test(inputProvincia) == false) {
		error = true;
		txt_provincia.classList.add('error');
	} else {
		txt_provincia.classList.remove('error');
	}
	return error;
}

function ValidarCanton() {
	let error = false;
	let inputCanton = txt_canton.value;
	let expresion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;:'"-]+$/;
	if (expresion.test(inputCanton) == false) {
		error = true;
		txt_canton.classList.add('error');
	} else {
		txt_canton.classList.remove('error');
	}
	return error;
}

function ValidarDistrito() {
	let error = false;
	let inputDistrito = txt_distrito.value;
	let expresion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;:'"-]+$/;

	if (expresion.test(inputDistrito) == false) {
		error = true;
		txt_distrito.classList.add('error');
	} else {
		txt_distrito.classList.remove('error');
	}
	return error;
}

function ValidarEmail() {
	let error = false;
	let email_input = txt_email.value;
	let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (expresion.test(email_input) == false) {
		error = true;
		txt_email.classList.add('error');
	} else {
		txt_email.classList.remove('error');
	}
	return error;
}

// Isaac Ch. Validaciones de Ubicación:

const provincias = [
	'San-José',
	'Alajuela',
	'Cartago',
	'Heredia',
	'Guanacaste',
	'Puntarenas',
	'Limón',
];

const cantonesPorProvincia = {
	'San José': [
		'San José',
		'Escazú',
		'Desamparados',
		'Puriscal',
		'Tarrazú',
		'Aserrí',
		'Mora',
		'Goicoechea',
		'Santa Ana',
		'Alajuelita',
		'Vázquez de Coronado',
		'Acosta',
		'Tibás',
		'Moravia',
		'Montes de Oca',
		'Turrubares',
		'Dota',
		'Curridabat',
		'León Cortés',
	],
	Alajuela: [
		'Alajuela',
		'San Ramón',
		'Grecia',
		'San Mateo',
		'Atenas',
		'Naranjo',
		'Palmares',
		'Poás',
		'Orotina',
		'San Carlos',
		'Zarcero',
		'Valverde Vega',
		'Upala',
		'Los Chiles',
		'Guatuso',
		'Río Cuarto',
	],
	Cartago: [
		'Cartago',
		'Paraíso',
		'La Unión',
		'Jiménez',
		'Turrialba',
		'Alvarado',
		'Oreamuno',
		'El Guarco',
	],
	Heredia: [
		'Heredia',
		'Barva',
		'Santo Domingo',
		'Santa Bárbara',
		'San Rafael',
		'San Isidro',
		'Belén',
		'Flores',
		'San Pablo',
		'Sarapiquí',
	],
	Guanacaste: [
		'Liberia',
		'Nicoya',
		'Santa Cruz',
		'Bagaces',
		'Carrillo',
		'Cañas',
		'Abangares',
		'Tilarán',
		'Nandayure',
		'La Cruz',
		'Hojancha',
	],
	Puntarenas: [
		'Puntarenas',
		'Esparza',
		'Buenos Aires',
		'Montes de Oro',
		'Osa',
		'Quepos',
		'Golfito',
		'Coto Brus',
		'Parrita',
		'Corredores',
		'Garabito',
	],
	Limón: ['Limón', 'Pococí', 'Siquirres', 'Talamanca', 'Matina', 'Guácimo'],
};

const distritosPorCanton = {
	'San José': {
		'San José': ['Carmen', 'Merced', 'Hospital'],
		Escazú: ['Escazú Centro', 'San Rafael', 'San Antonio'],
		Desamparados: ['Desamparados Centro', 'San Miguel', 'San Juan'],
		Puriscal: ['Puriscal Centro', 'Santiago', 'Barbacoas'],
		Tarrazú: ['San Marcos', 'San Lorenzo', 'San Carlos'],
		Aserrí: ['Aserrí Centro', 'Tarbaca', 'Vuelta de Jorco'],
		Mora: ['Ciudad Colón', 'Guayabo', 'Tabarcia'],
		Goicoechea: ['Guadalupe', 'San Francisco', 'Calle Blancos'],
		'Santa Ana': ['Santa Ana Centro', 'Salitral', 'Piedades'],
		Alajuelita: ['Alajuelita Centro', 'San Josecito', 'San Antonio'],
		'Vázquez de Coronado': ['San Isidro', 'San Rafael', 'Dulce Nombre'],
		Acosta: ['San Ignacio', 'Guaitil', 'Palmichal'],
		Tibás: ['San Juan', 'Cinco Esquinas', 'Anselmo Llorente'],
		Moravia: ['San Vicente', 'San Jerónimo', 'La Trinidad'],
		'Montes de Oca': ['San Pedro', 'Sabanilla', 'Mercedes'],
		Turrubares: ['San Pablo', 'San Pedro', 'San Juan de Mata'],
		Dota: ['Santa María', 'Jardín', 'Copey'],
		Curridabat: ['Curridabat Centro', 'Granadilla', 'Sánchez'],
		'León Cortés': ['San Pablo', 'San Andrés', 'Llano Bonito'],
	},
	Alajuela: {
		Alajuela: ['Alajuela Centro', 'San José', 'Carrizal'],
		'San Ramón': ['San Ramón Centro', 'Piedades Norte', 'Piedades Sur'],
		Grecia: ['Grecia Centro', 'San Isidro', 'San Roque'],
		'San Mateo': ['San Mateo Centro', 'Desmonte', 'Jesús María'],
		Atenas: ['Atenas Centro', 'Concepción', 'San José'],
		Naranjo: ['Naranjo Centro', 'San Miguel', 'San José'],
		Palmares: ['Palmares Centro', 'Zaragoza', 'Buenos Aires'],
		Poás: ['San Pedro', 'San Juan', 'San Rafael'],
		Orotina: ['Orotina Centro', 'Mastate', 'Hacienda Vieja'],
		'San Carlos': ['Quesada', 'Florencia', 'Buenavista'],
		Zarcero: ['Zarcero Centro', 'Laguna', 'Brisas'],
		'Valverde Vega': ['Sarchí Norte', 'Sarchí Sur', 'Toro Amarillo'],
		Upala: ['Upala Centro', 'Aguas Claras', 'San José'],
		'Los Chiles': ['Los Chiles Centro', 'Caño Negro', 'El Amparo'],
		Guatuso: ['San Rafael', 'Buenavista', 'Cote'],
	},
	Cartago: {
		Cartago: ['Cartago Centro', 'Oriental', 'Occidental'],
		Paraíso: ['Paraíso Centro', 'Santiago', 'Orosi'],
		'La Unión': ['Tres Ríos', 'San Diego', 'San Juan'],
		Jiménez: ['Juan Viñas', 'Tucurrique', 'Pejibaye'],
		Turrialba: ['Turrialba Centro', 'La Suiza', 'Peralta'],
		Alvarado: ['Pacayas', 'Cervantes', 'Capellades'],
		Oreamuno: ['San Rafael', 'Cot', 'Potrero Cerrado'],
		'El Guarco': ['Tejar', 'Tobosi', 'Patio de Agua'],
	},
	Heredia: {
		Heredia: ['Heredia Centro', 'Mercedes', 'San Francisco'],
		Barva: ['Barva Centro', 'San Pedro', 'San Pablo'],
		'Santo Domingo': [
			'Santo Domingo Centro',
			'San Vicente',
			'Santa Bárbara',
		],
		'Santa Bárbara': ['Santa Bárbara Centro', 'San Pedro', 'Santa Lucía'],
		'San Rafael': ['San Rafael Centro', 'San Josecito', 'Santiago'],
		'San Isidro': ['San Isidro Centro', 'Concepción', 'San José'],
		Belén: ['San Antonio', 'La Ribera', 'La Asunción'],
		Flores: ['San Joaquín', 'Barrantes', 'Llorente'],
		'San Pablo': [
			'San Pablo Centro',
			'Rincón de Sabanilla',
			'San José de la Montaña',
		],
		Sarapiquí: ['Puerto Viejo', 'La Virgen', 'Las Horquetas'],
	},
	Guanacaste: {
		Liberia: ['Liberia Centro', 'Cañas Dulces', 'Mayorga'],
		Nicoya: ['Nicoya Centro', 'Mansión', 'San Antonio'],
		'Santa Cruz': ['Santa Cruz Centro', 'Bolsón', 'Veintisiete de Abril'],
		Bagaces: ['Bagaces Centro', 'La Fortuna', 'Mogote'],
		Carrillo: ['Filadelfia', 'Palmira', 'Sardinal'],
		Cañas: ['Cañas Centro', 'Palmira', 'San Miguel'],
		Abangares: ['Las Juntas', 'Sierra', 'San Juan'],
		Tilarán: ['Tilarán Centro', 'Quebrada Grande', 'Tronadora'],
		Nandayure: ['Carmona', 'Santa Rita', 'Zapotal'],
		'La Cruz': ['La Cruz Centro', 'Santa Cecilia', 'Garita'],
		Hojancha: ['Hojancha Centro', 'Monte Romo', 'Puerto Carrillo'],
	},
	Puntarenas: {
		Puntarenas: ['Puntarenas Centro', 'Pitahaya', 'Chacarita'],
		Esparza: ['Esparza Centro', 'San Juan Grande', 'Caldera'],
		'Buenos Aires': ['Buenos Aires Centro', 'Volcán', 'Boruca'],
		'Montes de Oro': ['Miramar', 'La Unión', 'San Isidro'],
		Osa: ['Puerto Cortés', 'Palmar', 'Sierpe'],
		Quepos: ['Quepos Centro', 'Savegre', 'Naranjito'],
		Golfito: ['Golfito Centro', 'Puerto Jiménez', 'Guaycará'],
		'Coto Brus': ['San Vito', 'Sabalito', 'Aguabuena'],
		Parrita: ['Parrita Centro', 'Caballo', 'Palo Seco'],
		Corredores: ['Ciudad Neily', 'Guaycará', 'La Cuesta'],
		Garabito: ['Jacó', 'Tárcoles', 'Herradura'],
	},
	Limón: {
		Limón: ['Limón Centro', 'Valle La Estrella', 'Río Blanco'],
		Pococí: ['Guápiles', 'Jiménez', 'La Rita'],
		Siquirres: ['Siquirres Centro', 'Pacuarito', 'Florida'],
		Talamanca: ['Bribri', 'Bratsi', 'Sixaola'],
		Matina: ['Matina Centro', 'Batán', 'Carrandi'],
		Guácimo: ['Guácimo Centro', 'Río Jiménez', 'Duacarí'],
	},
};

function cargarCantones() {
	const provinciaSeleccionada = document.getElementById('provincia').value;
	const cantones = cantonesPorProvincia[provinciaSeleccionada];
	const cantonSelect = document.getElementById('canton');
	const distritoSelect = document.getElementById('distrito');
	distritoSelect.innerHTML =
		"<option value='' selected disabled>Seleccione un distrito</option>";

	cantonSelect.innerHTML =
		"<option value='' selected disabled>Seleccione un cantón</option>";

	cantones.forEach((canton) => {
		const option = document.createElement('option');
		option.text = canton;
		option.value = canton;
		cantonSelect.appendChild(option);
	});
}

function cargarDistritos() {
	const cantonSeleccionado = document.getElementById('canton').value;

	const distritos =
		distritosPorCanton[document.getElementById('provincia').value][
			cantonSeleccionado
		];
	const distritoSelect = document.getElementById('distrito');

	distritoSelect.innerHTML =
		"<option value='' selected disabled>Seleccione un distrito</option>";

	distritos.forEach((distrito) => {
		const option = document.createElement('option');
		option.text = distrito;
		option.value = distrito;
		distritoSelect.appendChild(option);
	});
}

function crearOpcionDireccion(value) {
	var optionElement = document.createElement('option');
	optionElement.value = value;
	optionElement.textContent = value;
	return optionElement;
}

function crearSeparador() {
	var optionElement = document.createElement('option');
	optionElement.value = '';
	optionElement.textContent =
		'---------- Seleccionada previamente ----------';
	optionElement.disabled = true;
	return optionElement;
}

function llenarCampos(persona) {
	txt_nombre.value = persona.direccion.nombre;
	txt_apellidos.value = persona.direccion.apellidos;
	txt_telefono.value = persona.direccion.telefono;
	txt_email.value = persona.direccion.correo;
	txt_direccion.value = persona.direccion.direccionExacta;

	txt_provincia.value = persona.direccion.provincia;
	cargarCantones();

	txt_canton.value = persona.direccion.canton;
	cargarDistritos();

	txt_distrito.value = persona.direccion.distrito;

	if (persona.metodo_pago) {
		tarjetaActual.textContent = persona.metodo_pago;
	} else {
		tarjetaActual.textContent = 'Ninguna tarjeta agregada';
	}
}

window.addEventListener('load', async () => {
	usuarioActual = await conseguirCompradorCedula(cedula_usuario);

	if (usuarioActual) {
		llenarCampos(usuarioActual);
	}
});

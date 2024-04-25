const btnGenerarReporte = document.getElementById('btnGenerarReporte');
const bodyTabla = document.getElementById('bodyTabla');
let lista_personas = [];
let cantPersonas;

// Fecha específica
const containerFechaEspecifica = document.getElementById(
	'containerFechaEspecifica'
);
const selectAnno = document.querySelector('#selectAnno');
const selectMes = document.querySelector('#selectMes');
const radioFechaEspecifica = document.getElementById('fecha-especifica');

radioFechaEspecifica.addEventListener('change', function () {
	if (radioFechaEspecifica.checked) {
		containerFechaEspecifica.style.display = 'block';
		containerFechaRango.style.display = 'none';
	} else {
		containerFechaEspecifica.style.display = 'none';
		containerFechaRango.style.display = 'block';
	}
});

// Fecha rango
const containerFechaRango = document.getElementById('containerFechaRango');
const rangoDesde = document.getElementById('rangoDesde');
const rangoHasta = document.getElementById('rangoHasta');
const radioRangoFechas = document.getElementById('rango-fechas');

radioRangoFechas.addEventListener('change', function () {
	if (radioRangoFechas.checked) {
		containerFechaRango.style.display = 'block';
		containerFechaEspecifica.style.display = 'none';
	} else {
		containerFechaRango.style.display = 'none';
		containerFechaEspecifica.style.display = 'block';
	}
});

const msjNoUsuarios = document.getElementById('msjNoUsuarios');

//

function crearFila(persona) {
	// let iva = persona.precio_venta * 0.13;
	// iva = Math.round(iva * 100) / 100;

	const row = document.createElement('tr');
	row.innerHTML = `
	  <td>${venta.fecha_de_venta}</td>
	  <td>${venta.cedula_comprador}</td>
	  <td>${venta.nombre_comprador}</td>
	  <td>${venta.nombre_producto}</td>
	  <td>${venta.cantidad_comprada}</td>
	  <td>${venta.categoria_producto}</td>
	  <td>${venta.precio_venta}</td>
	  <td>${iva}</td>
	`;

	// <td class="identificacion">1-3457-0982</td>
	// <td class="nombre">Alejandro</td>
	// <td class="apellido">Chinchilla</td>
	// <td class="incorporacion">2/12/2023</td>
	// <td class="motivo">Falta de documentación</td>
	return row;
}

function fechaEntreRango(fecha) {
	// Agarra la fecha como AAAA-MM // Ejemplo: 2024-04. Compara la fecha con las fechas de los rangos
	let selectedRangoDesde = rangoDesde.value;
	let selectedRangoHasta = rangoHasta.value;

	// Analizar el año y el mes de las cadenas de fecha
	var annoFecha = parseInt(fecha.split('-')[0]);
	var mesFecha = parseInt(fecha.split('-')[1]);

	var annoDesde = parseInt(selectedRangoDesde.split('-')[0]);
	var mesDesde = parseInt(selectedRangoDesde.split('-')[1]);

	var annoHasta = parseInt(selectedRangoHasta.split('-')[0]);
	var mesHasta = parseInt(selectedRangoHasta.split('-')[1]);

	// Convertir fechas a números para facilitar la comparación
	var fechaNumero = annoFecha * 12 + mesFecha;
	var fechaNumeroDesde = annoDesde * 12 + mesDesde;
	var fechaNumeroHasta = annoHasta * 12 + mesHasta;

	// Verificar si la fecha está entre fecha desde y fecha hasta
	return fechaNumero >= fechaNumeroDesde && fechaNumero <= fechaNumeroHasta;
}

function fechaMenorQueHasta(fecha) {
	// Agarra la fecha como AAAA-MM // Ejemplo: 2024-04. Compara la fecha con las fechas de los rangos
	let selectedRangoHasta = rangoHasta.value;

	// Analizar el año y el mes de las cadenas de fecha
	var annoFecha = parseInt(fecha.split('-')[0]);
	var mesFecha = parseInt(fecha.split('-')[1]);

	var annoHasta = parseInt(selectedRangoHasta.split('-')[0]);
	var mesHasta = parseInt(selectedRangoHasta.split('-')[1]);

	// Convertir fechas a números para facilitar la comparación
	var fechaNumero = annoFecha * 12 + mesFecha;
	var fechaNumeroHasta = annoHasta * 12 + mesHasta;

	// Verificar si la fecha es menor que la "fecha hasta"
	return fechaNumero <= fechaNumeroHasta;
}

function fechaMayorQueDesde(fecha) {
	// Agarra la fecha como AAAA-MM // Ejemplo: 2024-04. Compara la fecha con las fechas de los rangos
	let selectedRangoDesde = rangoDesde.value;

	// Analizar el año y el mes de las cadenas de fecha
	var annoFecha = parseInt(fecha.split('-')[0]);
	var mesFecha = parseInt(fecha.split('-')[1]);

	var annoDesde = parseInt(selectedRangoDesde.split('-')[0]);
	var mesDesde = parseInt(selectedRangoDesde.split('-')[1]);

	// Convertir fechas a números para facilitar la comparación
	var fechaNumero = annoFecha * 12 + mesFecha;
	var fechaNumeroDesde = annoDesde * 12 + mesDesde;

	// Verificar si la fecha es mayor que la "fecha desde"
	return fechaNumero >= fechaNumeroDesde;
}

function llenarTablaConFiltros() {
	let selectedAnno = selectAnno.value;
	let selectedMes = selectMes.value;

	let selectedRangoDesde = rangoDesde.value;
	let selectedRangoHasta = rangoHasta.value;

	// Limpiar la tabla antes de llenarla de nuevo
	bodyTabla.innerHTML = '';

	for (let i = 0; i < cantPersonas; i++) {
		let persona = lista_personas[i];
		let mes_registro = persona.fecha_de_registro.split('/')[1]; // Como la fecha está en DD/MM/AAAA, hay que hacerle split
		let mes_registro_sin_cero = mes_venta.replace(/^0+/, ''); // Quita el "0" del mes. Ejemplo: 04 pasa a ser 4. Esto se usa para la igualdad después
		let anno_registro = persona.fecha_de_registro.split('/')[2];

		let fecha_formato_rango = `${anno_registro}-${mes_registro}`; // Crea la fecha en formato AAAA-MM

		// Variable para controlar si se debe agregar la fila a la tabla
		let agregarFila = true;

		if (radioFechaEspecifica.checked) {
			if (selectedAnno !== '0' && anno_venta !== selectedAnno) {
				agregarFila = false;
			}
			if (selectedMes !== '0' && mes_registro_sin_cero !== selectedMes) {
				agregarFila = false;
			}
		} else {
			if (
				selectedRangoDesde !== '' &&
				selectedRangoHasta !== '' &&
				!fechaEntreRango(fecha_formato_rango)
			) {
				agregarFila = false;
			}
			if (
				selectedRangoDesde !== '' &&
				selectedRangoHasta == '' &&
				!fechaMayorQueDesde(fecha_formato_rango)
			) {
				agregarFila = false;
			}
			if (
				selectedRangoDesde == '' &&
				selectedRangoHasta !== '' &&
				!fechaMenorQueHasta(fecha_formato_rango)
			) {
				agregarFila = false;
			}
		}

		// Agregar la fila a la tabla solo si todos los filtros coinciden
		if (agregarFila) {
			bodyTabla.appendChild(crearFila(lista_personas[i]));
		}
	}
}

function vaciarTabla() {
	bodyTabla.innerHTML = '';
}

btnGenerarReporte.addEventListener('click', async () => {
	vaciarTabla();
	llenarTablaConFiltros();
});

document.addEventListener('DOMContentLoaded', async () => {
	cedulaVendedorActual = '12345';

	lista_personas = await listarClientes();

	if (lista_personas) {
		cantPersonas = lista_personas.length;
	} else {
		msjNoUsuarios.style.display = 'block';
	}
});

//  EJEMPLO DE UN USUARIO PARA SACARLE INFO
//  cedula: { type: String, required: true, unique: true },
// 	nombre: { type: String, required: true, unique: false },
// 	primerApellido: { type: String, required: false, unique: false },
// 	nomTramo: { type: String, required: false, unique: false },
// 	correo: { type: String, required: false, unique: false },
// 	telefono: { type: String, required: false, unique: false },
// 	tienePermisos: { type: Boolean, required: false, unique: false }, // Si tiene = TRUE. Si no tiene = FALSE
// 	rol: { type: String, default: 'Vendedor' },
// 	contrasenna: { type: String, required: false, unique: false },
// 	foto: { type: String, required: false, unique: false },
// 	estado: {
// 		type: String,
// 		enum: ['Activo', 'Inactivo', 'Rechazado'],
// 		default: 'Inactivo',
// 	},
// 	razon_rechazo: { type: String, required: false, unique: false },
// 	fecha_de_registro: { type: String, required: false, unique: false },

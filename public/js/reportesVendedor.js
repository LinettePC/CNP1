const btnGenerarReporte = document.getElementById('btnGenerarReporte');
const bodyTabla = document.getElementById('bodyTabla');
let lista_ventas = [];
let cantVentas;

// Condiciones:
const selectComprador = document.querySelector('#selectComprador');
const selectCategoria = document.querySelector('#selectCategoria');
const selectProducto = document.querySelector('#selectProducto');

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

const msjNoVentas = document.getElementById('msjNoVentas');

//

function crearFila(venta) {
	let iva = venta.precio_venta * 0.13;
	iva = Math.round(iva * 100) / 100;

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
	let selectedComprador = selectComprador.value;
	let selectedCategoria = selectCategoria.value;
	let selectedProducto = selectProducto.value;

	let selectedAnno = selectAnno.value;
	let selectedMes = selectMes.value;

	let selectedRangoDesde = rangoDesde.value;
	let selectedRangoHasta = rangoHasta.value;

	// Limpiar la tabla antes de llenarla de nuevo
	bodyTabla.innerHTML = '';

	for (let i = 0; i < cantVentas; i++) {
		let venta = lista_ventas[i];
		let mes_venta = venta.fecha_de_venta.split('/')[1]; // Como la fecha está en DD/MM/AAAA, hay que hacerle split
		let mes_venta_sin_cero = mes_venta.replace(/^0+/, ''); // Quita el "0" del mes. Ejemplo: 04 pasa a ser 4. Esto se usa para la igualdad después
		let anno_venta = venta.fecha_de_venta.split('/')[2];

		let fecha_formato_rango = `${anno_venta}-${mes_venta}`; // Crea la fecha en formato AAAA-MM

		// Variable para controlar si se debe agregar la fila a la tabla
		let agregarFila = true;

		if (
			selectedComprador !== '0' &&
			venta.cedula_comprador !== selectedComprador
		) {
			agregarFila = false;
		}
		if (
			selectedCategoria !== '0' &&
			venta.categoria_producto !== selectedCategoria
		) {
			agregarFila = false;
		}
		if (
			selectedProducto !== '0' &&
			venta.nombre_producto !== selectedProducto
		) {
			agregarFila = false;
		}
		if (radioFechaEspecifica.checked) {
			if (selectedAnno !== '0' && anno_venta !== selectedAnno) {
				agregarFila = false;
			}
			if (selectedMes !== '0' && mes_venta_sin_cero !== selectedMes) {
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
			bodyTabla.appendChild(crearFila(lista_ventas[i]));
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

function llenarSelects() {
	let compradores = [];
	let productos = [];
	let categorias = [];

	// Función para agregar opciones al elemento select
	function agregarOpciones(elementoSelect, items) {
		items.forEach((item) => {
			let nuevaOpcion = document.createElement('option');
			nuevaOpcion.innerText = item;
			nuevaOpcion.value = item;
			elementoSelect.appendChild(nuevaOpcion);
		});
	}

	// Iterar a través de cada objeto en la lista
	lista_ventas.forEach((venta) => {
		// Extraer valores para compradores
		let compradorCedula = venta.cedula_comprador;
		if (!compradores.includes(compradorCedula)) {
			compradores.push(compradorCedula);
		}

		// Extraer valores para productos
		let nombreProducto = venta.nombre_producto;
		if (!productos.includes(nombreProducto)) {
			productos.push(nombreProducto);
		}

		// Extraer valores para categorías
		let categoriaProducto = venta.categoria_producto;
		if (!categorias.includes(categoriaProducto)) {
			categorias.push(categoriaProducto);
		}
	});

	// Agregar opciones para compradores
	agregarOpciones(selectComprador, compradores);

	// Agregar opciones para productos
	agregarOpciones(selectProducto, productos);

	// Agregar opciones para categorías
	agregarOpciones(selectCategoria, categorias);
}

document.addEventListener('DOMContentLoaded', async () => {
	cedulaVendedorActual = '12345';

	lista_ventas = await listarVentasUsuario(cedulaVendedorActual);

	if (lista_ventas) {
		cantVentas = lista_ventas.length;
	} else {
		msjNoVentas.style.display = 'block';
	}

	llenarSelects();
});

// EJEMPLO DE UNA VENTA PARA SACARLE INFO
// ventainfo = {
// 	_id: '66216816290ad2651cc23278',
// 	cedula_comprador: '12345',
// 	cedula_vendedor: '54321',
// 	nombre_producto: 'Fresa',
// 	categoria_producto: 'Frutas',
// 	cedula_comprador: '12345',
// 	cedula_vendedor: '54321',
// cantidad_comprada: '3',
// 	fecha_de_venta: '18/04/2024',
// 	nombre_comprador: 'Pepe',
// 	nombre_producto: 'Fresa',
// 	nombre_vendedor: 'Alberto',
// 	precio_venta: '2000',
// 	tramo: 'Fresas Alberto',
// };

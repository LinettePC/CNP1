const btnGenerarReporte = document.getElementById('btnGenerarReporte');
const bodyTabla = document.getElementById('bodyTabla');
let lista_personas = [];
let lista_vendedores = [];
let lista_usuarios = [];

// Condiciones:
const selectTipo = document.querySelector('#selectTipo');

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
	const row = document.createElement('tr');

	if (persona.rol === 'Cliente') {
		row.innerHTML = `
	  	<td>${persona.fecha_de_registro}</td>
		<td>${persona.rol}</td>
		<td><a href="perfilPublico.html?tipo=Cliente&cedula=${persona.cedula}">${persona.cedula}</a></td>
		<td>${persona.correo}</td>
		<td>${persona.nombre}</td>
		<td>${persona.primerApellido}</td>
		<td>${persona.telefono}</td>
		<td>Es cliente</td>
		<td class="botonesAdmin">
				<button class="boton-editar" type="button" onclick="window.location.href = 'editarUsuario.html?tipo=${persona.rol}&cedula=${persona.cedula}'">Editar</button>
				<button class="boton-eliminar" type="button" onclick="eliminarUsuario('${persona._id}', '${persona.rol}', '${persona.cedula}')">Eliminar</button>
        	</td>
	`;
	} else {
		if (persona.permisos) {
			row.innerHTML = `
            <td>${persona.fecha_de_registro}</td>
            <td>${persona.rol}</td>
            <td><a href="perfilPublico.html?tipo=Vendedor&cedula=${persona.cedula}">${persona.cedula}</a></td>
            <td>${persona.correo}</td>
            <td>${persona.nombre}</td>
            <td>${persona.primerApellido}</td>
            <td>${persona.telefono}</td>
            <td>Sí</td>
            <td class="botonesAdmin">
				<button class="boton-editar" type="button" onclick="window.location.href = 'editarUsuario.html?tipo=${persona.rol}&cedula=${persona.cedula}'">Editar</button>
				<button class="boton-eliminar" type="button" onclick="eliminarUsuario('${persona._id}', '${persona.rol}', '${persona.cedula}')">Eliminar</button>
        	</td>
            `;
		} else {
			row.innerHTML = `
            <td>${persona.fecha_de_registro}</td>
            <td>${persona.rol}</td>
            <td><a href="perfilPublico.html?tipo=Vendedor&cedula=${persona.cedula}">${persona.cedula}</a></td>
            <td>${persona.correo}</td>
            <td>${persona.nombre}</td>
            <td>${persona.primerApellido}</td>
            <td>${persona.telefono}</td>
            <td>No</td>
            <td class="botonesAdmin">
				<button class="boton-editar" type="button" onclick="window.location.href = 'editarUsuario.html?tipo=${persona.rol}&cedula=${persona.cedula}'">Editar</button>
				<button class="boton-eliminar" type="button" onclick="eliminarUsuario('${persona._id}', '${persona.rol}', '${persona.cedula}')">Eliminar</button>
        	</td>
            `;
		}
	}

	return row;
}

async function eliminarUsuario(id_mongo, tipo_usuario, cedula_usuario) {
	Swal.fire({
		title: `¿Seguro que quieres eliminar el ${tipo_usuario}: '${cedula_usuario}'? `,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#81b12a',
		cancelButtonColor: 'rgb(198, 0, 0)',
		confirmButtonText: 'Sí',
		cancelButtonText: 'No',
	}).then(async (result) => {
		if (result.isConfirmed) {
			// If "Sí" is clicked, proceed with deleting the product
			if (tipo_usuario === 'Cliente') {
				await eliminarCliente(id_mongo);
			} else {
				await eliminarVendedor(id_mongo);
			}

			Swal.fire({
				title: 'Se eliminó el usuario',
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
	});
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
	let selectedTipo = selectTipo.value;

	let selectedAnno = selectAnno.value;
	let selectedMes = selectMes.value;

	let selectedRangoDesde = rangoDesde.value;
	let selectedRangoHasta = rangoHasta.value;

	// Limpiar la tabla antes de llenarla de nuevo
	bodyTabla.innerHTML = '';

	for (let i = 0; i < lista_usuarios.length; i++) {
		let usuario = lista_usuarios[i];
		console.log(usuario.fecha_de_registro)
		let mes_registro = usuario.fecha_de_registro.split('/')[1]; // Como la fecha está en DD/MM/AAAA, hay que hacerle split
		let mes_registro_sin_cero = mes_registro.replace(/^0+/, ''); // Quita el "0" del mes. Ejemplo: 04 pasa a ser 4. Esto se usa para la igualdad después
		let anno_registro = usuario.fecha_de_registro.split('/')[2];

		let fecha_formato_rango = `${anno_registro}-${mes_registro}`; // Crea la fecha en formato AAAA-MM

		// Variable para controlar si se debe agregar la fila a la tabla
		let agregarFila = true;

		if (selectedTipo !== '0' && usuario.rol !== selectedTipo) {
			agregarFila = false;
		}
		if (radioFechaEspecifica.checked) {
			if (selectedAnno !== '0' && anno_registro !== selectedAnno) {
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
			bodyTabla.appendChild(crearFila(lista_usuarios[i]));
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

window.addEventListener('load', async () => {
	lista_personas = await listarClientes();
	lista_vendedores = await listarVendedores();

	lista_usuarios = lista_personas.concat(lista_vendedores);

	console.log(lista_usuarios);

	if (!lista_usuarios) {
		msjNoUsuarios.style.display = 'block';
	} else {
		llenarTablaConFiltros();
	}
});

//  EJEMPLO DE UN USUARIO PARA SACARLE INFO
//  cedula: { type: String, required: true, unique: true },
// 	nombre: { type: String, required: true, unique: false },
// 	primerApellido: { type: String, required: false, unique: false },
// 	nomTramo: { type: String, required: false, unique: false },
// 	correo: { type: String, required: false, unique: false },
// 	telefono: { type: String, required: false, unique: false },
// 	permisos: { type: Boolean, required: false, unique: false }, // Si tiene = TRUE. Si no tiene = FALSE
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

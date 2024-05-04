const bodyTabla = document.getElementById('bodyTabla');
let lista_categorias = [];

const msjNoCategorias = document.getElementById('msjNoCategorias');

function crearFila(categoria) {
	const row = document.createElement('tr');

	if (
		categoria.nombre === 'Frutas y Verduras' ||
		categoria.nombre === 'Lácteos' ||
		categoria.nombre === 'Carnes'
	) {
		row.innerHTML = `
			<td>${categoria.nombre}</td>
			<td>Creada por el sistema</td>
			<td class="botonesAdmin">
				<p>Es una categoría predeterminada.</p>
			</td>
			 `;
	} else {
		if (categoria.tipo === 'Usuario') {
			row.innerHTML = `
			<td>${categoria.nombre}</td>
			<td>Creada por un vendedor</td>
			<td class="botonesAdmin">
				<button class="boton-editar" type="button" onclick="editarCategoriaSitio('${categoria._id}', '${categoria.nombre}')">Editar</button>
				<button class="boton-eliminar" type="button" onclick="eliminarCategoriaSitio('${categoria._id}', '${categoria.nombre}')">Eliminar</button>
			</td>
			 `;
		} else {
			row.innerHTML = `
			<td>${categoria.nombre}</td>
			<td>Creada por el administrador</td>
			<td class="botonesAdmin">
				<button class="boton-editar" type="button" onclick="editarCategoriaSitio('${categoria._id}', '${categoria.nombre}')">Editar</button>
				<button class="boton-eliminar" type="button" onclick="eliminarCategoriaSitio('${categoria._id}', '${categoria.nombre}')">Eliminar</button>
			</td>
			 `;
		}
	}

	return row;
}

async function editarCategoriaSitio(id_mongo, nombre_categoria) {
	Swal.fire({
		title: `Ingrese el nombre nuevo de la categoria: '${nombre_categoria}'`,
		input: 'text',
		inputAttributes: {
			autocapitalize: 'off',
		},
		showCancelButton: true,
		confirmButtonColor: '#81b12a',
		cancelButtonColor: 'rgb(198, 0, 0)',
		confirmButtonText: 'Enviar nuevo nombre',
		cancelButtonText: 'Cancelar',
	}).then(async (result) => {
		if (result.isConfirmed) {
			await actualizarCategoria(id_mongo, result.value);

			Swal.fire({
				title: 'Se actualizó la categoría',
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

async function eliminarCategoriaSitio(id_mongo, nombre_categoria) {
	Swal.fire({
		title: `¿Seguro que quieres eliminar la categoría: '${nombre_categoria}'? `,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#81b12a',
		cancelButtonColor: 'rgb(198, 0, 0)',
		confirmButtonText: 'Sí',
		cancelButtonText: 'No',
	}).then(async (result) => {
		if (result.isConfirmed) {
			// If "Sí" is clicked, proceed with deleting the product
			await eliminarCategoria(id_mongo);

			Swal.fire({
				title: 'Se eliminó la categoría',
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

async function agregarCategoriaSitio() {
	Swal.fire({
		title: `Ingrese el nombre de la nueva categoría:`,
		input: 'text',
		inputAttributes: {
			autocapitalize: 'off',
		},
		showCancelButton: true,
		confirmButtonColor: '#81b12a',
		cancelButtonColor: 'rgb(198, 0, 0)',
		confirmButtonText: 'Crear nueva categoría',
		cancelButtonText: 'Cancelar',
	}).then(async (result) => {
		if (result.isConfirmed) {
			categoriaJSON = {
				nombre: result.value,
				tipo: 'Default',
			};

			await registrarCategoria(categoriaJSON);

			Swal.fire({
				title: 'Se agregó la categoría al sistema',
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

function llenarTabla() {
	for (let i = 0; i < lista_categorias.length; i++) {
		bodyTabla.appendChild(crearFila(lista_categorias[i]));
	}
}

window.addEventListener('load', async () => {
	lista_categorias = await obtenerCategorias();

	if (!lista_categorias) {
		msjNoCategorias.style.display = 'block';
	} else {
		llenarTabla();
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

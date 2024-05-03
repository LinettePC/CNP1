// Hecho por Isaac Ch.

const contenedorNombre = document.getElementById('nombre');
const contenedorDescripcion = document.getElementById('descripcion');
const contenedorCategoria = document.getElementById('categoria');
const contenedorCategoriaNueva = document.getElementById('categoriaNueva');

const containerAgregarProducto = document.getElementById(
	'containerAgregarProducto'
);
const containerMsjPermisos = document.getElementById('containerMsjPermisos');
const selectCategoria = document.getElementById('categoria');

let creandoNuevaCategoria = false;

document.getElementById('categoria').addEventListener('change', function () {
	var selectedValue = this.value;
	if (selectedValue === 'new_category') {
		document.getElementById('campoCategoriaNueva').style.display = 'block';
		creandoNuevaCategoria = true;
	} else {
		document.getElementById('campoCategoriaNueva').style.display = 'none';
		creandoNuevaCategoria = false;
	}
});

function conseguirParamPorNombre(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Recibir info del form:

document
	.querySelector('form')
	.addEventListener('submit', async function (event) {
		event.preventDefault(); // Prevent the form from submitting normally

		// Get form inputs
		const nombre = document.getElementById('nombre').value;
		const descripcion = document.getElementById('descripcion').value;
		const categoria = document.getElementById('categoria').value;
		const categoriaNueva = document.getElementById('categoriaNueva').value;

		// Validate form fields
		const fieldsToValidate = {
			nombre: nombre,
			descripcion: descripcion,
			categoria: categoria,
		};

		// Check for empty fields and add the "error" class
		for (const field in fieldsToValidate) {
			const value = fieldsToValidate[field];

			if (!value) {
				document.getElementById(field).classList.add('error');
			} else {
				document.getElementById(field).classList.remove('error');
			}
		}

		// If a new category is being created, validate the new category input
		if (categoria === 'new_category' && !categoriaNueva) {
			document.getElementById('categoriaNueva').classList.add('error');
		} else {
			document.getElementById('categoriaNueva').classList.remove('error');
		}

		// Check if any field has the "error" class, if yes, stop form submission
		if (document.querySelectorAll('.error').length > 0) {
			return; // Stop form submission
		}

		// If a new category is being created, use the value from the new category input field
		let categoriaFinal = '';

		if (creandoNuevaCategoria) {
			categoriaFinal = categoriaNueva;
		} else {
			categoriaFinal = categoria;
		}

		// Construct payload object

		const uploadedImage = document.getElementById('foto-producto');

		let payload;

		// Check if an image is uploaded
		if (!uploadedImage) {
			payload = {
				nombre: nombre,
				descripcion: descripcion,
				categoria: categoriaFinal,
			};
		} else {
			payload = {
				nombre: nombre,
				descripcion: descripcion,
				categoria: categoriaFinal,
				imagen: uploadedImage.src,
			};
		}

		// Send the payload to the database (replace this with your actual database interaction)

		registrarInfo(payload);

		console.log('hello');
	});

async function registrarInfo(payload) {
	await registrarProductoDefault(payload);

	let categoriaJSON = { nombre: payload.categoria };

	if (creandoNuevaCategoria) {
		await registrarCategoria(categoriaJSON);
	}

	Swal.fire({
		title: 'Se registró el producto',
		text: 'Gracias por usar nuestros servicios',
		icon: 'success',
		timer: 2500,
		timerProgressBar: true,
		showConfirmButton: false,
		allowOutsideClick: false,
	});

	setTimeout(() => {
		window.location.href = 'catalogoAdmin.html';
	}, 2500);
}

function llenarCategorias(elementoSelect, items) {
	items.forEach((item) => {
		let nuevaOpcion = document.createElement('option');
		nuevaOpcion.innerText = item;
		nuevaOpcion.value = item;
		elementoSelect.appendChild(nuevaOpcion);
	});

	let separador = document.createElement('option');
	separador.innerText = '------------------------------------------';
	separador.value = '';
	separador.disabled = true;

	let opcionNuevaCat = document.createElement('option');
	opcionNuevaCat.innerText = 'Crear nueva categoría';
	opcionNuevaCat.value = 'new_category';

	elementoSelect.appendChild(separador);
	elementoSelect.appendChild(opcionNuevaCat);
}

function llenarCamposProducto(info_producto) {
	contenedorNombre.value = info_producto.nombre;
	contenedorNombre.disabled = true;

	contenedorDescripcion.value = info_producto.descripcion;
	contenedorDescripcion.disabled = true;

	contenedorCategoria.value = info_producto.categoria;
	contenedorCategoria.disabled = true;
}

let usuarioActual = {};
let cedula_usuario = sessionStorage.getItem('cedula');
let rol = sessionStorage.getItem('rol');

window.addEventListener('load', async () => {
	lista_categorias = await obtenerCategorias();

	let nombresCategorias = [];

	lista_categorias.forEach((categoria) => {
		nombresCategorias.push(categoria.nombre);
	});

	llenarCategorias(selectCategoria, nombresCategorias);
});

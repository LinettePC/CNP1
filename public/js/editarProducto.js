// Hecho por Isaac Ch.

let creandoNuevaCategoria = false;

const contenedorNombre = document.getElementById('nombre');
const contenedorDescripcion = document.getElementById('descripcion');
const contenedorCategoria = document.getElementById('categoria');
const contenedorCategoriaNueva = document.getElementById('categoriaNueva');
const contenedorPrecio = document.getElementById('precio');
const contenedorInventario = document.getElementById('inventario');

const flechaDevolver = document.getElementById('flechaDevolver');

const btnEliminar = document.getElementById('btnEliminar');

function conseguirParamPorNombre(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

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

btnEliminar.addEventListener('click', async (event) => {
	event.preventDefault();

	Swal.fire({
		title: `¿Seguro que quieres eliminar el producto '${productoDB.nombre}'? `,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#81b12a',
		cancelButtonColor: 'rgb(198, 0, 0)',
		confirmButtonText: 'Sí',
		cancelButtonText: 'No',
	}).then(async (result) => {
		if (result.isConfirmed) {
			// If "Sí" is clicked, proceed with deleting the product
			if (rol === 'Vendedor') {
				await eliminarProducto(id_producto);

				Swal.fire({
					title: 'Se eliminó el producto',
					text: 'Gracias por usar nuestros servicios',
					icon: 'success',
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false,
					allowOutsideClick: false,
				});

				setTimeout(() => {
					window.location.href = 'catalogoVendedor.html';
				}, 2500);
			} else {
				await eliminarProductoDefault(id_producto);
				Swal.fire({
					title: 'Se eliminó el producto',
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
		}
	});
});

// Recibir info del form:

document.querySelector('form').addEventListener('submit', function (event) {
	event.preventDefault(); // Prevent the form from submitting normally

	// Get form inputs
	let nombre = document.getElementById('nombre').value;
	let descripcion = document.getElementById('descripcion').value;
	let categoria = document.getElementById('categoria').value;
	let categoriaNueva = document.getElementById('categoriaNueva').value;
	let precio = document.getElementById('precio').value;
	let inventario = document.getElementById('inventario').value;

	// Validate form fields
	const fieldsToValidate = {
		nombre: nombre,
		descripcion: descripcion,
		categoria: categoria,
		precio: precio,
		inventario: inventario,
	};

	// Check for empty fields and add the "error" class
	for (const field in fieldsToValidate) {
		const value = fieldsToValidate[field];
		let esVendedor = rol === 'Vendedor';

		if (!esVendedor && (field === 'precio' || field === 'inventario')) {
			continue;
		}

		// Perform validation for other fields
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
	const categoriaFinal =
		categoria === 'new_category' ? categoriaNueva : categoria;

	// Construct payload object

	const imageInput = document.getElementById('imagen');
	const uploadedImage = imageInput.files[0];

	let payload;

	// Check if an image is uploaded
	if (!uploadedImage) {
		payload = {
			cedula_vendedor: '12345',
			nombre: nombre,
			tramo: 'Tramo Test',
			descripcion: descripcion,
			categoria: categoriaFinal,
			precio_vendedor: precio,
			inventario: inventario,
		};
	} else {
		payload = {
			cedula_vendedor: '12345',
			nombre: nombre,
			tramo: 'Tramo Test',
			descripcion: descripcion,
			categoria: categoriaFinal,
			precio_vendedor: precio,
			inventario: inventario,
			imagen: uploadedImage,
		};
	}

	// Send the payload to the database (replace this with your actual database interaction)
	registrarInfo(payload);
});

async function registrarInfo(payload) {
	if (rol === 'Vendedor') {
		await actualizarProducto(id_producto, payload);
	} else {
		await actualizarProductoDefault(id_producto, payload);
	}

	let categoriaJSON = { nombre: payload.categoria };

	if (creandoNuevaCategoria) {
		await registrarCategoria(categoriaJSON);
	}

	Swal.fire({
		title: 'Se actualizó el producto',
		text: 'Gracias por usar nuestros servicios',
		icon: 'success',
		timer: 2500,
		timerProgressBar: true,
		showConfirmButton: false,
		allowOutsideClick: false,
	});

	setTimeout(() => {
		window.location.href = 'catalogoVendedor.html';
	}, 2500);
}

function crearOpcionCategoria(value) {
	var optionElement = document.createElement('option');
	optionElement.value = value;
	optionElement.textContent = value;
	optionElement.selected = true;
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

function llenarCamposProducto(info_producto) {
	contenedorNombre.value = info_producto.nombre;
	contenedorDescripcion.value = info_producto.descripcion;
	contenedorCategoria.value = info_producto.categoria;

	contenedorCategoria.appendChild(crearSeparador());
	contenedorCategoria.appendChild(
		crearOpcionCategoria(info_producto.categoria)
	);

	if (rol === 'Vendedor') {
		contenedorPrecio.value = info_producto.precio_vendedor;
		contenedorInventario.value = info_producto.inventario;
	}
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

let id_producto = conseguirParamPorNombre('id');
let productoDB = {};
let cedula_usuario = '';
let rol = 'Admin';

window.addEventListener('load', async () => {
	lista_categorias = await obtenerCategorias();

	let nombresCategorias = [];

	lista_categorias.forEach((categoria) => {
		nombresCategorias.push(categoria.nombre);
	});

	llenarCategorias(contenedorCategoria, nombresCategorias);
	// productoDB = await conseguirProductoID(id_producto);

	if (rol === 'Vendedor') {
		usuarioActual = await conseguirVendedorCedula(cedula_usuario);
		productoDB = await conseguirProductoID(id_producto);
	} else {
		usuarioActual = await conseguirAdminCedula(cedula_usuario);
		productoDB = await conseguirProductoDefaultID(id_producto);

		contenedorPrecio.style.display = 'none';
		contenedorPrecio.parentElement.style.display = 'none';
		contenedorInventario.style.display = 'none';
		contenedorInventario.parentElement.style.display = 'none';

		flechaDevolver.onclick = () => {
			window.location.href = 'catalogoAdmin.html';
		};

		flechaDevolver.querySelector('span').textContent =
			'Volver a "Productos disponibles en el sitio"';
	}

	if (!productoDB) {
		console.log('No existe el producto');
	} else {
		llenarCamposProducto(productoDB);
	}

	console.log(productoDB);
});

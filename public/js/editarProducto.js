// Hecho por Isaac Ch.

const creandoNuevaCategoria = false;

const contenedorNombre = document.getElementById('nombre');
const contenedorDescripcion = document.getElementById('descripcion');
const contenedorCategoria = document.getElementById('categoria');
const contenedorCategoriaNueva = document.getElementById('categoriaNueva');
const contenedorPrecio = document.getElementById('precio');
const contenedorInventario = document.getElementById('inventario');

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
			nombre: nombre,
			descripcion: descripcion,
			categoria: categoriaFinal,
			precio: precio,
			inventario: inventario,
		};
	} else {
		payload = {
			nombre: nombre,
			descripcion: descripcion,
			categoria: categoriaFinal,
			precio: precio,
			inventario: inventario,
			imagen: uploadedImage,
		};
	}

	// Send the payload to the database (replace this with your actual database interaction)
	sendDataToDatabase(payload);
});

function llenarCamposProducto(info_producto) {
	contenedorNombre.value = info_producto.nombre;
	contenedorDescripcion.value = info_producto.descripcion;
	contenedorCategoria.value = info_producto.categoria;
	contenedorPrecio.value = info_producto.precio_vendedor;
}

document.addEventListener('DOMContentLoaded', async () => {
	let id_producto = conseguirParamPorNombre('id');

	let productoDB = await conseguirProductoID(id_producto);

	if (!productoDB) {
		console.log('No existe el producto');
	} else {
		llenarCamposProducto(productoDB);
	}
});

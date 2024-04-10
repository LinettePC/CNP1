// Hecho por Isaac Ch.

const creandoNuevaCategoria = false;

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

	// Get form inputs (assuming hidden field for product ID)
	const productId = document.getElementById('productId').value;
	const nombre = document.getElementById('nombre').value;
	const descripcion = document.getElementById('descripcion').value;
	const categoria = document.getElementById('categoria').value;
	const categoriaNueva = document.getElementById('categoriaNueva').value;
	const precio = document.getElementById('precio').value;
	const inventario = document.getElementById('inventario').value;

	// Validate form fields (consider adjusting validation based on your needs)
	const fieldsToValidate = {
		nombre: nombre,
		descripcion: descripcion,
		categoria: categoria,
		precio: precio,
		inventario: inventario,
	};

	// Check if any field has the "error" class, if yes, stop form submission
	const categoriaFinal =
		categoria === 'new_category' ? categoriaNueva : categoria;

	// Construct payload object
	const payload = {
		id: productId, // Include product ID for update
		nombre: nombre,
		descripcion: descripcion,
		categoria: categoriaFinal,
		precio: precio,
		inventario: inventario,
	};

	// Send the payload to the database (replace this with your actual database interaction)
	sendDataToDatabase(payload);
});

function sendDataToDatabase(payload) {
	// This is a placeholder function. Replace this with your actual code to send data to the database.
	console.log('Updating product with ID:', payload.id, 'Data:', payload);
	// Here you can use AJAX, fetch API, or any other method to send data (PUT request recommended for updates)
}

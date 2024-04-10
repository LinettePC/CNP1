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

	// Get form inputs
	const nombre = document.getElementById('nombre').value;
	const descripcion = document.getElementById('descripcion').value;
	const categoria = document.getElementById('categoria').value;
	const categoriaNueva = document.getElementById('categoriaNueva').value;
	const precio = document.getElementById('precio').value;
	const inventario = document.getElementById('inventario').value;

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

function sendDataToDatabase(payload) {
	// This is a placeholder function. Replace this with your actual code to send data to the database.
	console.log('Sending data to the database:', payload);
	// Here you can use AJAX, fetch API, or any other method to send the data to your backend
}

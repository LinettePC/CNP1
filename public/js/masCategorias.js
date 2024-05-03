const selectCategoria = document.getElementById('selectCategorias');

function llenarCategorias(elementoSelect, items) {
	items.forEach((item) => {
		let nuevaOpcion = document.createElement('option');
		nuevaOpcion.innerText = item;
		nuevaOpcion.value = item;
		elementoSelect.appendChild(nuevaOpcion);
	});
}

let lista_productos = [];
let lista_categorias = [];

const filaProducto = document.getElementById('fila');
function formatearNumeroConComas(numero) {
	if (numero) {
		return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	} else {
		return 0;
	}
}

function crearTarjetaProducto(
	nombre,
	tramo,
	precioVendedor,
	productoID,
	imagenProducto
) {
	// Crear el elemento de la tarjeta de producto
	const item = document.createElement('div');
	item.classList.add('item');

	// Contenedor de la foto
	const contenedorFoto = document.createElement('div');
	contenedorFoto.classList.add('contenedor-foto');

	// Enlace
	const enlace = document.createElement('a');
	enlace.href = `paginaProducto.html?id=${productoID}`; // URL dinámica del producto

	// Imagen
	const imagen = document.createElement('img');
	if (imagenProducto == '' || !imagenProducto || imagenProducto == 'noimg') {
		imagen.src = '/public/img/error/noimg.jpg';
	} else {
		imagen.src = imagenProducto;
	}

	imagen.alt = `Imagen de ${nombre}`;

	// Agregar la imagen al enlace
	enlace.appendChild(imagen);

	// Nombre del producto
	const nombreElemento = document.createElement('span');
	nombreElemento.classList.add('nombre');
	nombreElemento.textContent = nombre;
	// Basicamente esta haciendo esto: <span class = "nombre">nombre<span/>

	// Precio del producto
	const precioElemento = document.createElement('span');
	precioElemento.classList.add('precio');
	precioElemento.textContent = '₡' + formatearNumeroConComas(precioVendedor);

	// Tramo del producto
	const tramoElemento = document.createElement('p');
	tramoElemento.classList.add('tramo');
	tramoElemento.textContent = tramo;

	// Agregar elementos al contenedor principal
	contenedorFoto.appendChild(enlace); // Agregar el enlace al contenedor de la foto
	item.appendChild(contenedorFoto); // Agregar el contenedor de la foto al elemento principal
	item.appendChild(nombreElemento); // Agregar el nombre al elemento principal
	item.appendChild(precioElemento); // Agregar el precio al elemento principal
	item.appendChild(tramoElemento); // Agregar el tramo al elemento principal

	// Devolver la tarjeta creada
	return item;
}

selectCategorias.addEventListener('change', function () {
	const selectedCategoria = this.value; // Parse selected value to integer

	// Clear filaProducto before adding new products
	filaProducto.innerHTML = '';

	// Filter products based on selected category
	const productosFiltrados = lista_productos.filter(
		(producto) => producto.categoria === selectedCategoria
	);

	if (productosFiltrados.length === 0) {
		let mostrador = document.getElementById('mostrador');
		mostrador.style.fontSize = '30px';
		mostrador.innerHTML = 'No hay productos en esta categoría';
	} else {
		// Create cards for filtered products
		if (selectedCategoria === '0') {
			// If selected category is 0, show all products
			lista_productos.forEach((productoDB) => {
				const nuevaTarjeta = crearTarjetaProducto(
					productoDB.nombre,
					productoDB.tramo,
					productoDB.precio_vendedor,
					productoDB._id,
					productoDB.imagen
				);

				filaProducto.appendChild(nuevaTarjeta);
			});
		} else {
			// Create cards for filtered products
			productosFiltrados.forEach((productoDB) => {
				const nuevaTarjeta = crearTarjetaProducto(
					productoDB.nombre,
					productoDB.tramo,
					productoDB.precio_vendedor,
					productoDB._id,
					productoDB.imagen
				);

				filaProducto.appendChild(nuevaTarjeta);
			});
		}
	}
});

window.addEventListener('load', async () => {
	lista_categorias = await obtenerCategorias();
	lista_productos = await listarProductos();

	console.log(lista_productos);

	let nombresCategorias = [];

	lista_categorias.forEach((categoria) => {
		nombresCategorias.push(categoria.nombre);
	});

	llenarCategorias(selectCategoria, nombresCategorias);

	if (lista_productos.length === 0) {
		let mostrador = document.getElementById('mostrador');
		mostrador.style.fontSize = '30px';
		mostrador.innerHTML = 'No hay productos';
	} else {
		for (let i = 0; i < lista_productos.length; i++) {
			let productoDB = lista_productos[i];
			let nuevaTarjeta = crearTarjetaProducto(
				productoDB.nombre,
				productoDB.tramo,
				productoDB.precio_vendedor,
				productoDB._id,
				productoDB.imagen
			);
			filaProducto.appendChild(nuevaTarjeta);
		}
	}
});

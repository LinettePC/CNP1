const filaProducto = document.getElementById('fila');

function formatearNumeroConComas(numero) {
	return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

	// Precio del producto
	const precioElemento = document.createElement('span');
	precioElemento.classList.add('precio');
	precioElemento.textContent = '₡' + formatearNumeroConComas(precioVendedor);

	// Descripción del producto
	const tramoElemento = document.createElement('p');
	tramoElemento.classList.add('tramo');
	tramoElemento.textContent = tramo;

	// Agregar elementos al contenedor principal
	contenedorFoto.appendChild(enlace); // Agregar el enlace al contenedor de la foto
	item.appendChild(contenedorFoto); // Agregar el contenedor de la foto al elemento principal
	item.appendChild(nombreElemento); // Agregar el nombre al elemento principal
	item.appendChild(precioElemento); // Agregar el precio al elemento principal
	item.appendChild(tramoElemento); // Agregar la descripción al elemento principal

	// Devolver la tarjeta creada
	return item;
}

window.addEventListener('load', async () => {
	let lista_FrutasVerduras = await listar_FrutasVerduras();

	if (lista_FrutasVerduras.length === 0) {
		//let mensajeSinProductos = crearMensajeSinProductos();
		//divMensaje.appendChild(mensajeSinProductos);
	} else {
		for (let i = 0; i < lista_FrutasVerduras.length; i++) {
			let productoDB = lista_FrutasVerduras[i];

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

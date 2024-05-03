let lista_productos = [];

function conseguirParamPorNombre(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

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
	descripcion,
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

	// Descripción del producto
	const descripcionElemento = document.createElement('p');
	descripcionElemento.classList.add('descripcion');
	descripcionElemento.textContent = descripcion;

	// Agregar elementos al contenedor principal
	contenedorFoto.appendChild(enlace); // Agregar el enlace al contenedor de la foto
	item.appendChild(contenedorFoto); // Agregar el contenedor de la foto al elemento principal
	item.appendChild(nombreElemento); // Agregar el nombre al elemento principal
	item.appendChild(precioElemento); // Agregar el precio al elemento principal
	item.appendChild(descripcionElemento); // Agregar la descripción al elemento principal
	//En otras palabras, llenando el div

	// Devolver la tarjeta creada
	return item;
}

window.addEventListener('load', async () => {
	lista_productos = await listarProductos();

	console.log(lista_productos);

	if (lista_productos.length === 0) {
		let mostrador = document.getElementById('mostrador');
		mostrador.style.fontSize = '30px';
		mostrador.innerHTML = 'No hay productos';
	} else {
        let busqueda = conseguirParamPorNombre('busqueda');
        busqueda = busqueda.toLowerCase();

		const productosFiltrados = lista_productos.filter(product => product.nombre.toLowerCase().includes(busqueda));

        console.log(busqueda);

		if (productosFiltrados.length === 0) {
			let mostrador = document.getElementById('mostrador');
			mostrador.style.fontSize = '30px';
			mostrador.innerHTML =
				'No se encontraron productos con ese nombre';
		} else {
			// Create cards for filtered products
            productosFiltrados.forEach((productoDB) => {
                const nuevaTarjeta = crearTarjetaProducto(
                    productoDB.nombre,
                    productoDB.descripcion,
                    productoDB.precio_vendedor,
                    productoDB._id,
                    productoDB.imagen
                );

                filaProducto.appendChild(nuevaTarjeta);
            });
		}
	}
});

// Hecho por Isaac Ch.

const canasta = document.getElementById('canasta');
const divMensaje = document.getElementById('divMensaje');

function crearTarjetaProducto(nombre_producto, id_producto) {
	// Create a div element with class "tarjetaProducto"
	var tarjetaProducto = document.createElement('div');
	tarjetaProducto.className = 'tarjetaProducto';

	// Create a div element with class "tituloProducto" and text content "Zanahoria"
	var tituloProducto = document.createElement('div');
	tituloProducto.className = 'tituloProducto';
	tituloProducto.textContent = nombre_producto;

	// Create a div element with class "imagenProducto"
	var imagenProducto = document.createElement('div');
	imagenProducto.className = 'imagenProducto';

	// Create an img element with src and alt attributes
	var imgElement = document.createElement('img');
	imgElement.src = '/public/img/error/noimg.jpg';
	imgElement.alt = 'Imagen de un(a) ' + nombre_producto;

	// Append the imgElement to the "imagenProducto" div
	imagenProducto.appendChild(imgElement);

	// Create a div element
	var divElement = document.createElement('div');

	// Create an anchor element with href and class attributes
	var anchorElement = document.createElement('a');
	anchorElement.href = `editarProducto.html?id=${id_producto}`;
	anchorElement.className = 'botonEditar';
	anchorElement.textContent = 'Editar producto';

	// Append the anchorElement to the divElement
	divElement.appendChild(anchorElement);

	// Append all elements to the "tarjetaProducto" div
	tarjetaProducto.appendChild(tituloProducto);
	tarjetaProducto.appendChild(imagenProducto);
	tarjetaProducto.appendChild(divElement);

	// Now you can append "tarjetaProducto" to any existing element in the DOM to display it.
	// For example:
	return tarjetaProducto;
}

function crearMensajeSinProductos() {
	var divMensajeSinProductos = document.createElement('div');

	var mensaje = document.createElement('p');
	divMensajeSinProductos.appendChild(mensaje);
	divMensajeSinProductos.classList.add('mensaje-sin-productos');

	mensaje.innerHTML =
		"No tiene productos. <br/><br/>Haga click en el botón de <a href='agregarProductos.html'>'Agregar un nuevo producto'</a> para agregar nuevos productos.";

	return divMensajeSinProductos;
}

let cedula = sessionStorage.getItem('cedula');

window.addEventListener('load', async () => {
	let lista_productosDB = await listarProductosVendedor(cedula);
	console.log(lista_productosDB);

	let cantidad_productos_vendedor = lista_productosDB.length;

	if (cantidad_productos_vendedor === 0) {
		let mensajeSinProductos = crearMensajeSinProductos();
		divMensaje.appendChild(mensajeSinProductos);
	} else {
		for (let indice = 0; indice < cantidad_productos_vendedor; indice++) {
			let productoDB = lista_productosDB[indice];

			let nuevaTarjeta = crearTarjetaProducto(
				productoDB.nombre,
				productoDB._id
			);

			canasta.appendChild(nuevaTarjeta);
		}
	}
});

const tarjetaUsada = document.getElementById('tarjetaUsada');
const direccionEnvio = document.getElementById('direccionEnvio');
const totalFinal = document.getElementById('precioTotalCarrito');
const productosFlex = document.querySelector('.productos-flex');

// const producto = agregarProductoParaComprar('Naranja Importada Grande', 5, '₡500.00');
// productosFlex.appendChild(producto);

function formatearNumeroConComas(numero) {
	return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function actualizarTotal(nuevoTotal) {
	totalSumado = parseInt(precioTotalCarrito.innerText) + nuevoTotal;
	precioTotalCarrito.textContent = `₡${formatearNumeroConComas(totalSumado)}`;
}

function agregarProductoParaComprar(
	nombre,
	cantidad,
	precio,
	id,
	imagenProducto
) {
	// Crear el contenedor principal del producto
	const productoDiv = document.createElement('div');
	productoDiv.classList.add('producto');

	// Crear el contenedor de la imagen
	const contenedorImagen = document.createElement('div');
	contenedorImagen.classList.add('contenedor-imagen');

	// Crear la imagen
	const imagen = document.createElement('img');
	if (imagenProducto == '' || !imagenProducto || imagenProducto == 'noimg') {
		imagen.src = '/public/img/error/noimg.jpg';
	} else {
		imagen.src = imagenProducto;
	}

	imagen.alt = `Imagen de ${nombre}`;
	imagen.classList.add('imagen-ejemplo');

	// Agregar la imagen al contenedor de la imagen
	contenedorImagen.appendChild(imagen);

	// Crear el contenedor del nombre y cantidad del producto
	const nombreCantidadDiv = document.createElement('div');
	nombreCantidadDiv.classList.add('nombre-cantidad-producto');

	// Crear el contenedor del nombre del producto
	const nombreProductoSpan = document.createElement('span');
	nombreProductoSpan.classList.add('nombre-producto');
	nombreProductoSpan.textContent = nombre;

	// Crear el contenedor de la cantidad del producto
	const cantidadDiv = document.createElement('div');
	const cantidadUnidadesParrafo = document.createElement('p');
	cantidadUnidadesParrafo.classList.add('seccionUnidades');
	const cantidadSpan = document.createElement('span');
	cantidadSpan.classList.add('unidades-producto');
	cantidadSpan.textContent = cantidad;
	let cantidadTexto;
	if (parseInt(cantidad) === 1) {
		cantidadTexto = document.createTextNode(' Unidad');
	} else {
		cantidadTexto = document.createTextNode(' Unidades');
	}
	cantidadUnidadesParrafo.appendChild(cantidadSpan);
	cantidadUnidadesParrafo.appendChild(cantidadTexto);
	cantidadDiv.appendChild(cantidadUnidadesParrafo);

	// Agregar el nombre y la cantidad al contenedor del nombre y cantidad del producto
	nombreCantidadDiv.appendChild(nombreProductoSpan);
	nombreCantidadDiv.appendChild(cantidadDiv);

	// Crear el contenedor del precio del producto
	const precioDiv = document.createElement('div');
	precioDiv.classList.add('seccion-precio-producto');
	const precioParrafo = document.createElement('p');
	precioParrafo.classList.add('seccionPrecio');
	precioParrafo.textContent = 'Precio: ';
	const precioSpan = document.createElement('span');
	precioSpan.classList.add('precio-producto');
	precioSpan.textContent = `₡${formatearNumeroConComas(precio)}`;
	precioParrafo.appendChild(precioSpan);
	precioDiv.appendChild(precioParrafo);

	// Agregar todos los elementos al contenedor principal del producto
	productoDiv.appendChild(contenedorImagen);
	productoDiv.appendChild(nombreCantidadDiv);
	productoDiv.appendChild(precioDiv);

	// Agregar el producto al contenedor de productos-flex

	return productoDiv;
}

function crearMensajeSinProductos() {
	const productoDiv = document.createElement('div');
	// productoDiv.classList.add('nombre-producto');
	productoDiv.innerHTML =
		'<span class="nombre-producto">No hay productos en el <a href="carritoCompras.html">carrito.</a></span> <br> <span style="font-size: 17px">Agregue productos para poder comprar en el sitio.</span>';

	return productoDiv;
}

let listaProductosParaComprar =
	JSON.parse(localStorage.getItem('productos_en_carrito')) || [];

let totalProductos = 0;

window.addEventListener('load', async () => {
	usuarioActual = await conseguirCompradorCedula(cedula_usuario);

	if (usuarioActual) {
		llenarCampos(usuarioActual);
	}

	console.log(listaProductosParaComprar);

	if (listaProductosParaComprar.length === 0) {
		let mensajeSinProductos = crearMensajeSinProductos();
		productosFlex.appendChild(mensajeSinProductos);
	} else {
		revisarDatosUsuario();

		for (let i = 0; i < listaProductosParaComprar.length; i++) {
			let idProducto = listaProductosParaComprar[i].id;
			let productoDB = await conseguirProductoID(idProducto);
			console.log('producto encontrado', productoDB);
			cantidadComprar = listaProductosParaComprar[i].cantidad;

			let nuevaTarjeta = agregarProductoParaComprar(
				productoDB.nombre,
				cantidadComprar,
				productoDB.precio_con_iva * cantidadComprar,
				productoDB._id,
				productoDB.imagen
			);

			productosFlex.appendChild(nuevaTarjeta);
			totalProductos += productoDB.precio_con_iva * cantidadComprar;
		}
		actualizarTotal(totalProductos);
	}
});

function eliminarProductoDelLocalStorage(idProducto) {
	// Obtener la lista actual de productos en el carrito del Local Storage
	let productosEnCarrito =
		JSON.parse(localStorage.getItem('productos_en_carrito')) || [];

	// Filtrar la lista para excluir el producto que se va a eliminar
	productosEnCarrito = productosEnCarrito.filter(
		(producto) => producto.id !== idProducto
	);

	// Guardar la lista actualizada de productos en el carrito en el Local Storage
	localStorage.setItem(
		'productos_en_carrito',
		JSON.stringify(productosEnCarrito)
	);
}

function revisarDatosUsuario() {
	var tarjetaUsadaDiv = document.getElementById('tarjetaUsada');
	var direccionEnvioDiv = document.getElementById('direccionEnvio');
	var contenedorBotonInfo = document.querySelector('.container-boton-info');
	var contenedorBotonPago = document.querySelector('.container-boton-pago');

	var tarjetaText = tarjetaUsadaDiv.textContent.trim();
	var direccionText = direccionEnvioDiv.textContent.trim();

	if (
		tarjetaText === 'No hay ninguna' &&
		direccionText === 'No hay ninguna'
	) {
		var changeInfoButton = document.createElement('a');
		var changeInfoError = document.createElement('p');

		changeInfoError.innerHTML =
			'Para realizar su compra, por favor agregue <br/> su información de dirección y pago.';
		changeInfoError.classList.add('error-mensaje');

		changeInfoButton.innerHTML = 'Agregar información de dirección y pago';

		changeInfoButton.href = 'pagoDireccion.html';

		changeInfoButton.classList.add('boton-info');

		contenedorBotonInfo.appendChild(changeInfoError);

		contenedorBotonInfo.appendChild(changeInfoButton);
	} else {
		var buyButton = document.createElement('button');
		buyButton.innerHTML = 'Realizar compra';
		buyButton.type = 'submit';
		buyButton.classList.add('boton-comprar');

		buyButton.addEventListener('click', (event) => realizarCompra(event));

		contenedorBotonPago.appendChild(buyButton);
	}
}

async function realizarCompra(event) {
	event.preventDefault();

	for (let i = 0; i < listaProductosParaComprar.length; i++) {
		let idProducto = listaProductosParaComprar[i].id;
		let productoDB = await conseguirProductoID(idProducto);

		cantidadComprar = listaProductosParaComprar[i].cantidad;

		vendedor = await conseguirVendedorCedula(
			productoDB.cedula_vendedor
		);

		let ventaString = (
			productoDB.precio_con_iva * cantidadComprar
		).toString();

		let datosVenta = {
			cedula_comprador: usuarioActual.cedula,
			cedula_vendedor: productoDB.cedula_vendedor,
			id_producto: productoDB._id,
			nombre_producto: productoDB.nombre,
			categoria_producto: productoDB.categoria,
			precio_venta: ventaString,
			cantidad_comprada: cantidadComprar,
			nombre_comprador: usuarioActual.nombre,
			nombre_vendedor: vendedor.nombre,
			tramo: productoDB.tramo,
		};

		await registro_venta(datosVenta);
		await actualizarInventarioProdudcto(productoDB._id, cantidadComprar);
	}

	localStorage.clear();

	Swal.fire({
		title: 'Compra exitosa',
		text: `Su compra de ₡${totalProductos} se ha realizado exitosamente.`,
		icon: 'success',
		timer: 2500,
		timerProgressBar: true,
		showConfirmButton: false,
		allowOutsideClick: false,
	});

	setTimeout(() => {
		window.location.href = 'marketplace.html';
	}, 2500);
}

function llenarCampos(persona) {
	// ${persona.direccion.provincia}
	let direccionString = `${persona.nombre} ${persona.primerApellido} /  ${persona.direccion.direccionExacta} / ${persona.direccion.distrito} / ${persona.direccion.canton}`;

	tarjetaUsada.innerHTML = persona.metodo_pago;
	direccionEnvio.innerHTML = direccionString;
}

let usuarioActual = {};
const cedula_usuario = sessionStorage.getItem('cedula');

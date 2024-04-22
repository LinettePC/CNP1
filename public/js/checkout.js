const productosFlex = document.querySelector(".productos-flex"); 

// const producto = agregarProductoParaComprar('Naranja Importada Grande', 5, '₡500.00');
// productosFlex.appendChild(producto);


function agregarProductoParaComprar(nombre, cantidad, precio, id) {
    
    // Crear el contenedor principal del producto
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

    // Crear el contenedor de la imagen
    const contenedorImagen = document.createElement('div');
    contenedorImagen.classList.add('contenedor-imagen');

    // Crear la imagen
    const imagen = document.createElement('img');
    imagen.src = 'img/quesito.png';
    imagen.alt = '';
    imagen.classList.add('imagen-ejemplo');



    // Crear el botón de eliminación
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'X'; // Texto del botón de eliminación
    botonEliminar.classList.add('boton-eliminar'); // Clase para estilizar el botón de eliminación

    botonEliminar.addEventListener('click', () => {
		// Eliminar el producto del Local Storage
		eliminarProductoDelLocalStorage(id);
	
		// Eliminar el elemento del DOM
		productoDiv.remove();
	});

    // Agregar el botón de eliminación al contenedor del producto
    productoDiv.appendChild(botonEliminar);

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
    const cantidadTexto = document.createTextNode(' Unidades');
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
    precioSpan.textContent = precio;
    precioParrafo.appendChild(precioSpan);
    precioDiv.appendChild(precioParrafo);

    // Agregar todos los elementos al contenedor principal del producto
    productoDiv.appendChild(contenedorImagen);
    productoDiv.appendChild(nombreCantidadDiv);
    productoDiv.appendChild(precioDiv);

    // Agregar el producto al contenedor de productos-flex
  
    return productoDiv;
}

document.addEventListener('DOMContentLoaded', async () => {

	listaProductosParaComprar = JSON.parse(localStorage.getItem("productos_en_carrito")) || [];

	console.log(listaProductosParaComprar);
	
	if (listaProductosParaComprar.length === 0) {
		//let mensajeSinProductos = crearMensajeSinProductos();
		//divMensaje.appendChild(mensajeSinProductos);
	} else {
		for (let i = 0; i < listaProductosParaComprar.length; i++) {
			let idProducto = listaProductosParaComprar[i].id;
			productoDB = await obtenerProductoPorId(idProducto);
			console.log('producto encontrado', productoDB)
			cantidadComprar = listaProductosParaComprar[i].cantidad;

			let nuevaTarjeta = agregarProductoParaComprar(productoDB.nombre, cantidadComprar , (productoDB.precio_vendedor * cantidadComprar), productoDB._id);

			productosFlex.appendChild(nuevaTarjeta);
		}
	}
});

function eliminarProductoDelLocalStorage(idProducto) {
    // Obtener la lista actual de productos en el carrito del Local Storage
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos_en_carrito")) || [];

    // Filtrar la lista para excluir el producto que se va a eliminar
    productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== idProducto);

    // Guardar la lista actualizada de productos en el carrito en el Local Storage
    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
}


window.onload = function () {
	var tarjetaUsadaDiv = document.getElementById('tarjetaUsada');
	var direccionEnvioDiv = document.getElementById('direccionEnvio');
	var contenedorBotonInfo = document.querySelector('.container-boton-info');
	var contenedorBotonPago = document.querySelector('.container-boton-pago');

	var tarjetaText = tarjetaUsadaDiv.querySelector('p').textContent.trim();
	var direccionText = direccionEnvioDiv.querySelector('p').textContent.trim();

	if (
		tarjetaText === 'No hay ninguna' &&
		direccionText === 'No hay ninguna'
	) {
		var changeInfoButton = document.createElement('a');
		var changeInfoError = document.createElement('p');

		changeInfoError.innerHTML =
			'Para realizar su compra, por favor agregue <br/> su información de dirección y pago.';
			changeInfoError.classList.add('error-mensaje');

		changeInfoButton.textContent =
			'Agregar información de dirección y pago';

		changeInfoButton.href = "pagoDireccion.html"

		changeInfoButton.classList.add('boton-info');

		contenedorBotonInfo.appendChild(changeInfoError);

		contenedorBotonInfo.appendChild(changeInfoButton);
	} else {
		var buyButton = document.createElement('button');
		buyButton.textContent = 'Realizar compra';
		buyButton.type = 'submit';
		buyButton.classList.add('boton-comprar');
		contenedorBotonPago.appendChild(buyButton);
	}
};

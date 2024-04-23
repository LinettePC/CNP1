const contenedorProductosDefault = document.getElementById('contenedorProductosDefault');

function agregarTarjetaProducto(producto) {
	// Create div element for the product card
	const tarjetaProducto = document.createElement('div');
	tarjetaProducto.classList.add('tarjetaProducto');

	// Create div element for the product title
	const tituloProducto = document.createElement('div');
	tituloProducto.classList.add('tituloProducto');
	tituloProducto.textContent = producto.nombre;

	// Create div element for the product image
	const imagenProducto = document.createElement('div');
	imagenProducto.classList.add('imagenProducto');
	const img = document.createElement('img');
    img.src = '/public/img/error/noimg.jpg';
	img.alt = 'Imagen de un(a) ' + producto.nombre;
	imagenProducto.appendChild(img);

	// Create div element for the button
	const buttonDiv = document.createElement('div');
	const botonEditar = document.createElement('a');
	botonEditar.href = `anadirProducto.html?id=${producto._id}`;
	botonEditar.classList.add('botonEditar');
	botonEditar.textContent = 'Agregar este producto';
	buttonDiv.appendChild(botonEditar);

	// Append all elements to the product card
	tarjetaProducto.appendChild(tituloProducto);
	tarjetaProducto.appendChild(imagenProducto);
	tarjetaProducto.appendChild(buttonDiv);

	// Append the product card to the body or any desired parent element
	contenedorProductosDefault.appendChild(tarjetaProducto);
}

document.addEventListener('DOMContentLoaded', async () => {
	const lista_productos_default = await listarProductosDefault();

    console.log(lista_productos_default);

	lista_productos_default.forEach((producto) => {
		agregarTarjetaProducto(producto);
	});
});

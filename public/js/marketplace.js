let cantidadItemsCarrito = document.getElementById('cantidadItemsCarrito');
const nombreCliente = document.getElementById('textoCuenta');

document.addEventListener('DOMContentLoaded', async () => {
	let usuario_base_datos = await conseguirCompradorCedula(
		sessionStorage.getItem('cedula')
	);
	nombreCliente.innerText = `${usuario_base_datos.nombre} ${usuario_base_datos.primerApellido}`;
	listaObjetosLocalStorage =
		JSON.parse(localStorage.getItem('productos_en_carrito')) || [];
	cantidadItemsCarrito.innerHTML = listaObjetosLocalStorage.length;
});
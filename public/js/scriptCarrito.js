document.addEventListener('DOMContentLoaded', () => {
	let cantidadItemsCarrito = document.getElementById('cantidadItemsCarrito');

	let itemsActuales =
		JSON.parse(localStorage.getItem('productos_en_carrito')) || [];

	let cantItemsActuales = itemsActuales.length;

	if (cantidadItemsCarrito !== null) {
		cantidadItemsCarrito.innerText = cantItemsActuales;

		if (cantidadItemsCarrito.innerText === '0') {
			cantidadItemsCarrito.style.display = 'none';
		}
	}
});

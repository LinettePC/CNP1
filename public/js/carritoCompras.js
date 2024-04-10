const precioProductoCarritoElements = document.querySelectorAll(
	'#precioProductoCarrito'
);
const precioTotalProductosElement = document.getElementById(
	'precioTotalProductos'
);
let total = 0;

precioProductoCarritoElements.forEach((element) => {
	let precio = parseInt(element.textContent);

	total += precio;
});

precioTotalProductosElement.textContent = total;

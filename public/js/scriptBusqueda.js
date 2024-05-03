const inputBusqueda = document.getElementById('inputBusqueda');
const btnBusqueda = document.getElementById('btnBusqueda');

inputBusqueda.addEventListener('input', function () {
	let input = this.value.toLowerCase();

	btnBusqueda.addEventListener('click', () => {
		window.location.href = `busquedaProductos.html?busqueda=${input}`;
	});
});

inputBusqueda.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Check if Enter key is pressed
        btnBusqueda.click(); // Simulate click on btnBusqueda
    }
});
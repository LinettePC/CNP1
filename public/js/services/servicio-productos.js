// Assuming `cedula` is the ID you want to search products for
const listarProductosVendedor = async (cedulaBuscada) => {
	let lista_productos = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/listar-productos-vendedor',
		responseType: 'json',
		params: {
			cedula: cedulaBuscada,
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				lista_productos = response.data.lista;
			}
		})
		.catch((error) => {
			console.log(error);
		});

	return lista_productos;
};

const actualizarProducto = async (id_producto, actualizaciones_producto) => {
	let lista_productos = [];
	await axios({
		method: 'PUT',
		url: 'http://localhost:3000/api/actualizar-producto',
		responseType: 'json',
		body: {
			_id: id_producto,
			updates: actualizaciones_producto,
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				console.log(response.data.msj);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

const conseguirProductoID = async (id_producto) => {
	let productoBuscado = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/conseguir-producto-id',
		responseType: 'json',
		params: {
			_id: id_producto,
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				productoBuscado = response.data.producto;
			}
		})
		.catch((error) => {
			console.log(error);
		});
	return productoBuscado[0];
};

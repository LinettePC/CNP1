// Assuming `cedula` is the ID you want to search products for
const listarProductosVendedor = async (cedulaEnviada) => {
	let lista_productos = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/listar-productos-vendedor',
		responseType: 'json',
		params: {
			cedula: cedulaEnviada,
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
	await axios({
		method: 'PUT',
		url: 'http://localhost:3000/api/actualizar-producto',
		responseType: 'json',
		data: {
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

const agregarReviewProducto = async (id_producto, actualizaciones_producto) => {
	await axios({
		method: 'PUT',
		url: 'http://localhost:3000/api/agregar-review-producto',
		responseType: 'json',
		data: {
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

const actualizarProductoDefault = async (
	id_producto,
	actualizaciones_producto
) => {
	await axios({
		method: 'PUT',
		url: 'http://localhost:3000/api/actualizar-producto-default',
		responseType: 'json',
		data: {
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

const eliminarProducto = async (id_producto) => {
	await axios({
		method: 'DELETE',
		url: 'http://localhost:3000/api/eliminar-producto',
		responseType: 'json',
		data: {
			_id: id_producto,
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

const eliminarProductoDefault = async (id_producto) => {
	await axios({
		method: 'DELETE',
		url: 'http://localhost:3000/api/eliminar-producto-default',
		responseType: 'json',
		data: {
			_id: id_producto,
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
			id: id_producto,
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
	return productoBuscado;
};

const conseguirProductoDefaultID = async (id_producto) => {
	let productoBuscado = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/conseguir-producto-default-id',
		responseType: 'json',
		params: {
			id: id_producto,
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
	return productoBuscado;
};

const registrarProducto = async (info) => {
	let productoRegistrado;
	await axios({
		method: 'POST',
		url: 'http://localhost:3000/api/registrar-producto',
		responseType: 'json',
		data: info, // Corregir esta línea
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				productoRegistrado = response.data.productoCreado;
				console.log(productoRegistrado);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

const registrarProductoDefault = async (info) => {
	let productoRegistrado;
	await axios({
		method: 'POST',
		url: 'http://localhost:3000/api/registrar-producto-default',
		responseType: 'json',
		data: info,
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				productoRegistrado = response.data.productoCreado;
				console.log(productoRegistrado);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

const listarProductosDefault = async () => {
	let lista_productos = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/listar-productos-default',
		responseType: 'json',
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

const actualizarInventarioProdudcto = async (id_producto, cantidad_restada) => {
	await axios({
		method: 'PUT',
		url: 'http://localhost:3000/api/actualizar-inventario-producto',
		responseType: 'json',
		data: {
			_id: id_producto,
			cantidad_restada: cantidad_restada,
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
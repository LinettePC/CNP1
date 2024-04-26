//Este metodo se puede utilizar de manera general para listar los productos de distintas categorias, sin necesidad de reescribir codigo
const listar_productos = async (categoria) => {
	let lista_productos = []; //almacenar a los productos que recuperamos de la BD

	await axios({
		method: 'get',
		url: 'http://localhost:3000/api/' + categoria,
		responseType: 'json',
	})
		.then((res) => {
			lista_productos = res.data.lista;
		})
		.catch((error) => {
			console.log(error);
		});

	return lista_productos;
};

const listar_lacteos = async () => {
	let lista_lacteos = []; //almacenar a los productos que recuperamos de la BD

	await axios({
		method: 'get',
		url: 'http://localhost:3000/api/listar-lacteos',
		responseType: 'json',
	})
		.then((res) => {
			lista_lacteos = res.data.lista;
		})
		.catch((error) => {
			console.log(error);
		});

	return lista_lacteos;
};

const listar_FrutasVerduras = async () => {
	let lista_FrutasVerduras = []; //almacenar a los productos que recuperamos de la BD

	await axios({
		method: 'get',
		url: 'http://localhost:3000/api/listar-frutas-verduras',
		responseType: 'json',
	})
		.then((res) => {
			lista_FrutasVerduras = res.data.lista;
		})
		.catch((error) => {
			console.log(error);
		});

	return lista_FrutasVerduras;
};

const listar_carnes = async () => {
	let lista_carnes = []; //almacenar a los productos que recuperamos de la BD

	await axios({
		method: 'get',
		url: 'http://localhost:3000/api/listar-carnes',
		responseType: 'json',
	})
		.then((res) => {
			lista_carnes = res.data.lista;
		})
		.catch((error) => {
			console.log(error);
		});

	return lista_carnes;
};

const obtenerProductoPorId = async (id_producto) => {
	let productoEncontrado = {};
	try {
		const response = await axios.get(
			`http://localhost:3000/api/producto/${id_producto}`
		);
		if (response.data.resultado === true) {
			productoEncontrado = response.data.producto;
		} else {
			console.error('Error al obtener el producto:', response.data.msj);
		}
	} catch (error) {
		console.error('Error de red al obtener el producto:', error);
	}
	return productoEncontrado;
};

const obtenerUrlProductoPorId = async (id_producto) => {
	let urlProducto = '';
	try {
		const response = await axios.get(
			`http://localhost:3000/producto/${id_producto}`
		);
		if (response.data.resultado === true) {
			const producto = response.data.producto;
			urlProducto = producto.url;
		} else {
			console.error('Error al obtener el producto:', response.data.msj);
		}
	} catch (error) {
		console.error('Error de red al obtener el producto:', error);
	}
	return urlProducto;
};

const obtenerCategorias = async () => {
	let lista_categorias = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/listar-categorias',
		responseType: 'json',
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				lista_categorias = response.data.lista;
			}
		})
		.catch((error) => {
			console.log(error);
		});

	return lista_categorias;
};

const registrarCategoria = async (info, tipo) => {
	let categoriaRegistrada;
	
	await axios({
		method: 'POST',
		url: 'http://localhost:3000/api/registrar-categoria',
		responseType: 'json',
		data: info,
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				categoriaRegistrada = response.data.CategoriaDB;
				console.log(categoriaRegistrada);
			}
		})
		.catch((error) => {
			console.log(error);
	});
};

const eliminarCategoria = async (id_categoria) => {
	await axios({
		method: 'DELETE',
		url: 'http://localhost:3000/api/eliminar-categoria',
		responseType: 'json',
		data: {
			_id: id_categoria,
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

const actualizarCategoria = async (id_categoria, nuevo_nombre) => {
	await axios({
		method: 'PUT',
		url: 'http://localhost:3000/api/actualizar-categoria',
		responseType: 'json',
		data: {
			_id: id_categoria,
			update: {
				nombre: nuevo_nombre,
			},
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				console.log(response.data.info);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

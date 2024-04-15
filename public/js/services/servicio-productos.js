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

const registrarProducto = async (
	cedulaEnviada,
	nombreEnviado,
	descripcionEnviada,
	categoriaEnviada
) => {
	let productoRegistrado;
	await axios({
		method: 'POST',
		url: 'http://localhost:3000/api/registrar-producto',
		responseType: 'json',
		data: {
			cedula_vendedor_env: cedulaEnviada,
			nombre_env: nombreEnviado,
			descripcion_env: descripcionEnviada,
			categoria_env: categoriaEnviada,
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				productoRegistrado = response.data.productoCreado;
			}
		})
		.catch((error) => {
			console.log(error);
		});
};



const obtenerProductoPorId = async (id_producto) => {
    let productoEncontrado = {};
    try {
        const response = await axios.get(`http://localhost:3000/api/producto/${id_producto}`);
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
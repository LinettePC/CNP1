const registro_venta = async (
	param_cedula_comprador,
	param_cedula_vendedor,
	param_nombre_producto,
	param_categoria_producto,
	param_precio_venta,
	param_cantidad_comprada,
	param_nombre_comprador,
	param_nombre_vendedor,
	param_tramo
) => {
	await axios({
		method: 'POST',
		url: 'http://localhost:3000/api/registrar-venta',
		responseType: 'json',
		data: {
			cedula_comprador: param_cedula_comprador,
			cedula_vendedor: param_cedula_vendedor,
			nombre_producto: param_nombre_producto,
			categoria_producto: param_categoria_producto,
			precio_venta: param_precio_venta,
			cantidad_comprada: param_cantidad_comprada,
			nombre_comprador: param_nombre_comprador,
			nombre_vendedor: param_nombre_vendedor,
			tramo: param_tramo,
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				switch (response.data.error.code) {
					case 11000:
						Swal.fire({
							title: 'No se completó el registro',
							text: 'La venta ya existe',
							icon: 'error',
						});
						break;
					default:
						break;
				}
			} else {
				console.log("Venta registrada.")
                console.log(data)
			}
		})
		.then(() => {
			window.location.href = 'marketplace.html';
		})
		.catch((error) => {
			console.log(error);
		});
};

const listarVentasUsuario = async (cedulaEnviada) => {
	let lista_ventas = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/listar-ventas-cedula',
		responseType: 'json',
		params: {
			cedula: cedulaEnviada,
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				lista_ventas = response.data.listaVentas;
			}
		})
		.catch((error) => {
			console.log(error);
		});

	return lista_ventas;
};

const listarVentas = async () => {
	let lista_ventas = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/listar-ventas',
		responseType: 'json',
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				lista_ventas = response.data.lista;
			}
		})
		.catch((error) => {
			console.log(error);
		});

	return lista_ventas;
};
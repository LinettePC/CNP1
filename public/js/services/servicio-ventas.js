const registro_venta = async (info) => {
	await axios({
		method: 'POST',
		url: 'http://localhost:3000/api/registrar-venta',
		responseType: 'json',
		data: info,
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
				console.log('Venta registrada.');
			}
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

// Todos los métodos de AXIOS relacionados a los usuarios del sitio
// web van en esta página.

// Hecho por Isaac
const conseguirVendedorCedula = async (p_cedula) => {
	let personaBuscada = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/buscar-vendedor-cedula',
		responseType: 'json',
		params: {
			cedula: p_cedula,
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				personaBuscada = response.data.Cliente;
			}
		})
		.catch((error) => {
			console.log(error);
		});
	return personaBuscada;
};

const conseguirCompradorCedula = async (p_cedula) => {
	let personaBuscada = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/buscar-cliente-cedula',
		responseType: 'json',
		params: {
			cedula: p_cedula,
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				personaBuscada = response.data.Cliente;
			}
		})
		.catch((error) => {
			console.log(error);
		});
	return personaBuscada;
};

const conseguirAdminCedula = async (p_cedula) => {
	let personaBuscada = [];
	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/buscar-admin-cedula',
		responseType: 'json',
		params: {
			cedula: p_cedula,
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				console.log(response.data.error);
			} else {
				personaBuscada = response.data.Cliente;
			}
		})
		.catch((error) => {
			console.log(error);
		});
	return personaBuscada;
};

const actualizarDatosCliente = async (p_cedula, p_datos_nuevos) => {
	await axios({
		method: 'PUT',
		url: 'http://localhost:3000/api/actualizar-datos-cliente',
		responseType: 'json',
		data: {
			cedula: p_cedula,
			nueva_info: p_datos_nuevos,
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

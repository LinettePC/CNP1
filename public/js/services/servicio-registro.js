const registro_persona = async (param_cedula, param_nombre, param_correo) => {
	await axios({
		method: 'POST',
		url: 'http://localhost:3000/api/registrar',
		responseType: 'json',
		data: {
			cedula: param_cedula,
			correo: param_correo,
			nombre: param_nombre,
			foto: param_foto,
			contrasenna: param_contrasenna,
		},
	})
		.then((response) => {
			if (response.data.resultado == false) {
				switch (response.data.error.code) {
					case 11000:
						Swal.fire({
							title: 'No se completó el registro',
							text: 'La persona ya existe',
							icon: 'error',
						});
						break;
					default:
						break;
				}
			} else {
				Swal.fire({
					title: 'Registro completado',
					text: 'Tu cuenta de cliente ha sido creada',
					icon: 'success',
				});
			}
		})
		.then(() => {
			window.location.href = 'marketplace.html';
		})
		.catch((error) => {
			console.log(error);
		});
};

const listar_personas = async () => {
	let lista_usuarios = [];

	await axios({
		method: 'GET',
		url: 'http://localhost:3000/api/listar',
		responseType: 'json',
	})
		.then((response) => {
			lista_usuarios = response.data.lista;
		})
		.then(() => {
			window.location.href = 'marketplace.html';
		})
		.catch((error) => {
			console.log(error);
		});
    return lista_usuarios;
};

// Usage: registro_persona(cedula.value, nombre.value, correo.value)

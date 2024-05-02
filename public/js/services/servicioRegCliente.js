const registroCliente = async (pcedula, pnombre, pprimerApellido, pcorreo, ptelefono, pcontrasenna,pfotoId) => {
	await axios({
		method: "post",
		url: "http://localhost:3000/api/registrar-clientes",
		responseType: 'json',
		data: {
			cedula: pcedula,
            nombre: pnombre,
            primerApellido: pprimerApellido,
			correo: pcorreo,
            telefono: ptelefono,
			contrasenna: pcontrasenna,
			foto: pfotoId,
		}
	}).then((response) => {
		if (response.data.resultado === false) {
			if (response.data.error && response.data.error.code === 11000 && response.data.error.keyPattern && response.data.error.keyPattern.cedula) {
				Swal.fire({
					title: 'No se completó el envío del formulario',
					text: 'La cédula ya existe',
					icon: 'error',
				});
			} else {
				Swal.fire({
					title: 'No se completó el envío del formulario',
					text: response.data.msj,
					icon: 'error',
				});
			}
		} else {
			Swal.fire({
				title: 'Registro exitoso',
				text: 'Puede proceder a ingresar a su cuenta',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
				showConfirmButton: false,
				allowOutsideClick: false,
			});

			setTimeout(() => {
				window.location.href = 'inicioSesionCliente.html';
			}, 2000);
		}
	})
	.catch((err) => {
		console.log(err);
		Swal.fire({
			title: 'Error',
			text: 'Hubo un error al procesar tu solicitud, esa cedula ya existe.',
			icon: 'error',
		});
	});
};





// no he revisado esta funcion

/*
const listar_personas = async () => {
	let lista_usuarios = [];

	await axios({
		method: 'get',
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
*/
// Usage: registro_persona(cedula.value, nombre.value, correo.value)

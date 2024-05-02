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
		})
		.catch((err) => {
		
			if (err.response.data.error.code === 11000 && err.response.data.error.keyPattern && err.response.data.error.keyPattern.cedula) {
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
		
	});
};




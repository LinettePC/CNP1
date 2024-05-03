//en realidad esta funcion no es de registro, es de envio de formulario
const preRegistroVendedor = async (
	pCedula,
	pNombre,
	pPrimerApellido,
	pNombreTramo,
	pCorreo,
	pTelefono,
	pPermiso,
	pFoto,
	pContrasenna
) => {
	await axios({
		method: 'post',
		url: 'http://localhost:3000/api/registrar-vendedor',
		responseType: 'json',
		data: {
			cedula: pCedula,
			nombre: pNombre,
			primerApellido: pPrimerApellido,
			nomTramo: pNombreTramo,
			correo: pCorreo,
			telefono: pTelefono,
			permiso: pPermiso,
			foto: pFoto,
			contrasenna: pContrasenna,
		},
	})
		.then((response) => {
			Swal.fire({
				title: 'Formulario enviado',
				text: 'Recibirás un correo cuando tu solicitud sea revisada',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
				showConfirmButton: false,
				allowOutsideClick: false,
			});

			setTimeout(() => {
				window.location.href = 'dosLandingPage.html';
			}, 2000);
		})
		.catch((err) => {
			if (
				err.response.data.error.code === 11000 &&
				err.response.data.error.keyPattern &&
				err.response.data.error.keyPattern.cedula
			) {
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

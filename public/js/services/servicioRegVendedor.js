//en realidad esta funcion no es de registro, es de envio de formulario
const preRegistroVendedor = async (pCedula, pNombre, pPrimerApellido, pNombreTramo, pCorreo, pTelefono, pPermiso, pFoto, pContrasenna) => {
	await axios({
		method: "post",
        url: "http://localhost:3000/api/registrar-vendedor",
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
        }
    })
	.then((response) => {
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
				title: 'Formulario enviado',
				text: 'Recibirás un correo cuando tu solicitud sea revisada',
				icon: 'success',
			}).then(() => {
				setTimeout(()=>{
					window.location.href = 'dosLandingPage.html';
				}, 4000);
			});
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
const registroVendedor = async (pCedula, pNombre, pPrimerApellido, pNombreTramo, pCorreo, pTelefono, pPermisos,pFoto, pContrasenna) => {
	await axios({
		method: "post",
		url: "http://localhost:3000/api/registrar-vendedor",
		responseType: 'json',
		data: {
			cedula: pCedula,
            nombre: pNombre,
            primerApellido: pPrimerApellido,
            nombreTramo: pNombreTramo,
			correo: pCorreo,
            telefono: pTelefono,
            permisos: pPermisos,
			foto: pFoto,
			contrasenna: pContrasenna,
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

// function generarContrasenna(){}
//se puede hacer aca o en archivo de validaciones
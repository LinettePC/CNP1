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
			if (response.data.resultado == false) {
				switch (response.data.error.code) {
					case 11000:
						Swal.fire({
							title: 'No se completó el envío del formulario',
							text: 'El vendedor ya existe',
							icon: 'error',
						});
							break;
						default:
							break;
				}
			} else {
				Swal.fire({
					title: 'Formulario enviado',
					text: 'Recibirás un correo cuando tu solicitud sea revisada',
					icon: 'success',
				});
			}
		})
		.then(() => {
			setTimeout(()=>{
				window.location.href = 'dosLandingPage.html';
			},4000)
		})
		.catch((err) => {
			console.log(err);
		});
};

// function generarContrasenna(){}
//se puede hacer aca o en archivo de validaciones
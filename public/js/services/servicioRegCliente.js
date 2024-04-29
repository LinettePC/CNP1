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
			if (response.data.resultado == false) {
				switch (response.data.error.code) {
					case 11000:
						Swal.fire({
							title: 'No se completó el registro',
							text: 'El cliente ya existe',
							icon: 'error',
						});
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
			setTimeout(()=>{
				window.location.href = 'dosLandingPage.html';
			},3000)
			
		})
		.catch((err) => {
			console.log(err);
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

//Autor:Linette
const validarVendedor = async (pCedula, pContrasenna /*pEstado*/) => {
	await axios({
		method: 'post',
		url: 'http://localhost:3000/api/validarLogVendedor',
		responseType: 'json',
		data: {
			cedula: pCedula,
			contrasenna: pContrasenna,
		},
	}).then((res) => {
		if (res.data.resultado == 1) {
			Swal.fire({
				title: 'Tu cuenta fue aprobada',
				text: 'Por favor, cambia tu contraseña. Pronto serás redireccionado.',
				icon: 'success',
				timer: 2500,
				timerProgressBar: true,
				showConfirmButton: false,
				allowOutsideClick: false,
			});

			sessionStorage.setItem('cedula', res.data.usuario.cedula);
			sessionStorage.setItem('rol', res.data.usuario.rol);

			setTimeout(() => {
				window.location.href = 'cambioContraTemp.html';
			}, 2500);
		} else if (res.data.resultado == 2) {
			Swal.fire({
				title: 'Datos correctos',
				text: 'Pronto será redireccionado',
				icon: 'success',
				timer: 1000,
				timerProgressBar: true,
				showConfirmButton: false,
				allowOutsideClick: false,
			});

			sessionStorage.setItem('cedula', res.data.usuario.cedula);
			sessionStorage.setItem('rol', res.data.usuario.rol);

			setTimeout(() => {
				window.location.href = 'miPerfil.html';
			}, 1000);
		} else if (res.data.resultado == 3) {
			Swal.fire({
				title: 'Contraseña incorrecta',
				text: 'Vuelve a intentarlo',
				icon: 'warning',
			});
		} else if (res.data.resultado == 4) {
			Swal.fire({
				title: 'Cuenta pendiente',
				text: 'Tu solicitud de venta está siendo revisada',
				icon: 'warning',
			});
		} else if (res.data.resultado == 5) {
			Swal.fire({
				title: 'Tu cuenta fue rechazada',
				text: `Motivo: '${res.data.motivo}'.`,
				icon: 'error',
			});
		} else if (res.data.resultado == 6) {
			Swal.fire({
				title: 'Datos incorrectos',
				text: 'No existe un vendedor con esta identificación',
				icon: 'warning',
			});
		}
	});
};

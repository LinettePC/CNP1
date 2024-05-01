//Autor: Linette

//esta ruta esta en doc routes/auth.js
const validarCliente = async (pCedula, pContrasenna) => {
	await axios({
		method: 'post',
		url: 'http://localhost:3000/api/validarLogCliente',
		responseType: 'json',
		data: {
			cedula: pCedula,
			contrasenna: pContrasenna,
		},
	}).then((res) => {
		console.log(res);
		if (res.data.resultado == false) {
			Swal.fire({
				title: 'Datos incorrectos',
				text: 'La contraseña es incorrecta o el usuario no existe',
				icon: 'warning',
			});
		} else {
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
		}
	});
};

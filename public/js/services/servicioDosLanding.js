//Autor: Linette
//El inicio de sesion del administrador esta en la dosLandingPage

//esta ruta esta en doc routes/auth.js
const validarAdministrador = async (pCedula, pContrasenna) => {
	await axios({
		method: 'post',
		url: 'http://localhost:3000/api/validarLogAdministrador',
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
			//setTimeout(()=>{

			Swal.fire({
				title: 'Datos correctos',
				text: 'Pronto será redireccionado',
				icon: 'success',
				timer: 1500,
				timerProgressBar: true,
				showConfirmButton: false,
				allowOutsideClick: false,
			});

			sessionStorage.setItem('cedula', res.data.usuario.cedula);
			sessionStorage.setItem('rol', res.data.usuario.rol);
			localStorage.clear();

			setTimeout(() => {
				window.location.href = 'miPerfil.html';
			}, 1500);

			// setTimeout(()=>{
			//     Swal.fire({
			//         title: 'Datos correctos!!!',
			//         text: '',
			//         icon: 'success',
			//     });
			//     sessionStorage.setItem("cedula",res.data.usuario.cedula)
			//     sessionStorage.setItem("nombre",res.data.usuario.nombre)
			//     // sessionStorage.setItem("primerApellido",res.data.usuario.primerApellido)
			//     // sessionStorage.setItem("correo",res.data.usuario.correo)
			//     // sessionStorage.setItem("telefono",res.data.usuario.telefono)

			//     //sessionStorage.setItem("rol","cliente") //no necesario;
			//     //sessionStorage.setItem("estado",res.data.resultado.estado) //no necesario

			//     window.location.href= "miPerfil.html"
			// },1000)
		}
	});
};

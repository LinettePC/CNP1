const headerComprador = document.getElementById('headerComprador');
const headerVendedor = document.getElementById('headerVendedor');

const imgUsuario = document.getElementById('imgUsuario');
const nombreUsuario = document.getElementById('nombreUsuario');
const apellidoUsuario = document.getElementById('apellidoUsuario');
const correoUsuario = document.getElementById('correoUsuario');
const telefonoUsuario = document.getElementById('telefonoUsuario');
const cedulaUsuario = document.getElementById('cedulaUsuario');

const containerPago = document.getElementById('containerPago');

function llenarCampos(persona) {
	// imgUsuario.src = persona.img;
	nombreUsuario.innerText = persona.nombre;
	apellidoUsuario.innerText = persona.primerApellido;
	correoUsuario.innerText = persona.correo;
	telefonoUsuario.innerText = persona.telefono;
	cedulaUsuario.innerText = persona.cedula;
}

const cedula_usuario = sessionStorage.getItem('cedula');
const rol = sessionStorage.getItem('rol');

window.addEventListener('load', async () => {
	let usuarioActual = {};

	if (rol === 'Cliente') {
		headerComprador.style.display = 'flex';

		usuarioActual = await conseguirCompradorCedula(cedula_usuario);
	} else {
		headerVendedor.style.display = 'flex';
		containerPago.style.display = 'none';

		if (rol === 'Vendedor') {
			usuarioActual = await conseguirVendedorCedula(cedula_usuario);
		} else {
			usuarioActual = await conseguirAdminCedula(cedula_usuario);
		}
	}
	console.log(usuarioActual);
	llenarCampos(usuarioActual);
});

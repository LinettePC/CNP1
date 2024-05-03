const headerComprador = document.getElementById('headerComprador');
const headerVendedor = document.getElementById('headerVendedor');

const imgUsuario = document.getElementById('imgUsuario');
const nombreUsuario = document.getElementById('nombreUsuario');
const apellidoUsuario = document.getElementById('apellidoUsuario');
const correoUsuario = document.getElementById('correoUsuario');
const telefonoUsuario = document.getElementById('telefonoUsuario');
const cedulaUsuario = document.getElementById('cedulaUsuario');

const contenedorTramo = document.getElementById('contenedorTramo');
const containerPago = document.getElementById('containerPago');
const containerReporte = document.getElementById('containerReporte');
const hrefInicio = document.getElementById('hrefInicio');

function conseguirParamPorNombre(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function llenarCampos(persona) {
	nombreUsuario.innerText = persona.nombre;
	apellidoUsuario.innerText = persona.primerApellido;
	correoUsuario.innerText = persona.correo;
	telefonoUsuario.innerText = persona.telefono;
	cedulaUsuario.innerText = persona.cedula;

	if (rol === 'Vendedor') {
        let tramoVendedor = document.getElementById('tramoVendedor');
        contenedorTramo.style.display = 'block';
		tramoVendedor.innerText = persona.nomTramo;
	}

	if (persona.foto == '' || !persona.foto) {
		imgUsuario.src = 'img/avatar.png';
	} else {
		imgUsuario.src = persona.foto;
	}
}

let rol = conseguirParamPorNombre('tipo');
let cedula = conseguirParamPorNombre('cedula');
let rol_visitante = sessionStorage.getItem('rol');

window.addEventListener('load', async () => {
	let usuario_buscado = {};

	if (rol_visitante === 'Cliente') {
		headerComprador.style.display = 'flex';
	} else if (rol_visitante === 'Vendedor') {
        headerVendedor.style.display = 'flex';
    } else {
        hrefInicio.href = 'portalAdmin.html';
    }

	if (rol === 'Cliente') {
		usuario_buscado = await conseguirCompradorCedula(cedula);
	} else {
		if (rol === 'Vendedor') {
			contenedorTramo.style.display = 'block';
			usuario_buscado = await conseguirVendedorCedula(cedula);
		} else {
			usuario_buscado = await conseguirAdminCedula(cedula);
		}
	}
	console.log(usuario_buscado);
	llenarCampos(usuario_buscado);
});

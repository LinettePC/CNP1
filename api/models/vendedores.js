const mongoose = require('mongoose');

const schema_vendedor = new mongoose.Schema({
	cedula: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },
	primerApellido: { type: String, required: false, unique: false },
	nombreTramo: { type: String, required: false, unique: false },
	correo: { type: String, required: false, unique: false },
	telefono: { type: String, required: false, unique: false },
	//permisos pasar a type:boolean
	tienePermisos: { type: Boolean, required: false, unique: false }, // Si tiene = TRUE. Si no tiene = FALSE

	// Rol
	rol: { type: String, default: 'Vendedor' },

	// Non-required fields
	contrasenna: { type: String, required: false, unique: false },
	foto: { type: String, required: false, unique: false },
	estado: {
		type: String,
		enum: ['Activo', 'Inactivo', 'Rechazado'],
		default: 'Inactivo',
	},
	razon_rechazo: { type: String, required: false, unique: false },

	fecha_de_registro: { type: String, required: false, unique: false },
});

const Vendedor = mongoose.model('Vendedor', schema_vendedor, 'vendedores');

module.exports = Vendedor;

function name(params) {
	let conseguirUsuariosBD = ['usuario1', 'usuario2', 'usuario3'];

	let cedula_ingresada = '64534534';
	let contraseña_ingresada = 'pepito34';

	for (let i = 0; i < conseguirUsuariosDB.length; i++) {
		if (
			cedula_ingresada == conseguirUsuariosBD[i].cedula &&
			contraseña_ingresada == conseguirUsuariosBD[i].contrasenna
		) {
		}
	}
}

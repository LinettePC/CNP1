const mongoose = require('mongoose');

const schema_vendedor = new mongoose.Schema({
	cedula: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },
	primerApellido: { type: String, required: false, unique: false },
	nomTramo: { type: String, required: false, unique: false },
	correo: { type: String, required: false, unique: false },
	telefono: { type: String, required: false, unique: false },
	//permisos pasar a type:boolean
	permisos: { type: Boolean },
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

const mongoose = require('mongoose');

const schema_vendedor = new mongoose.Schema({
	correo: { type: String, required: true, unique: true },
	cedula: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },

	// Rol
	rol: { type: String, default: 'Vendedor' },

	// Non-required fields
	telefono: { type: String, required: false, unique: false },
	contrasenna: { type: String, required: false, unique: false },
	foto: { type: String, required: false, unique: false },
	estado: {
		type: String,
		enum: ['Activo', 'Inactivo', 'Rechazado'],
		default: 'Inactivo',
	},

	// productos: [
	// 	{
	// 		nombre_prod: { type: String, required: false, unique: false },
	// 		descripcion_prod: { type: String, required: false, unique: false },

	// 	},
	// ],
});

const Vendedor = mongoose.model('Vendedor', schema_vendedor, 'vendedores');

module.exports = Vendedor;

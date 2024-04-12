const mongoose = require('mongoose');

const schema_admin = new mongoose.Schema({
	cedula: { type: String, required: true, unique: true },
	correo: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },

	// Admin
	rol: { type: String, default: 'Admin'},

	// Non-required fields
	telefono: { type: String, required: false, unique: false },
	contrasenna: { type: String, required: false, unique: false },
	foto: { type: String, required: false, unique: false },

	// Admin specific field
	porcentaje_ganancia: { type: String, required: false, unique: false },
});

const Admin = mongoose.model('Admin', schema_admin, 'admins');

module.exports = Admin;

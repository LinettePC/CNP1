const mongoose = require('mongoose');

const schema_admin = new mongoose.Schema({
	cedula: { type: String, required: true, unique: true },
	correo: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },
	rol: { type: String, default: 'Admin'},

	// Non-required fields
	telefono: { type: String, required: false, unique: false },
	contrasenna: { type: String, required: false, unique: false },
	foto: { type: String, required: false, unique: false },
	estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Inactivo' },

	porcentaje_ganancia: { type: String, required: false, unique: false },
});

const Admin = mongoose.model('Admin', schema_admin, 'admins');

module.exports = Admin;

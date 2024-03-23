const mongoose = require('mongoose');

const schema_persona = new mongoose.Schema({
	correo: { type: String, required: true, unique: true },
	cedula: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },
	contrasenna: { type: String, required: true, unique: false },
	estado: { type: String, default: 'Inactivo' },
});

module.exports = mongoose.model('Persona', schema_persona, 'personas');

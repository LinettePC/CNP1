const mongoose = require('mongoose');

const schema_persona = new mongoose.Schema({
	correo: { type: String, required: true, unique: true },
	cedula: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },
	foto: { type: String, required: false, unique: false },
	telefono: { type: String, required: true, unique: false },
	estado: { type: String, default: 'Inactivo' },
	contrasenna: { type: String, required: true, unique: false },
	productos: [
		{
			nombre_prod: { type: String, required: false, unique: false },
			descripcion: { type: String, required: false, unique: false },
		},
	],
});

module.exports = mongoose.model('Persona', schema_persona, 'personas');

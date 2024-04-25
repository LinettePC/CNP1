const mongoose = require('mongoose');

const schema_cliente = new mongoose.Schema({
	cedula: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },
	primerApellido: { type: String, required: false, unique: false },
<<<<<<< HEAD
	
	correo: { type: String, required: false, unique: false },
	
=======
	correo: { type: String },
>>>>>>> 30d47da663bb5a78ba48adf9566227128680691a
	telefono: { type: String, required: false, unique: false },
	foto: { type: String, required: false, unique: false },
	contrasenna: { type: String, required: false, unique: false },
	contrasennaDos: { type: String, required: false, unique: false },

	// Rol
	rol: { type: String, default: 'Cliente' },

	// Non-required fields

	metodo_pago: { type: String },
	direccion: {
		nombre: { type: String },
		apellidos: { type: String },
		correo: { type: String },
		telefono: { type: String },
		provincia: { type: String },
		canton: { type: String },
		distrito: { type: String },
		direccionExacta: { type: String },
	},

	fecha_de_registro: { type: String, required: false, unique: false },
});

const Cliente = mongoose.model('Cliente', schema_cliente, 'clientes');

module.exports = Cliente;

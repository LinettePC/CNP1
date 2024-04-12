const mongoose = require('mongoose');

const schema_cliente = new mongoose.Schema({
	cedula: { type: String, required: true, unique: true },
	correo: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },

	// Rol
	rol: { type: String, default: 'Cliente'},

	

	// Non-required fields
	telefono: { type: String, required: false, unique: false },
	contrasenna: { type: String, required: false, unique: false },
	metodo_pago: { type: String, required: false, unique: false },
	direccion: { type: String, required: false, unique: false },
	foto: { type: String, required: false, unique: false },

	// rol: {
	// 	type: String,
	// 	enum: ['Cliente', 'Admin'],
	// 	default: 'Cliente',
	// 	required: true,
	// },
	// compras: [
	// 	{
	// 		nombre_compra: { type: String, required: false, unique: false },
	// 		precio_compra: { type: String, required: false, unique: false },
	// 	},
	// ],
});

const Cliente = mongoose.model('Cliente', schema_cliente, 'clientes');

module.exports = Cliente;

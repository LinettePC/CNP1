const mongoose = require('mongoose');

const schema_producto = new mongoose.Schema({
	// Identifying attribute
	cedula_vendedor: { type: String, required: true },

    // Detalles del producto
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },
	categoria: { type: String, required: true },

    // Detalles del vendedor
	inventario: { type: Number, required: false },
	precio_vendedor: { type: Number, required: false },
	precio_con_iva: { type: Number, required: false },
	imagen: { type: String, defaultValue: 'noimg' },
	tramo: { type: String, required: false },
	estrellas: [
		{
			type: String,
			enum: ['1', '2', '3', '4', '5'],
			required: false,
			unique: false,
		},
	],
});

// Create models for both schemas
const Producto = mongoose.model('Producto', schema_producto, 'productos');

module.exports = Producto;

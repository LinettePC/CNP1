// Hecho por Isaac Ch.
const mongoose = require('mongoose');

const schema_venta = new mongoose.Schema({
	// Identifying attributes
	cedula_comprador: { type: String, required: true },
	cedula_vendedor: { type: String, required: true },

	// Sale attributes
	nombre_producto: { type: String, required: true },
	categoria_producto: { type: String, required: true },
	precio_venta: { type: String, required: true },

	nombre_comprador: { type: String, required: true },
	nombre_vendedor: { type: String, required: false },
	tramo: { type: String, required: true },

	fecha_de_venta: { type: String, required: false },
});

// Create models for both schemas
const Venta = mongoose.model('Venta', schema_venta, 'ventas');

module.exports = Venta;

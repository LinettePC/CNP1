// Hecho por Isaac Ch.
const mongoose = require('mongoose');

const schema_venta = new mongoose.Schema({
	// Identifying attributes
	cedula_comprador: { type: String, required: true },
	cedula_vendedor: { type: String, required: true },

	// Sale attributes
	id_producto: { type: String, required: false },
	nombre_producto: { type: String, required: false },
	categoria_producto: { type: String, required: false },
	precio_venta: { type: String, required: false },
	cantidad_comprada: { type: String, required: false },

	nombre_comprador: { type: String, required: false },
	nombre_vendedor: { type: String, required: false },
	tramo: { type: String, required: false },

	fecha_de_venta: { type: String, required: false },
});

// Create models for both schemas
const Venta = mongoose.model('Venta', schema_venta, 'ventas');

module.exports = Venta;

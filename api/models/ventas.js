// Hecho por Isaac Ch.
const mongoose = require('mongoose');

const schema_venta = new mongoose.Schema({
    // Identifying attributes
    cedula_comprador: { type: String, required: true },
    cedula_vendedor: { type: String, required: false },

    // Sale attributes
	nombre_comprador: { type: String, required: true },
	nombre_prod: { type: String, required: true },
    tramo: { type: String, required: true },
    nombre_vendedor: { type: String, required: false },
    precio_vendedor: { type: String, required: false },
    fecha_venta: { type: String, required: false },
});

// Create models for both schemas
const Venta = mongoose.model('Venta', schema_venta, 'ventas');

module.exports = Venta;
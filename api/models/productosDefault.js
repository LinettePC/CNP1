const mongoose = require('mongoose');

const schema_producto_default = new mongoose.Schema({
    // Detalles del producto default
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },
	imagen: { type: String, required: false },
});

// Create models for both schemas
const ProductoDefault = mongoose.model('ProductoDefault', schema_producto_default, 'productosDefault');

module.exports = ProductoDefault;

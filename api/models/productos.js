const mongoose = require('mongoose');

const schema_producto = new mongoose.Schema({
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },
	imagen: { type: String, required: false},
    vendedor: { type: String, required: false },
    cedula_vendedor: { type: String, required: false },
    precio_vendedor: { type: String, required: false }
});

// Create models for both schemas
const Producto = mongoose.model('Producto', schema_producto, 'productos');

module.exports = Producto;
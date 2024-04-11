const mongoose = require('mongoose');

const schema_producto = new mongoose.Schema({
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },
	imagen: [{ type: String }],
});

const schema_oferta = new mongoose.Schema({
	producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
	vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedor' },
	precio_vendedor: { type: String, required: true },
});

// Create models for both schemas
const Producto = mongoose.model('Producto', schema_producto);
const Oferta = mongoose.model('Oferta', schema_oferta);

module.exports = {
	Producto,
	Oferta,
};

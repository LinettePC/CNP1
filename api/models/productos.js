const mongoose = require('mongoose');

const schema_producto = new mongoose.Schema({
	// Identifying attribute
	cedula_vendedor: { type: String, required: false },

    // Detalles del producto
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },

    // Detalles del vendedor
    en_venta: { type: Boolean, required: false }, // if "en_venta" is true, display the product on the site
    cedula_vendedor: { type: String, required: false }, // también, si está en_venta entonces se llenan los otros atributos
	precio_vendedor: { type: String, required: false },
	precio_con_iva: { type: String, required: false },
	imagen: { type: String, required: false },
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

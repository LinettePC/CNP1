const mongoose = require('mongoose');

const schema_categorias = new mongoose.Schema({
	nombre: { type: String, required: true },
	tipo: {
		type: String,
		enum: ['Usuario', 'Default'],
		required: true,
		defaultValue: 'Usuario',
	}, // DEFAULT = CREADA POR ADMIN -- Otro: creada por alguien más
});

// Create models for both schemas
const Categoria = mongoose.model('Categoria', schema_categorias, 'categorias');

module.exports = Categoria;

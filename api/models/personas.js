const mongoose = require('mongoose');

const schema_persona = new mongoose.Schema({
	correo: { type: String, required: true, unique: true },
	cedula: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },
	telefono: { type: String, required: false, unique: false },
	contrasenna: { type: String, required: false, unique: false },
	rol: {
		type: String,
		enum: ['cliente', 'vendedor', 'admin'],
		default: 'cliente',
		required: true,
	},
	foto: { type: String, required: false, unique: false },
	estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Inactivo' },
});

const schema_cliente = new mongoose.Schema({
	historial_compras: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Oferta' },
	],
});

schema_cliente.add(schema_persona);

const schema_vendedor = new mongoose.Schema({
	productos: [
		{
			nombre_prod: { type: String, required: false, unique: false },
			descripcion: { type: String, required: false, unique: false },
		},
	],
});
schema_vendedor.add(schema_persona);

const schema_admin = new mongoose.Schema({
	vendedores_aceptados: [
		{
			cedula_vendedor: { type: String, required: false, unique: false },
			nombre_vendedor: { type: String, required: false, unique: false },
			razon_vendedor: { type: String, required: false, unique: false },
		},
	],
});
schema_admin.add(schema_persona);

const Persona = mongoose.model('Persona', schema_persona, 'personas');
const Cliente = mongoose.model('Cliente', schema_cliente, 'clientes');
const Vendedor = mongoose.model('Vendedor', schema_vendedor, 'vendedores');
const Admin = mongoose.model('Admin', schema_admin, 'admin');

// Export all models as an object
module.exports = {
	Persona,
	Cliente,
	Vendedor,
	Admin,
};

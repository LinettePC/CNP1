const mongoose = require('mongoose');

const schema_vendedor = new mongoose.Schema({
	correo: { type: String, required: true, unique: true },
	cedula: { type: String, required: true, unique: true },
	nombre: { type: String, required: true, unique: false },

	// Rol
	rol: { type: String, default: 'Vendedor' },

	// Non-required fields
	telefono: { type: String, required: false, unique: false },
	contrasenna: { type: String, required: false, unique: false },
	foto: { type: String, required: false, unique: false },
	estado: {
		type: String,
		enum: ['Activo', 'Inactivo', 'Rechazado'],
		default: 'Inactivo',
	},
	razon_rechazo: { type: String, required: false, unique: false },

	fecha_de_registro: { type: String, required: false, unique: false }
	
	// productos: [
	// 	{
	// 		nombre_prod: { type: String, required: false, unique: false },
	// 		descripcion_prod: { type: String, required: false, unique: false },

	// 	},
	// ],
});

const Vendedor = mongoose.model('Vendedor', schema_vendedor, 'vendedores');

module.exports = Vendedor;


function name(params) {
	let conseguirUsuariosBD = ["usuario1", "usuario2", "usuario3"];

	let cedula_ingresada = "64534534";
	let contraseña_ingresada = "pepito34";

	for (let i = 0; i < conseguirUsuariosDB.length; i++){
		if (cedula_ingresada == conseguirUsuariosBD[i].cedula && contraseña_ingresada == conseguirUsuariosBD[i].contrasenna) {
            
        }
	}
}
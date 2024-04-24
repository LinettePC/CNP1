const express = require('express');
//necesitamos requerir el modelo de Clientes
const Admin = require('../models/admins');
const router = express.Router();

//http://localhost:3000/api/listar-admin
//GET--> recuperar informacion
router.get('/buscar-admin-cedula', (req, res) => {
	let requestedCedula = req.query.cedula;
	Admin.find({ cedula: requestedCedula }, (error, ClienteBuscada) => {
		if (error) {
			res.status(501).json({
				resultado: false,
				msj: 'Ocurrió el siguiente error:',
				error,
			});
		} else {
			if (ClienteBuscada == '') {
				res.json({ msj: 'La Cliente no existe.' });
			} else {
				res.json({
					resultado: true,
					msj: 'Usuario encontrado:',
					Cliente: ClienteBuscada[0],
				});
			}
		}
	});
});

//http://localhost:3000/api/listar-vendedores
//GET--> recuperar informacion

// http://localhost:3000/api/buscar-Cliente-nombre
// Endpoint para agarrar un usuario específico


// http://localhost:3000/api/buscar-Cliente-cedula
// Endpoint para agarrar un usuario específico


module.exports = router;

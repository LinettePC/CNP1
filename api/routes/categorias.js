const express = require('express');
//necesitamos requerir el modelo de Clientes
const Categoria = require('../models/categorias');
const router = express.Router();

//http://localhost:3000/api/registrar-categoria
router.post('/registrar-categoria', (req, res) => {
	let body = req.body;

	let nueva_Categoria = new Categoria({
		nombre: body.nombre,
	});

	if (body.tipo) {
		nueva_Categoria.tipo = body.tipo;
	}

	nueva_Categoria.save((error, CategoriaDB) => {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo hacer el registro de la categoría',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Registro exitoso de categoría',
				CategoriaDB,
			});
		}
	});
});

//http://localhost:3000/api/listar-categorias
//GET--> recuperar informacion
router.get('/listar-categorias', (req, res) => {
	Categoria.find((error, lista) => {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudieron listar las ventas',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Listado exitosos',
				lista,
			});
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

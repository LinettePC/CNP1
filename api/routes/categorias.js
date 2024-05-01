const express = require('express');
//necesitamos requerir el modelo de Clientes
const Categoria = require('../models/categorias');
const router = express.Router();

//http://localhost:3000/api/registrar-categoria
router.post('/registrar-categoria', (req, res) => {
	let body = req.body;

	let nueva_Categoria = new Categoria({
		nombre: body.nombre,
		tipo: body.tipo
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

//http://localhost:3000/api/actualizar-categoria
//PUT--> recuperar informacion
router.put('/actualizar-categoria', (req, res) => {
	let body = req.body;

	console.log(body);
	Categoria.updateOne(
		{ _id: body._id },
		{ $set: body.update },
		function (error, info) {
			if (error) {
				res.status(500).json({
					resultado: false,
					msj: 'No se pudo actualizar la categoría',
					error,
				});
			} else {
				res.status(200).json({
					resultado: true,
					msj: 'Actulización exitosa',
					info,
				});
			}
		}
	);
});

//http://localhost:3000/api/eliminar-categoria
//DELETE--> eliminar
router.delete('/eliminar-categoria', (req, res) => {
	let body = req.body;
	Categoria.deleteOne({ _id: body._id }, function (error, info) {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo eliminar la categoría',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Se eliminó la categoría de forma exitosa',
				info,
			});
		}
	});
});

// http://localhost:3000/api/buscar-Cliente-nombre
// Endpoint para agarrar un usuario específico

// http://localhost:3000/api/buscar-Cliente-cedula
// Endpoint para agarrar un usuario específico

module.exports = router;

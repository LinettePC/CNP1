const express = require('express');
//necesitamos requerir el modelo de personas
const Persona = require('../models/personas');
const router = express.Router();

//http://localhost:3000/api/listar
//GET--> recuperar informacion
router.get('/listar', (req, res) => {
	Persona.find((error, lista) => {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo listar los usuarios',
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

// http://localhost:3000/api/buscar-persona-nombre
// Endpoint para agarrar un usuario específico
router.get('/buscar-persona-nombre', (req, res) => {
	let requestedNombre = req.query.nombre;
	Persona.find({ nombre: requestedNombre }, (error, personaBuscada) => {
		if (error) {
			res.status(501).json({
				resultado: false,
				msj: 'Ocurrió el siguiente error:',
				error,
			});
		} else {
			if (personaBuscada == '') {
				res.json({ msj: 'La persona no existe.' });
			} else {
				res.json({
					resultado: true,
					msj: 'Usuario encontrado:',
					persona: personaBuscada,
				});
			}
		}
	});
});

// http://localhost:3000/api/buscar-persona-cedula
// Endpoint para agarrar un usuario específico
router.get('/buscar-persona-cedula', (req, res) => {
	let requestedCedula = req.query.cedula;
	Persona.find({ cedula: requestedCedula }, (error, personaBuscada) => {
		if (error) {
			res.status(501).json({
				resultado: false,
				msj: 'Ocurrió el siguiente error:',
				error,
			});
		} else {
			if (personaBuscada == '') {
				res.json({ msj: 'La persona no existe.' });
			} else {
				res.json({
					resultado: true,
					msj: 'Usuario encontrado:',
					persona: personaBuscada,
				});
			}
		}
	});
});

//http://localhost:3000/api/registrar
//POST --> crear nuevos registros
router.post('/registrar', (req, res) => {
	let body = req.body;
	let nueva_persona = new Persona({
		cedula: body.cedula,
		correo: body.correo,
		nombre: body.nombre,
		foto: body.foto,
		contrasenna: body.contrasenna,
	});

	nueva_persona.save((error, personaDB) => {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo hacer el registro',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Registro exitoso',
				personaDB,
			});
		}
	});
});

//http://localhost:3000/api/modificar
//PUT --> actualizar registros existentes
router.put('/modificar', (req, res) => {
	let body = req.body;

	Persona.updateOne(
		{ _id: body._id },
		{ $set: req.body },
		function (error, info) {
			if (error) {
				res.status(500).json({
					resultado: false,
					msj: 'No se pudo actualizar la persona',
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

//http://localhost:3000/api/eliminar
//DELETE --> eliminar registros
router.delete('/eliminar', (req, res) => {
	let body = req.body;
	Persona.deleteOne({ _id: body._id }, function (error, info) {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo eliminar la persona',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Se eliminó la persona de forma exitosa',
				info,
			});
		}
	});
});

module.exports = router;

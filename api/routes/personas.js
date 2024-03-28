const express = require('express');
const Persona = require('../models/Persona');
const router = express.Router();
//CRUD->Create (post), Read (get), Update (put), Delete (delete)
//POST
//http://localhost:8000/api/registro_persona
router.post('/registro_persona', function (req, res) {
	let nuevaPersona = new Persona({
		cedula: req.body.cedula,
		correo: req.body.correo,
		nombre: req.body.nombre,
		contrasenna: req.body.contrasenna,
	});

	nuevaPersona
		.save()
		.then((personaDB) => {
			res.status(201).json({
				msg: 'Persona registrada',
				resultado: true,
				personaDB,
			});
		})
		.catch((err) => {
			res.status(501).json({
				resultado: false,
				err,
			});
		});
});

//GET
//http://localhost:8000/api/listar_persona
router.get('/listar_persona', function (req, res) {
	Persona.find()
		.then((listaPersonas) => {
			res.status(200).json({
				msg: 'Listado de personas',
				listaPersonas,
			});
		})
		.catch((err) => {
			res.json({
				resultado: false,
				err,
			});
		});
});

//PUT
//http://localhost:8000/api/actualizar_persona
router.put('/actualizar_persona', function (req, res) {
	const { _id, nombre, cedula, correo, estado } = req.body;

	Persona.updateOne({ _id }, { $set: { nombre, cedula, correo, estado } })
		.then((personaActualizada) => {
			res.json({
				resultado: true,
				personaActualizada,
			});
		})
		.catch((err) => {
			res.json({
				resultado: false,
				err,
			});
		});
});

//DELETE
//http://localhost:8000/api/eliminar_persona
router.delete('/eliminar_persona', function (req, res) {
	Persona.deleteOne({ _id: req.body._id })
		.then((personaEliminada) => {
			res.json({
				resultado: true,
				personaEliminada,
			});
		})
		.catch((err) => {
			res.json({
				resultado: false,
				err,
			});
		});
});
module.exports = router;

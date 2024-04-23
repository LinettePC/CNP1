const express = require('express');
//necesitamos requerir el modelo de Clientes
const Cliente = require('../models/clientes');
const router = express.Router();

function conseguirFechaFormateada() {
	let fechaActual = new Date(); // 4/12/2024::9:06PM
	let dia = fechaActual.getDate();
	let mes = fechaActual.getMonth() + 1; // Enero es 0
	let anno = fechaActual.getFullYear();

	// Agrega los 0's para el formato
	dia = dia < 10 ? '0' + dia : dia;
	mes = mes < 10 ? '0' + mes : mes;

	return `${dia}/${mes}/${anno}`;
}

//http://localhost:3000/api/listar-clientes
//GET--> recuperar informacion
router.get('/listar-clientes', (req, res) => {
	Cliente.find((error, lista) => {
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

// http://localhost:3000/api/buscar-Cliente-nombre
// Endpoint para agarrar un usuario específico
router.get('/buscar-cliente-nombre', (req, res) => {
	let requestedNombre = req.query.nombre;
	Cliente.find({ nombre: requestedNombre }, (error, ClienteBuscada) => {
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
					Cliente: ClienteBuscada,
				});
			}
		}
	});
});

// http://localhost:3000/api/buscar-Cliente-cedula
// Endpoint para agarrar un usuario específico
router.get('/buscar-cliente-cedula', (req, res) => {
	let requestedCedula = req.query.cedula;
	Cliente.find({ cedula: requestedCedula }, (error, ClienteBuscada) => {
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
					Cliente: ClienteBuscada,
				});
			}
		}
	});
});







// http://localhost:3000/api/registrar
// POST --> crear nuevos registros
router.post('/registrar', (req, res) => {
	let body = req.body;

	let fechaFormateada = conseguirFechaFormateada();

	let nueva_Cliente = new Cliente({
		cedula: body.cedula,
		nombre: body.nombre,
		primerApellido: body.primerApellido,
		correo: body.correo,
		telefono: body.telefono,
		foto: body.foto,
		contrasenna: body.contrasenna,
		fecha_de_registro: fechaFormateada,
	});

	nueva_Cliente.save((error, ClienteDB) => {
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
				ClienteDB,
			});
		}
	});
});

//http://localhost:3000/api/agregar-productos
//Endpoint para guardar productos
router.post('/agregar-productos', (req, res) => {
	let mongoId = req.body._id;
	if (mongoId) {
		Cliente.updateOne(
			{ _id: mongoId },
			{
				$push: {
					productos: {
						nombre_prod: req.body.nombre_prod,
						descripcion: req.body.descripcion,
					},
				},
			}
		)
			.then(() => {
				res.status(201).json({
					resultado: true,
					msj: 'Producto agregado correctamente',
				});
			})
			.catch((error) => {
				res.status(501).json({
					resultado: false,
					msj: 'No se pudo agregar el producto. Ocurrió el siguiente error:',
					error,
				});
			});
	}
});

// function (error, info) {
//     if (error) {
//         res.status(500).json({
//             resultado: false,
//             msj: 'No se pudo actualizar el Cliente',
//             error,
//         });
//     } else {
//         res.status(200).json({
//             resultado: true,
//             msj: 'Actulización exitosa',
//             info,
//         });
//     }
// }

//http://localhost:3000/api/modificar
//PUT --> actualizar registros existentes
router.put('/modificar', (req, res) => {
	let body = req.body;

	Cliente.updateOne(
		{ _id: body._id },
		{ $set: req.body },
		function (error, info) {
			if (error) {
				res.status(500).json({
					resultado: false,
					msj: 'No se pudo actualizar la Cliente',
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
	Cliente.deleteOne({ _id: body._id }, function (error, info) {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo eliminar la Cliente',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Se eliminó la Cliente de forma exitosa',
				info,
			});
		}
	});
});

module.exports = router;

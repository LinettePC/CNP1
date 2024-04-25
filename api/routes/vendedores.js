const express = require('express');

const Vendedor = require('../models/vendedores');
const router = express.Router();

//http://localhost:3000/api/listar-vendedores
//GET--> recuperar informacion
router.get('/listar-vendedores', (req, res) => {
	Vendedor.find((error, lista) => {
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

router.get('/listar-vendedores-por-estado', (req, res) => {
	let estadoRecibido = req.params.estado;

	Vendedor.find({ estado: estadoRecibido }, (error, lista) => {
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

// http://localhost:3000/api/buscar-vendedor-nombre
// Endpoint para agarrar un usuario específico
router.get('/buscar-vendedor-nombre', (req, res) => {
	let requestedNombre = req.query.nombre;
	Vendedor.find({ nombre: requestedNombre }, (error, usuarioBuscdo) => {
		if (error) {
			res.status(501).json({
				resultado: false,
				msj: 'Ocurrió el siguiente error:',
				error,
			});
		} else {
			if (usuarioBuscdo == '') {
				res.json({ msj: 'El vendedor no existe.' });
			} else {
				res.json({
					resultado: true,
					msj: 'Usuario encontrado:',
					Vendedor: usuarioBuscdo,
				});
			}
		}
	});
});

// http://localhost:3000/api/buscar-vendedor-cedula
// Endpoint para agarrar un usuario específico
router.get('/buscar-vendedor-cedula', (req, res) => {
	let requestedCedula = req.query.cedula;
	Vendedor.find({ cedula: requestedCedula }, (error, usuarioBuscado) => {
		if (error) {
			res.status(501).json({
				resultado: false,
				msj: 'Ocurrió el siguiente error:',
				error,
			});
		} else {
			if (usuarioBuscado == '') {
				res.json({ msj: 'El vendedor no existe.' });
			} else {
				res.json({
					resultado: true,
					msj: 'Usuario encontrado:',
					Cliente: usuarioBuscado[0],
				});
			}
		}
	});
});

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

// http://localhost:3000/api/registrar-vendedor
// POST --> crear nuevos registros
router.post('/registrar-vendedor', (req, res) => {
	const body = req.body;
	const fechaFormateada = conseguirFechaFormateada();

	let nuevo_Vendedor = new Vendedor(body);

	nuevo_Vendedor.fecha_de_registro = fechaFormateada;

	if (body.foto) {
		nuevo_Vendedor.foto = pFoto;
	}

	nuevo_Vendedor.save((error, usuarioRegistrado) => {
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
				usuarioRegistrado,
			});
		}
	});
});

// router.post('/registrar', async (req, res) => {
// 	const { body } = req;
// 	try {
// 		const { rol } = body;
// 		let nueva_Cliente;
// 		switch (rol) {
// 			case 'cliente':
// 				nueva_Cliente = new Cliente(body);
// 				break;
// 			case 'vendedor':
// 				nueva_Cliente = new Vendedor(body);
// 				break;
// 			case 'admin':
// 				nueva_Cliente = new Admin(body);
// 				break;
// 			default:
// 				return res.status(400).json({
// 					msj: 'Rol no válido.',
// 				});
// 		}

// 		await nueva_Cliente.save();
// 		res.status(200).json({
// 			resultado: true,
// 			msj: 'Registro exitoso',
// 			nueva_Cliente,
// 		});
// 	} catch (error) {
// 		res.status(500).json({
// 			resultado: false,
// 			msj: 'No se pudo realizar el registro',
// 			error,
// 		});
// 	}
// });

//http://localhost:3000/api/agregar-productos-vendedor
//Endpoint para guardar productos
router.post('/agregar-productos-vendedor', (req, res) => {
	let mongoId = req.body._id;
	if (mongoId) {
		Vendedor.updateOne(
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
//             msj: 'No se pudo actualizar la Cliente',
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
					msj: 'No se pudo actualizar el Cliente',
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
				msj: 'Se eliminó el Cliente de forma exitosa',
				info,
			});
		}
	});
});

module.exports = router;

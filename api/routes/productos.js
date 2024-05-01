const express = require('express');
//necesitamos requerir el modelo de Clientes
const Producto = require('../models/productos');
const ProductoDefault = require('../models/productosDefault');
const router = express.Router();

// http://localhost:3000/api/registrar-producto
// POST --> crear nuevos registros de productos
router.post('/registrar-producto', (req, res) => {
	let body = req.body;

	iva = parseInt(body.precio_vendedor) * 0.13;
	iva = Math.round(iva * 100) / 100;

	ivaMasTotal = parseInt(body.precio_vendedor) + iva;

	let nuevoProducto = new Producto({
		cedula_vendedor: body.cedula_vendedor,
		nombre: body.nombre,
		tramo: body.tramo,
		descripcion: body.descripcion,
		categoria: body.categoria,
		precio_vendedor: body.precio_vendedor,
		inventario: body.inventario,
		precio_con_iva: ivaMasTotal,
	});

	if (body.imagen) {
		nuevoProducto.imagen = body.imagen;
	}

	nuevoProducto.save((error, productoCreado) => {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo crear el producto',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Producto creado exitosamente',
				productoCreado,
			});
		}
	});
});

router.post('/registrar-producto-default', (req, res) => {
	let body = req.body;

	let nuevoProducto = new ProductoDefault({
		nombre: body.nombre,
		descripcion: body.descripcion,
		categoria: body.categoria,
	});

	if (body.imagen) {
		nuevoProducto.imagen = body.imagen;
	}

	nuevoProducto.save((error, productoCreado) => {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo crear el producto',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Producto default creado exitosamente',
				productoCreado,
			});
		}
	});
});

router.delete('/eliminar-producto-default', (req, res) => {
	let mongoID = req.body._id;
	ProductoDefault.deleteOne({ _id: mongoID }, function (error, info) {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo eliminar el producto',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Se eliminó el producto de forma exitosa',
				info,
			});
		}
	});
});

//http://localhost:3000/api/listar-productos-default
//GET--> recuperar informacion
router.get('/listar-productos-default', (req, res) => {
	let cedulaBuscada = req.query.cedula;

	ProductoDefault.find((error, ProductosBuscados) => {
		if (error) {
			res.status(501).json({
				resultado: false,
				msj: 'Ocurrió el siguiente error:',
				error,
			});
		} else {
			if (ProductosBuscados == '') {
				res.json({
					resultado: true,
					msj:
						'El vendedor con la cédula ' +
						cedulaBuscada +
						' no tiene productos.',
					lista: [],
				});
			} else {
				res.json({
					resultado: true,
					msj: 'Productos default encontrados:',
					lista: ProductosBuscados,
				});
			}
		}
	});
});

// http://localhost:3000/api/listar-productos-vendedor
// Endpoint para agarrar los productos de un usuario // USA LA CÉDULA
router.get('/listar-productos-vendedor', (req, res) => {
	let cedulaBuscada = req.query.cedula;

	if (!cedulaBuscada) {
		res.status(501).json({
			resultado: false,
			msj: 'Debe enviar una cedula.',
		});
	} else {
		Producto.find(
			{ cedula_vendedor: cedulaBuscada },
			(error, ProductosBuscados) => {
				if (error) {
					res.status(501).json({
						resultado: false,
						msj: 'Ocurrió el siguiente error:',
						error,
					});
				} else {
					if (ProductosBuscados == '') {
						res.json({
							resultado: true,
							msj:
								'El vendedor con la cédula ' +
								cedulaBuscada +
								' no tiene productos.',
							lista: [],
						});
					} else {
						res.json({
							resultado: true,
							msj:
								'Productos encontrados para el vendedor con la cédula ' +
								cedulaBuscada +
								':',
							lista: ProductosBuscados,
						});
					}
				}
			}
		);
	}
});

// http://localhost:3000/api/conseguir-producto-id
// Endpoint para agarrar un usuario específico // USA LA CÉDULA
router.get('/conseguir-producto-id', (req, res) => {
	let mongoID = req.query.id;
	if (!mongoID) {
		res.status(501).json({
			resultado: false,
			msj: 'Debe enviar un id del producto',
		});
	} else {
		Producto.find({ _id: mongoID }, (error, ProductoBuscado) => {
			if (error) {
				res.status(501).json({
					resultado: false,
					msj: 'Ocurrió el siguiente error:',
					error,
				});
			} else {
				if (ProductoBuscado == '') {
					res.json({
						resultado: true,
						msj: 'El producto no existe',
					});
				} else {
					res.json({
						resultado: true,
						msj: 'Productos encontrados:',
						producto: ProductoBuscado[0],
					});
				}
			}
		});
	}
});

router.get('/conseguir-producto-default-id', (req, res) => {
	let mongoID = req.query.id;
	if (!mongoID) {
		res.status(501).json({
			resultado: false,
			msj: 'Debe enviar un id del producto',
		});
	} else {
		ProductoDefault.find({ _id: mongoID }, (error, ProductoBuscado) => {
			if (error) {
				res.status(501).json({
					resultado: false,
					msj: 'Ocurrió el siguiente error:',
					error,
				});
			} else {
				if (ProductoBuscado == '') {
					res.json({
						resultado: true,
						msj: 'El producto no existe',
					});
				} else {
					res.json({
						resultado: true,
						msj: 'Producto encontrado:',
						producto: ProductoBuscado[0],
					});
				}
			}
		});
	}
});

// http://localhost:3000/api/buscar-producto-nombre
// Endpoint para agarrar un usuario específico

// http://localhost:3000/api/buscar-producto-cedula-vendedor
// Endpoint para agarrar un usuario específico

//http://localhost:3000/api/actualizar-producto
//PUT --> actualizar registros existentes
router.put('/actualizar-producto', (req, res) => {
	let mongoID = req.body._id;
	let updates = req.body.updates;

	Producto.updateOne(
		{ _id: mongoID },
		{ $set: updates },
		function (error, info_producto) {
			if (error) {
				res.status(500).json({
					resultado: false,
					msj: 'No se pudo actualizar el producto',
					error,
				});
			} else {
				res.status(200).json({
					resultado: true,
					msj: 'Actulización exitosa',
					info_producto,
				});
			}
		}
	);
});

router.put('/actualizar-producto-default', (req, res) => {
	let mongoID = req.body._id;
	let updates = req.body.updates;

	ProductoDefault.updateOne(
		{ _id: mongoID },
		{ $set: updates },
		function (error, info_producto) {
			if (error) {
				res.status(500).json({
					resultado: false,
					msj: 'No se pudo actualizar el producto',
					error,
				});
			} else {
				res.status(200).json({
					resultado: true,
					msj: 'Actulización exitosa',
					info_producto,
				});
			}
		}
	);
});

//http://localhost:3000/api/eliminar-producto
//DELETE --> eliminar registros
router.delete('/eliminar-producto', (req, res) => {
	let mongoID = req.body._id;
	Producto.deleteOne({ _id: mongoID }, function (error, info) {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo eliminar el producto',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Se eliminó el producto de forma exitosa',
				info,
			});
		}
	});
});

//http://localhost:3000/api/listar-frutas-verduras
router.get('/listar-frutas-verduras', (req, res) => {
	Producto.find({ categoria: 'Frutas y Verduras' }, (error, lista) => {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo listar los productos',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Listado exitoso',
				lista,
			});
		}
	});
});

//http://localhost:3000/api/listar-lacteos
router.get('/listar-lacteos', (req, res) => {
	Producto.find({ categoria: 'Lacteos' }, (error, lista) => {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo listar los productos',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Listado exitoso',
				lista,
			});
		}
	});
});
//http://localhost:3000/api/listar-carnes
router.get('/listar-carnes', (req, res) => {
	Producto.find({ categoria: 'Carnes' }, (error, lista) => {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo listar los productos',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Listado exitoso',
				lista,
			});
		}
	});
});

router.get('/listar-producto-por-id', (req, res) => {
	const productId = req.body.id; // Obtén el ID del cuerpo de la solicitud JSON

	Producto.findById(productId, (error, producto) => {
		if (error) {
			// Si hay un error al buscar el producto, devuelve un error 500
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo encontrar el producto',
				error,
			});
		} else if (!producto) {
			// Si no se encuentra el producto, devuelve un error 404
			res.status(404).json({
				resultado: false,
				msj: 'Producto no encontrado',
			});
		} else {
			// Si se encuentra el producto, devuelve el producto encontrado
			res.status(200).json({
				resultado: true,
				msj: 'Producto encontrado',
				producto,
			});
		}
	});
});

router.get('/producto/:id', (req, res) => {
	const productId = req.params.id; // Obtén el ID del parámetro de la URL

	Producto.findById(productId, (error, producto) => {
		if (error) {
			// Si hay un error al buscar el producto, devuelve un error 500
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo encontrar el producto',
				error,
			});
		} else if (!producto) {
			// Si no se encuentra el producto, devuelve un error 404
			res.status(404).json({
				resultado: false,
				msj: 'Producto no encontrado',
			});
		} else {
			// Si se encuentra el producto, devuelve el producto encontrado
			res.status(200).json({
				resultado: true,
				msj: 'Producto encontrado',
				producto,
			});
		}
	});
});

module.exports = router;

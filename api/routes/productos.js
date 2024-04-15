const express = require('express');
//necesitamos requerir el modelo de Clientes
const Producto = require('../models/productos');
// const ProductoDefault = require('../models/productosDefault');
const router = express.Router();

// http://localhost:3000/api/registrar-producto
// POST --> crear nuevos registros de productos
router.post('/registrar-producto', (req, res) => {
	let body = req.body;

	let nuevoProducto = new Producto({
		cedula_vendedor: body.cedula_vendedor_env,
		nombre: body.nombre_env,
		descripcion: body.descripcion_env,
		categoria: body.categoria_env,
		precio_vendedor: body.precio_env
	});

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


//http://localhost:3000/api/listar-productos
//GET--> recuperar informacion

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

//http://localhost:3000/api/eliminar
//DELETE --> eliminar registros
router.delete('/eliminar', (req, res) => {
	let mongoID = req.body._id;
	Cliente.deleteOne({ _id: mongoID }, function (error, info) {
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

//http://localhost:3000/api/eliminar/listar-frutas-verduras
router.get('/listar-frutas-verduras', (req, res) => {
	Producto.find({ categoria: 'frutas_verduras' }, (error, lista) => {
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

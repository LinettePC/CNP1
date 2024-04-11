const express = require('express');
//necesitamos requerir el modelo de Clientes
const Producto = require('../models/productos');
const router = express.Router();

//http://localhost:3000/api/listar-productos
//GET--> recuperar informacion

// http://localhost:3000/api/listar-productos-vendedor
// Endpoint para agarrar un usuario específico // USA LA CÉDULA

// http://localhost:3000/api/buscar-producto-nombre
// Endpoint para agarrar un usuario específico


// http://localhost:3000/api/buscar-producto-cedula-vendedor
// Endpoint para agarrar un usuario específico


// http://localhost:3000/api/registrar-producto
// POST --> crear nuevos registros de productos
router.post('/registrar-producto', (req, res) => {
    let body = req.body;
    let nuevoProducto = new Producto({
        nombre: body.nombre,
        descripcion: body.descripcion,
        en_venta: body.en_venta,
        cedula_vendedor: body.cedula_vendedor,
        precio_vendedor: body.precio_vendedor,
        precio_con_iva: body.precio_con_iva,
        imagen: body.imagen,
        tramo: body.tramo,
        estrellas: body.estrellas
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

//http://localhost:3000/api/actualizar_producto
//PUT --> actualizar registros existentes
router.put('/actualizar_producto', (req, res) => {
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

const express = require('express');
//necesitamos requerir el modelo de Clientes
const Venta = require('../models/ventas');
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

//http://localhost:3000/api/registrar-venta
router.post('/registrar-venta', (req, res) => {
	let body = req.body;

	let fechaFormateada = conseguirFechaFormateada();
	console.log(body);

	let nueva_Venta = new Venta(body);

	nueva_Venta.fecha_de_venta = fechaFormateada;

	nueva_Venta.save((error, VentaDB) => {
		if (error) {
			res.status(500).json({
				resultado: false,
				msj: 'No se pudo hacer el registro de la venta',
				error,
			});
		} else {
			res.status(200).json({
				resultado: true,
				msj: 'Registro exitoso de venta',
				VentaDB,
			});
		}
	});
});

//http://localhost:3000/api/listar-ventas
//GET--> recuperar informacion
router.get('/listar-ventas', (req, res) => {
	Venta.find((error, lista) => {
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

//http://localhost:3000/api/listar-ventas-cedula
//GET--> recuperar informacion
router.get('/listar-ventas-cedula', (req, res) => {
	let requestedCedula = req.query.cedula;
	Venta.find(
		{
			$or: [
				{ cedula_comprador: requestedCedula },
				{ cedula_vendedor: requestedCedula },
			],
		},
		(error, VentaBuscada) => {
			if (error) {
				res.status(501).json({
					resultado: false,
					msj: 'Ocurrió el siguiente error:',
					error,
				});
			} else {
				if (VentaBuscada.length === 0) {
					res.json({ msj: 'La venta no existe.' });
				} else {
					res.json({
						resultado: true,
						msj: 'Venta encontrada:',
						listaVentas: VentaBuscada,
					});
				}
			}
		}
	);
});

// http://localhost:3000/api/buscar-Cliente-cedula
// Endpoint para agarrar un usuario específico

module.exports = router;

const express = require('express');
const admin = require('../models/admins');
const cliente = require('../models/clientes');
const vendedor = require('../models/vendedores');

const router = express.Router();

//ruta para el login del administrador
//http://localhost:3000/api/validarLogAdministrador

router.post('/validarLogAdministrador', (req, res) => {
	admin.findOne({ cedula: req.body.cedula }).then(function (usuario) {
		if (usuario) {
			if (usuario.contrasenna == req.body.contrasenna) {
				res.json({
					resultado: true,
					usuario,
				});
			} else {
				res.json({
					resultado: false,
					mensaje: 'La contraseña no es correcta',
				});
			}
		} else {
			res.json({
				resultado: false,
				mensaje: 'Este administrador no existe',
			});
		}
	});
});

//ruta para el login del cliente
//http://localhost:3000/api/validarLogCliente
//es post porque solo "post" y "put tienen acceso a req.body"
router.post('/validarLogCliente', (req, res) => {
	cliente.findOne({ cedula: req.body.cedula }).then(function (usuario) {
		if (usuario) {
			if (usuario.contrasenna == req.body.contrasenna) {
				res.json({
					resultado: true,
					usuario,
				});
			} else {
				res.json({
					resultado: false,
					mensaje: 'Las contraseñas no coinciden',
				});
			}
		} else {
			res.json({
				resultado: false,
				mensaje: 'Este cliente no existe',
			});
		}
	});
});

//ruta para el login del vendedor
//http://localhost:3000/api/validarLogVendedor
router.post('/validarLogVendedor', (req, res) => {
	vendedor.findOne({ cedula: req.body.cedula }).then(function (usuario) {
		if (usuario) {
			if (usuario.estado == 'Activo') {
				if (
					usuario.contrasenna == req.body.contrasenna &&
					usuario.contrasenna.length == 7
				) {
					res.json({
						resultado: 1,
						mensaje: 'Debe cambiar primer contrasenna',
						usuario: usuario
					});
				} else if (
					usuario.contrasenna == req.body.contrasenna &&
					usuario.contrasenna.length >= 8
				) {
					res.json({
						resultado: 2,
						mensaje: 'Puede iniciar sesion',
						usuario: usuario
					});
				} else {
					res.json({
						resultado: 3,
						mensaje: 'Contrasenna incorrecta',
					});
				}
			} else if (usuario.estado == 'Inactivo') {
				res.json({
					resultado: 4,
					mensaje: 'Debe esperar a que la solicitud sea revisada',
				});
			} else if (usuario.estado == 'Rechazado') {
				res.json({
					resultado: 5,
					mensaje:
						'La solicitud con esta identificacion fue rechazada',
					motivo: usuario.razon_rechazo,
				});
			}
		} else {
			res.json({
				resultado: 6,
				mensaje: 'Este vendedor no existe',
			});
		}
	});
});

/*

//de aca para abajo esta sin revisar por Linette

// http://localhost:3000/api/login-vendedor
// POST --> login
router.post("/login-vendedor", (req, res) => {
  const { cedula, contrasenna } = req.body;
  Vendedor.find(
    { cedula: { $eq: cedula }, contrasenna: { $eq: contrasenna } },

    (error, lista) => {
      if (error) {
        res.status(500).json({
          resultado: false,
          msj: "No se pudo listar los usuarios",
          error,
        });
      } else {
        res.status(200).json({
          resultado: true,
          msj: "Listado exitosos",
          lista,
        });
      }
    }
  );
});

*/

/*
// http://localhost:3000/api/login-cliente
// POST --> login
router.post("/login-cliente", (req, res) => {});

// http://localhost:3000/api/login-admin
// POST --> login
router.post("/login-admin", (req, res) => {});
*/

module.exports = router;

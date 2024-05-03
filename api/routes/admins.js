const express = require('express');
//necesitamos requerir el modelo de Clientes
const Admin = require('../models/admins');
const router = express.Router();


//http://localhost:3000/api/listar-admin
//GET--> recuperar informacion
router.get('/buscar-admin-cedula', (req, res) => {
	let requestedCedula = req.query.cedula;
	Admin.find({ cedula: requestedCedula }, (error, ClienteBuscada) => {
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
					Cliente: ClienteBuscada[0],
				});
			}
		}
	});
});

//si quisiera hacer mas de un admin usar esta funcion
//agregar info principal de admin, crear admin: Linette
//POST para registrar admin
//http://localhost:3000/api/admins
router.post('/admins', function(req,res){
    //console.log(req.body)           //el body existe dentro de req
    //crear una nueva persona
    let nuevoAdmin = new Admin({
        cedula:req.body.cedula,
		contrasenna:req.body.contrasenna
         
    })
    nuevoAdmin.save()       //201 es un mensaje que dice objeto grabado en base de datos
    .then((admin)=>{     //then es para cuando SI se guarda
        res.status(201).json({
            mensaje:"Admin agregado",
            resultado:true,
            admin 
        })
    }).catch((error)=>{    //si hay un error este es el mensaje que voy a ver
        res.status(501).json({
            mensaje:"No se puede registrar el admin",
            resultado:false,
            error
        })
    })
})

router.put('/actualizar-datos-admin', (req, res) => {
	let body = req.body;

	Admin.updateOne(
		{ cedula: body.cedula },
		{ $set: req.body.nueva_info },
		function (error, info) {
			if (error) {
				res.status(500).json({
					resultado: false,
					msj: 'No se pudo actualizar el cliente',
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














//http://localhost:3000/api/listar-vendedores
//GET--> recuperar informacion

// http://localhost:3000/api/buscar-Cliente-nombre
// Endpoint para agarrar un usuario específico


// http://localhost:3000/api/buscar-Cliente-cedula
// Endpoint para agarrar un usuario específico

module.exports = router;


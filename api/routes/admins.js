const express = require('express');
//necesitamos requerir el modelo de Clientes
const Admin = require('../models/admins');
const router = express.Router();

//http://localhost:3000/api/listar-admin
//GET--> recuperar informacion

//http://localhost:3000/api/listar-vendedores
//GET--> recuperar informacion

// http://localhost:3000/api/buscar-Cliente-nombre
// Endpoint para agarrar un usuario específico


// http://localhost:3000/api/buscar-Cliente-cedula
// Endpoint para agarrar un usuario específico


module.exports = router;

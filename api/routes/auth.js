const express = require("express");
//necesitamos requerir el modelo de Clientes
const Admin = require("../models/admins");
const vendedores = require("../models/vendedores");
const cliente = require("../models/clientes");
const router = express.Router();

//ruta para el login del vendedor
router.get('/validarVendedor')


//ruta para el login del cliente
router.get('/validarCliente')








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

// http://localhost:3000/api/login-cliente
// POST --> login
router.post("/login-cliente", (req, res) => {});

// http://localhost:3000/api/login-admin
// POST --> login
router.post("/login-admin", (req, res) => {});

const express = require("express");
const admin = require("../models/admins");
const cliente = require("../models/clientes");
const vendedor = require("../models/vendedores");
const redis = require("redis");

const router = express.Router();

// Redis client setup
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("Connected to Redis for Login routes");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Middleware to cache login responses
const cacheMiddleware = (req, res, next) => {
  const key = `login:${req.originalUrl}:${req.body.cedula}`;
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error("Redis error:", err);
      return next();
    }
    if (data) {
      console.log(`Cache hit for login: ${key}`);
      res.json(JSON.parse(data)); // Serve cached response
    } else {
      console.log(`Cache miss for login: ${key}`);
      next(); // Proceed to database query
    }
  });
};

// Route for Admin login
router.post("/validarLogAdministrador", cacheMiddleware, (req, res) => {
  admin.findOne({ cedula: req.body.cedula }).then(function (usuario) {
    if (usuario) {
      if (usuario.contrasenna == req.body.contrasenna) {
        const response = {
          resultado: true,
          usuario,
        };
        redisClient.setex(
          `login:/validarLogAdministrador:${req.body.cedula}`,
          3600,
          JSON.stringify(response)
        ); // Cache for 1 hour
        res.json(response);
      } else {
        res.json({
          resultado: false,
          mensaje: "La contraseña no es correcta",
        });
      }
    } else {
      res.json({
        resultado: false,
        mensaje: "Este administrador no existe",
      });
    }
  });
});

// Route for Cliente login
router.post("/validarLogCliente", cacheMiddleware, (req, res) => {
  cliente.findOne({ cedula: req.body.cedula }).then(function (usuario) {
    if (usuario) {
      if (usuario.contrasenna == req.body.contrasenna) {
        const response = {
          resultado: true,
          usuario,
        };
        redisClient.setex(
          `login:/validarLogCliente:${req.body.cedula}`,
          3600,
          JSON.stringify(response)
        ); // Cache for 1 hour
        res.json(response);
      } else {
        res.json({
          resultado: false,
          mensaje: "Las contraseñas no coinciden",
        });
      }
    } else {
      res.json({
        resultado: false,
        mensaje: "Este cliente no existe",
      });
    }
  });
});

// Route for Vendedor login
router.post("/validarLogVendedor", cacheMiddleware, (req, res) => {
  vendedor.findOne({ cedula: req.body.cedula }).then(function (usuario) {
    if (usuario) {
      if (usuario.estado == "Activo") {
        let response;
        if (usuario.contrasenna == req.body.contrasenna && usuario.contrasenna.length == 7) {
          response = {
            resultado: 1,
            mensaje: "Debe cambiar primer contrasenna",
            usuario: usuario,
          };
        } else if (usuario.contrasenna == req.body.contrasenna && usuario.contrasenna.length >= 8) {
          response = {
            resultado: 2,
            mensaje: "Puede iniciar sesion",
            usuario: usuario,
          };
        } else {
          res.json({
            resultado: 3,
            mensaje: "Contrasenna incorrecta",
          });
          return;
        }
        redisClient.setex(
          `login:/validarLogVendedor:${req.body.cedula}`,
          3600,
          JSON.stringify(response)
        ); // Cache for 1 hour
        res.json(response);
      } else if (usuario.estado == "Inactivo") {
        res.json({
          resultado: 4,
          mensaje: "Debe esperar a que la solicitud sea revisada",
        });
      } else if (usuario.estado == "Rechazado") {
        res.json({
          resultado: 5,
          mensaje: "La solicitud con esta identificacion fue rechazada",
          motivo: usuario.razon_rechazo,
        });
      }
    } else {
      res.json({
        resultado: 6,
        mensaje: "Este vendedor no existe",
      });
    }
  });
});

module.exports = router;

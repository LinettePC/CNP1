const express = require("express");
const Vendedor = require("../models/vendedores");
const redis = require("redis");
const router = express.Router();

// Redis client setup
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("Connected to Redis for Vendedores routes");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Middleware for caching
const cacheMiddleware = (key) => (req, res, next) => {
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error("Redis error:", err);
      return next();
    }
    if (data) {
      console.log(`Cache hit for ${key}`);
      res.json(JSON.parse(data)); // Serve cached data
    } else {
      console.log(`Cache miss for ${key}`);
      next();
    }
  });
};

// Utility to invalidate cache
const invalidateCache = (...keys) => {
  keys.forEach((key) => {
    redisClient.del(key, (err, response) => {
      if (err) {
        console.error(`Failed to invalidate cache for key: ${key}`, err);
      } else {
        console.log(`Cache invalidated for key: ${key}`);
      }
    });
  });
};

// Route to register a new vendor
router.post("/registrar-vendedor", (req, res) => {
  const body = req.body;
  const fechaFormateada = conseguirFechaFormateada();

  let nuevo_Vendedor = new Vendedor({
    cedula: body.cedula,
    nombre: body.nombre,
    primerApellido: body.primerApellido,
    nomTramo: body.nomTramo,
    correo: body.correo,
    foto: body.foto,
    contrasenna: body.contrasenna,
  });

  nuevo_Vendedor.fecha_de_registro = body.fecha_de_registro
    ? body.fecha_de_registro
    : fechaFormateada;

  nuevo_Vendedor.permisos = body.permiso ? true : false;

  nuevo_Vendedor.save((error, usuarioRegistrado) => {
    if (error) {
      res.status(500).json({
        resultado: false,
        msj: "No se pudo hacer el registro",
        error,
      });
    } else {
      // Invalidate cache
      invalidateCache("vendedores:list");
      res.status(200).json({
        resultado: true,
        msj: "Registro exitoso",
        usuarioRegistrado,
      });
    }
  });
});

// Route to list all vendors with caching
router.get("/listar-vendedores", cacheMiddleware("vendedores:list"), (req, res) => {
  Vendedor.find((error, lista) => {
    if (error) {
      res.status(500).json({
        resultado: false,
        msj: "No se pudo listar los usuarios",
        error,
      });
    } else {
      const response = {
        resultado: true,
        msj: "Listado exitoso",
        lista,
      };
      // Cache the response
      redisClient.setex("vendedores:list", 3600, JSON.stringify(response)); // Cache for 1 hour
      res.status(200).json(response);
    }
  });
});

// Route to find a vendor by name
router.get("/buscar-vendedor-nombre", (req, res) => {
  let requestedNombre = req.query.nombre;
  const cacheKey = `vendedor:nombre:${requestedNombre}`;
  redisClient.get(cacheKey, (err, cachedData) => {
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    Vendedor.find({ nombre: requestedNombre }, (error, usuarioBuscado) => {
      if (error) {
        res.status(501).json({
          resultado: false,
          msj: "Ocurrió el siguiente error:",
          error,
        });
      } else {
        if (usuarioBuscado == "") {
          res.json({ msj: "El vendedor no existe." });
        } else {
          const response = {
            resultado: true,
            msj: "Usuario encontrado:",
            Vendedor: usuarioBuscado,
          };
          redisClient.setex(cacheKey, 3600, JSON.stringify(response));
          res.json(response);
        }
      }
    });
  });
});

// Route to find a vendor by cedula
router.get("/buscar-vendedor-cedula", (req, res) => {
  let requestedCedula = req.query.cedula;
  const cacheKey = `vendedor:cedula:${requestedCedula}`;
  redisClient.get(cacheKey, (err, cachedData) => {
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    Vendedor.find({ cedula: requestedCedula }, (error, usuarioBuscado) => {
      if (error) {
        res.status(501).json({
          resultado: false,
          msj: "Ocurrió el siguiente error:",
          error,
        });
      } else {
        if (usuarioBuscado == "") {
          res.json({ msj: "El vendedor no existe." });
        } else {
          const response = {
            resultado: true,
            msj: "Usuario encontrado:",
            Vendedor: usuarioBuscado[0],
          };
          redisClient.setex(cacheKey, 3600, JSON.stringify(response));
          res.json(response);
        }
      }
    });
  });
});

// Route to update vendor details
router.put("/actualizar-datos-vendedor", (req, res) => {
  let body = req.body;

  Vendedor.updateOne(
    { cedula: body.cedula },
    { $set: req.body.nueva_info },
    function (error, info) {
      if (error) {
        res.status(500).json({
          resultado: false,
          msj: "No se pudo actualizar el cliente",
          error,
        });
      } else {
        // Invalidate cache
        invalidateCache(
          "vendedores:list",
          `vendedor:cedula:${body.cedula}`,
          `vendedor:nombre:${body.nombre}`
        );
        res.status(200).json({
          resultado: true,
          msj: "Actualización exitosa",
          info,
        });
      }
    }
  );
});

// Route to delete a vendor
router.delete("/eliminar-vendedor", (req, res) => {
  let body = req.body;
  Vendedor.deleteOne({ _id: body._id }, function (error, info) {
    if (error) {
      res.status(500).json({
        resultado: false,
        msj: "No se pudo eliminar el vendedor",
        error,
      });
    } else {
      // Invalidate cache
      invalidateCache("vendedores:list");
      res.status(200).json({
        resultado: true,
        msj: "Se eliminó el vendedor de forma exitosa",
        info,
      });
    }
  });
});

function conseguirFechaFormateada() {
  let fechaActual = new Date();
  let dia = fechaActual.getDate();
  let mes = fechaActual.getMonth() + 1;
  let anno = fechaActual.getFullYear();
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;
  return `${dia}/${mes}/${anno}`;
}

module.exports = router;

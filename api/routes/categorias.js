const express = require("express");
const Categoria = require("../models/categorias");
const redis = require("redis");
const router = express.Router();

// Redis client setup
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("Connected to Redis for Categorias routes");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Middleware to cache category list
const cacheMiddleware = (req, res, next) => {
  const key = "categorias:list";
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error("Redis error:", err);
      return next();
    }
    if (data) {
      console.log("Cache hit for categorias:list");
      res.json(JSON.parse(data)); // Serve cached data
    } else {
      console.log("Cache miss for categorias:list");
      next(); // Proceed to database query
    }
  });
};

// Route to register a new category
router.post("/registrar-categoria", (req, res) => {
  let body = req.body;

  let nueva_Categoria = new Categoria({
    nombre: body.nombre,
    tipo: body.tipo,
  });

  if (body.tipo) {
    nueva_Categoria.tipo = body.tipo;
  }

  nueva_Categoria.save((error, CategoriaDB) => {
    if (error) {
      res.status(500).json({
        resultado: false,
        msj: "No se pudo hacer el registro de la categoría",
        error,
      });
    } else {
      // Invalidate cache
      redisClient.del("categorias:list");
      res.status(200).json({
        resultado: true,
        msj: "Registro exitoso de categoría",
        CategoriaDB,
      });
    }
  });
});

// Route to list categories with caching
router.get("/listar-categorias", cacheMiddleware, (req, res) => {
  Categoria.find((error, lista) => {
    if (error) {
      res.status(500).json({
        resultado: false,
        msj: "No se pudieron listar las categorías",
        error,
      });
    } else {
      const response = {
        resultado: true,
        msj: "Listado exitoso",
        lista,
      };
      // Cache the response
      redisClient.setex("categorias:list", 3600, JSON.stringify(response)); // Cache for 1 hour
      res.status(200).json(response);
    }
  });
});

// Route to update a category
router.put("/actualizar-categoria", (req, res) => {
  let body = req.body;
  Categoria.updateOne({ _id: body._id }, { $set: body.update }, function (error, info) {
    if (error) {
      res.status(500).json({
        resultado: false,
        msj: "No se pudo actualizar la categoría",
        error,
      });
    } else {
      // Invalidate cache
      redisClient.del("categorias:list");
      res.status(200).json({
        resultado: true,
        msj: "Actualización exitosa",
        info,
      });
    }
  });
});

// Route to delete a category
router.delete("/eliminar-categoria", (req, res) => {
  let body = req.body;
  Categoria.deleteOne({ _id: body._id }, function (error, info) {
    if (error) {
      res.status(500).json({
        resultado: false,
        msj: "No se pudo eliminar la categoría",
        error,
      });
    } else {
      // Invalidate cache
      redisClient.del("categorias:list");
      res.status(200).json({
        resultado: true,
        msj: "Se eliminó la categoría de forma exitosa",
        info,
      });
    }
  });
});

module.exports = router;

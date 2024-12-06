const express = require("express");
const Producto = require("../models/productos");
const ProductoDefault = require("../models/productosDefault");
const redis = require("redis");
const router = express.Router();

// Redis client setup
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("Connected to Redis for Productos routes");
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
      res.json(JSON.parse(data));
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

// Route to create a product
router.post("/registrar-producto", (req, res) => {
  let body = req.body;

  let iva = parseInt(body.precio_vendedor) * 0.13;
  iva = Math.round(iva * 100) / 100;

  let ivaMasTotal = parseInt(body.precio_vendedor) + iva;

  let nuevoProducto = new Producto({
    cedula_vendedor: body.cedula_vendedor,
    nombre: body.nombre,
    tramo: body.tramo,
    descripcion: body.descripcion,
    categoria: body.categoria,
    precio_vendedor: body.precio_vendedor,
    inventario: body.inventario,
    precio_con_iva: ivaMasTotal,
  });

  if (body.imagen) {
    nuevoProducto.imagen = body.imagen;
  }

  nuevoProducto.save((error, productoCreado) => {
    if (error) {
      res.status(500).json({
        resultado: false,
        msj: "No se pudo crear el producto",
        error,
      });
    } else {
      // Invalidate relevant caches
      invalidateCache("productos:list", `productos:vendedor:${body.cedula_vendedor}`);
      res.status(200).json({
        resultado: true,
        msj: "Producto creado exitosamente",
        productoCreado,
      });
    }
  });
});

// Route to list all products with caching
router.get("/listar-productos", cacheMiddleware("productos:list"), (req, res) => {
  Producto.find((error, ProductosBuscados) => {
    if (error) {
      res.status(501).json({
        resultado: false,
        msj: "Ocurrió el siguiente error:",
        error,
      });
    } else {
      const response = {
        resultado: true,
        msj: "Productos encontrados:",
        lista: ProductosBuscados,
      };
      redisClient.setex("productos:list", 3600, JSON.stringify(response)); // Cache for 1 hour
      res.status(200).json(response);
    }
  });
});

// Route to list products by vendor
router.get("/listar-productos-vendedor", (req, res) => {
  let cedulaBuscada = req.query.cedula;

  if (!cedulaBuscada) {
    res.status(501).json({
      resultado: false,
      msj: "Debe enviar una cédula.",
    });
  } else {
    const cacheKey = `productos:vendedor:${cedulaBuscada}`;
    redisClient.get(cacheKey, (err, data) => {
      if (err) {
        console.error("Redis error:", err);
        return next();
      }
      if (data) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.json(JSON.parse(data));
      }

      Producto.find({ cedula_vendedor: cedulaBuscada }, (error, ProductosBuscados) => {
        if (error) {
          res.status(501).json({
            resultado: false,
            msj: "Ocurrió el siguiente error:",
            error,
          });
        } else {
          const response = {
            resultado: true,
            msj: `Productos encontrados para el vendedor con la cédula ${cedulaBuscada}:`,
            lista: ProductosBuscados,
          };
          redisClient.setex(cacheKey, 3600, JSON.stringify(response)); // Cache for 1 hour
          res.json(response);
        }
      });
    });
  }
});

// Route to update a product
router.put("/actualizar-producto", (req, res) => {
  let mongoID = req.body._id;
  let updates = req.body.updates;

  Producto.updateOne({ _id: mongoID }, { $set: updates }, function (error, info_producto) {
    if (error) {
      res.status(500).json({
        resultado: false,
        msj: "No se pudo actualizar el producto",
        error,
      });
    } else {
      // Invalidate relevant caches
      invalidateCache("productos:list", `productos:vendedor:${req.body.cedula_vendedor}`);
      res.status(200).json({
        resultado: true,
        msj: "Actualización exitosa",
        info_producto,
      });
    }
  });
});

// Route to delete a product
router.delete("/eliminar-producto", (req, res) => {
  let mongoID = req.body._id;

  Producto.findByIdAndDelete(mongoID, (error, productoEliminado) => {
    if (error) {
      res.status(500).json({
        resultado: false,
        msj: "No se pudo eliminar el producto",
        error,
      });
    } else {
      if (productoEliminado) {
        // Invalidate relevant caches
        invalidateCache(
          "productos:list",
          `productos:vendedor:${productoEliminado.cedula_vendedor}`
        );
      }
      res.status(200).json({
        resultado: true,
        msj: "Se eliminó el producto de forma exitosa",
      });
    }
  });
});

// Add similar caching and invalidation logic to other endpoints as needed.

module.exports = router;

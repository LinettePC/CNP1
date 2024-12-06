const express = require('express');
const Cliente = require('../models/clientes');
const redis = require('redis');
const router = express.Router();

// Redis client setup
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('connect', () => {
    console.log('Connected to Redis for Clientes routes');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Middleware for caching
const cacheMiddleware = (key) => (req, res, next) => {
    redisClient.get(key, (err, data) => {
        if (err) {
            console.error('Redis error:', err);
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

// Route to register a new client
router.post('/registrar-clientes', (req, res) => {
    let body = req.body;
    const fechaFormateada = conseguirFechaFormateada();
    let nuevo_Cliente = new Cliente({
        cedula: body.cedula,
        nombre: body.nombre,
        primerApellido: body.primerApellido,
        correo: body.correo,
        telefono: body.telefono,
        foto: body.foto,
        contrasenna: body.contrasenna,
    });

    nuevo_Cliente.fecha_de_registro = body.fecha_de_registro
        ? body.fecha_de_registro
        : fechaFormateada;

    nuevo_Cliente.save((error, usuarioRegistrado) => {
        if (error) {
            res.status(500).json({
                resultado: false,
                msj: 'No se pudo hacer el registro',
                error,
            });
        } else {
            // Invalidate cache
            invalidateCache('clientes:list');
            res.status(200).json({
                resultado: true,
                msj: 'Registro exitoso',
                usuarioRegistrado,
            });
        }
    });
});

// Route to list all clients with caching
router.get('/listar-clientes', cacheMiddleware('clientes:list'), (req, res) => {
    Cliente.find((error, lista) => {
        if (error) {
            res.status(500).json({
                resultado: false,
                msj: 'No se pudo listar los usuarios',
                error,
            });
        } else {
            const response = {
                resultado: true,
                msj: 'Listado exitoso',
                lista,
            };
            // Cache the response
            redisClient.setex('clientes:list', 3600, JSON.stringify(response)); // Cache for 1 hour
            res.status(200).json(response);
        }
    });
});

// Route to find a client by name
router.get('/buscar-cliente-nombre', cacheMiddleware((req) => `cliente:nombre:${req.query.nombre}`), (req, res) => {
    let requestedNombre = req.query.nombre;
    Cliente.find({ nombre: requestedNombre }, (error, ClienteBuscada) => {
        if (error) {
            res.status(501).json({
                resultado: false,
                msj: 'Ocurrió el siguiente error:',
                error,
            });
        } else {
            if (ClienteBuscada == '') {
                res.json({ msj: 'El cliente no existe.' });
            } else {
                const response = {
                    resultado: true,
                    msj: 'Usuario encontrado:',
                    Cliente: ClienteBuscada,
                };
                redisClient.setex(`cliente:nombre:${requestedNombre}`, 3600, JSON.stringify(response));
                res.json(response);
            }
        }
    });
});

// Route to find a client by cedula
router.get('/buscar-cliente-cedula', cacheMiddleware((req) => `cliente:cedula:${req.query.cedula}`), (req, res) => {
    let requestedCedula = req.query.cedula;
    Cliente.find({ cedula: requestedCedula }, (error, ClienteBuscada) => {
        if (error) {
            res.status(501).json({
                resultado: false,
                msj: 'Ocurrió el siguiente error:',
                error,
            });
        } else {
            if (ClienteBuscada == '') {
                res.json({ msj: 'El cliente no existe.' });
            } else {
                const response = {
                    resultado: true,
                    msj: 'Usuario encontrado:',
                    Cliente: ClienteBuscada[0],
                };
                redisClient.setex(`cliente:cedula:${requestedCedula}`, 3600, JSON.stringify(response));
                res.json(response);
            }
        }
    });
});

// Route to update a client
router.put('/actualizar-datos-cliente', (req, res) => {
    let body = req.body;

    Cliente.updateOne(
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
                // Invalidate cache
                invalidateCache('clientes:list', `cliente:cedula:${body.cedula}`, `cliente:nombre:${body.nombre}`);
                res.status(200).json({
                    resultado: true,
                    msj: 'Actualización exitosa',
                    info,
                });
            }
        }
    );
});

// Route to delete a client
router.delete('/eliminar-cliente', (req, res) => {
    let body = req.body;
    Cliente.deleteOne({ _id: body._id }, function (error, info) {
        if (error) {
            res.status(500).json({
                resultado: false,
                msj: 'No se pudo eliminar el cliente',
                error,
            });
        } else {
            // Invalidate cache
            invalidateCache('clientes:list');
            res.status(200).json({
                resultado: true,
                msj: 'Se eliminó el cliente de forma exitosa',
                info,
            });
        }
    });
});

module.exports = router;

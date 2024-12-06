const express = require('express');
const Admin = require('../models/admins'); // Admin model
const router = express.Router();
const redis = require('redis');

// Redis client setup
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('connect', () => {
    console.log('Connected to Redis for Admin routes');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Middleware for Redis caching
const cacheMiddleware = (req, res, next) => {
    const key = `admin:${req.query.cedula}`;
    redisClient.get(key, (err, data) => {
        if (err) {
            console.error('Redis error:', err);
            return next();
        }
        if (data) {
            console.log(`Cache hit for cedula: ${req.query.cedula}`);
            res.json(JSON.parse(data)); // Send cached data
        } else {
            console.log(`Cache miss for cedula: ${req.query.cedula}`);
            next(); // Proceed to the database query
        }
    });
};

// GET --> Fetch admin by cedula with caching
router.get('/buscar-admin-cedula', cacheMiddleware, (req, res) => {
    let requestedCedula = req.query.cedula;

    Admin.find({ cedula: requestedCedula }, (error, adminBuscada) => {
        if (error) {
            res.status(501).json({
                resultado: false,
                msj: 'Ocurrió el siguiente error:',
                error,
            });
        } else {
            if (adminBuscada == '') {
                res.json({ msj: 'El admin no existe.' });
            } else {
                const response = {
                    resultado: true,
                    msj: 'Admin encontrado:',
                    admin: adminBuscada[0],
                };
                // Cache the response in Redis
                redisClient.setex(`admin:${requestedCedula}`, 3600, JSON.stringify(response)); // Cache for 1 hour
                res.json(response);
            }
        }
    });
});

// POST --> Register a new admin
router.post('/admins', function (req, res) {
    let nuevoAdmin = new Admin({
        cedula: req.body.cedula,
        contrasenna: req.body.contrasenna,
    });

    nuevoAdmin
        .save()
        .then((admin) => {
            res.status(201).json({
                mensaje: 'Admin agregado',
                resultado: true,
                admin,
            });
        })
        .catch((error) => {
            res.status(501).json({
                mensaje: 'No se puede registrar el admin',
                resultado: false,
                error,
            });
        });
});

// PUT --> Update admin data
router.put('/actualizar-datos-admin', (req, res) => {
    let body = req.body;

    Admin.updateOne(
        { cedula: body.cedula },
        { $set: req.body.nueva_info },
        function (error, info) {
            if (error) {
                res.status(500).json({
                    resultado: false,
                    msj: 'No se pudo actualizar el admin',
                    error,
                });
            } else {
                // Invalidate the cache for the updated admin
                redisClient.del(`admin:${body.cedula}`);
                res.status(200).json({
                    resultado: true,
                    msj: 'Actualización exitosa',
                    info,
                });
            }
        }
    );
});

module.exports = router;

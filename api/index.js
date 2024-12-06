const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const cors = require("cors");
const redis = require('redis'); // Redis library

const admins = require("./routes/admins");
const auth = require("./routes/auth");
const clientes = require("./routes/clientes");
const productos = require("./routes/productos");
const vendedores = require("./routes/vendedores");
const ventas = require("./routes/ventas");
const categorias = require("./routes/categorias");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Establish MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Redis client setup
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379', // Use REDIS_URL from environment variables or default to local Redis
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// Middleware for caching (example)
const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    redisClient.get(key, (err, cachedData) => {
        if (err) {
            console.error('Redis error:', err);
            return next();
        }
        if (cachedData) {
            console.log(`Cache hit for ${key}`);
            res.send(JSON.parse(cachedData));
        } else {
            console.log(`Cache miss for ${key}`);
            res.sendResponse = res.send;
            res.send = (body) => {
                redisClient.setex(key, 3600, JSON.stringify(body)); // Cache for 1 hour
                res.sendResponse(body);
            };
            next();
        }
    });
};

// Routes
app.use("/api", cacheMiddleware, admins);
app.use("/api", auth);
app.use("/api", categorias);
app.use("/api", clientes);
app.use("/api", productos);
app.use("/api", vendedores);
app.use("/api", ventas);

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


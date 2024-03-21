const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('bodyparser');

const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGO_URI = "mongodb+srv://ichavarriac:Zelda3505@cluster0.3kuqaz5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'"

mongoose.connect(auth)

const personas_rutas = require('./routes/personas');

const app = express();

app.use('/api', personas_rutas);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const port = 8000;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

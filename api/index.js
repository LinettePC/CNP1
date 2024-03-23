const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('bodyparser');

const personas = require('./routes/personas');
require('dotenv').config();

const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors());

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB:', err);
	});

app.use('/api', personas);

const port = 8000;

app.listen(port, () => {
	console.log(`App listening on port ${port}!`);
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('bodyparser');

const personas = require('./routes/personas');
//const empresas = require('./routes/empresas')
//const productos = require('./routes/productos')
//const metodos_pago = require('./routes/metodo_pago')

require('dotenv').config();

const app = express();

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
//app.use('/api',empresas)
//app.use('/api',productos)
//app.use('/api',metodos_pago)

const PORT = 8000;

app.listen(PORT, () => {
	console.log(`Aplicación levantada en puerto: ${PORT}`);
});

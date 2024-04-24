const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const cors = require("cors");

const admins = require("./routes/admins");
//const auth = require("./routes/auth");
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

//establecer la conexion con la BD-Mongo
mongoose.connect(process.env.MONGO_URI)


app.use("/api", admins);
//app.use("/api", auth);
app.use("/api", categorias);
app.use("/api", clientes);
app.use("/api", productos);
app.use("/api", vendedores);
app.use("/api", ventas);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
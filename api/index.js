const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const clientes = require("./routes/clientes");
//const auth = require("./routes/auth");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//establecer la conexion con la BD-Mongo
mongoose.connect(process.env.MONGO_URI)


app.use("/api", clientes);
//app.use("/api", auth);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


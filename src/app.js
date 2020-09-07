"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
// const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Carraga as Rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");

// Conecta ao banco de dados
mongoose.connect('mongodb+srv://bruno:bruno@nodestr.tqrnr.azure.mongodb.net/nodestr?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useCreateIndex: true
    });

// Carregando os Models
// const Product = require('./models/product')

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
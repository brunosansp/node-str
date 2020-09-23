"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Carraga as Rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");
const customerRoute = require("./routes/customer-route");
const orderRoute = require("./routes/order-route");


// Conecta ao banco de dados
// mongoose.connect(config.connectionString);
mongoose.connect('mongodb+srv://bruno:bruno@nodestr.tqrnr.azure.mongodb.net/nodestr?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true
    });

// Carregando os Models
// const Product = require('./models/product')
// const Customer = require('./models/customer')
// const Order = require('./models/order')

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);


module.exports = app;
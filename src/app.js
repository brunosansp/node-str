"use strict";

const express = require("express");

const app = express();
const router = express.Router();

const route = router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Node Store API",
    version: "0.0.2",
  });
});

const getAllProducts = router.get('/', (req, res, next) => {
  res.status(200).send(req.body)
})

const create = router.post('/', (req, res, next) => {
  res.status(201).send(req.body);
})

app.use("/", route);
app.use('/products', create)

module.exports = app;;
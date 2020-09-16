'use strict'

const guid = require('guid');
const repository = require('../repositories/order-repository');

exports.get = (req, res, next) => {
    repository.get().then((data) => {
        res.status(200).send(data);
    }).catch((e) => {
        res.status(400).send(e);
    });
};

exports.post = async (req, res, next) => {
    console.log(req)
    try {
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({
            message: "Pedido cadastrado com sucesso!",
        });
    } catch (e) {
        res.status(500).send({
            message: "ERRO :: Falha ao processar sua requisição.",
        });
    }
};
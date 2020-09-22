'use strict'

const guid = require('guid');
const repository = require('../repositories/order-repository');
const authService = require('../services/auth-service');


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
        // Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        // Decodifica o token
        const data = await authService.decodeToken(token);

        await repository.create({
            customer: data._id,
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
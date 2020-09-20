'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');

exports.get = (req, res, next) => {
    repository
        .get()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

exports.post = async (req, res, next) => {
    // Validation
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3,
        "O título deve conter pelo menos 3 cacteres."
    );
    contract.hasMinLen(req.body.email,
        "E-mail inválido."
    );
    contract.hasMinLen(req.body.password, 6,
        "A descrição deve conter pelo menos 3 cacteres."
    );
    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_key)
        })

        emailService.send(
            req.body.email, 'Bem vindo a Node Store',
            global.EMAIL_TMPL.replace('{0}',
                req.body.name)
        );

        res.status(201).send({
            message: "Cliente cadastrado com sucesso!",
        });
    } catch (e) {
        res.status(500).send({
            message: "ERRO :: Falha ao processar sua requisição.",
        });
    }
};
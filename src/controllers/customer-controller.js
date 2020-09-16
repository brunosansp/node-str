'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

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
        await repository.create(req.body)
        res.status(201).send({
            message: "Cliente cadastrado com sucesso!",
        });
    } catch (e) {
        res.status(500).send({
            message: "ERRO :: Falha ao processar sua requisição.",
        });
    }
};
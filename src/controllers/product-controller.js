'use strict';

const ValidationContract = require("../validators/fluent-validator");
const repository = require('../repositories/product-repository');
const config = require('../config');
const azure = require('azure-storage');
const guid = require('guid');

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

exports.getBySlug = (req, res, next) => {
  repository
    .getBySlug()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getByTag = (req, res, next) => {
  repository
    .getByTag(req.params.slug)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res, next) => {
  repository
    .getById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.post = (req, res, next) => {
  // Validation
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 3,
    "O título deve conter pelo menos 3 cacteres."
  );
  contract.hasMinLen(req.body.slug, 3,
    "O slug deve conter pelo menos 3 cacteres."
  );
  contract.hasMinLen(req.body.description, 3,
    "A descrição deve conter pelo menos 3 cacteres."
  );
  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    // Cria o Blob Service
    // const blobSvc = azure.createBlobService(config.containerConnectionString);

    // let filename = guid.raw().toString() + '.jpg';
    // let rawdata = req.body.image;
    // let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    // let type = matches[1];
    // let buffer = new Buffer(matches[2], 'base64');

    // // Salva a imagem
    // blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
    //   contentType: type
    // }, function (error, result, response) {
    //   if (error) {
    //     filename = 'default-product.png';
    //   }
    // });

    repository.create({
      title: 'req.body.title',
      slug: 'req.body.slug',
      description: 'req.body.description',
      price: 'req.body.price',
      active: true,
      tags: 'req.body.tags',
      image: 'https://testnodestr.blob.core.windows.net/product-images/' + filename
    });
    res.status(201).send({
      message: "Produto cadastrado com sucesso!",
    });
    res.status(400).send({
      message: "ERRO :: Falha ao cadastrar o produto.",
      data: e,
    });
  } catch (e) {
    res.status(500).send(e);
  };
}

exports.put = (req, res, next) => {
  repository.update(req.params.id, req.body)
    .then((x) => {
      res.status(200).send({
        message: "Produto atualizado com sucesso!",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao atualizar produto",
        data: e,
      });
    });
};

exports.delete = (req, res, next) => {
  repository.delete(req.body.id)
    .then((x) => {
      res.status(200).send({
        message: "Produto removido com sucesso!",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao remover produto",
        data: e,
      });
    });
};
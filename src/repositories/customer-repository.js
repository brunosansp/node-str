'use strict'

const Customer = require('../models/customer')

exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.get = async () => {
    const res = await Customer.find();
    return res;
}

exports.create = (data) => {
    var customer = new Customer(data);
    return customer.save();
}
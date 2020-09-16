'use strict'

const Customer = require('../models/customer')

exports.get = async () => {
    const res = await Customer.find();
    return res;
}

exports.create = (data) => {
    var customer = new Customer(data);
    return customer.save();
}
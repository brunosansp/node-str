'use strict'

const mongoose = require('mongoose');
const Customer = require('../models/customer')

exports.create = (data) => {
    var customer = new Customer(data);
    return customer.save();
}
'use strict'

const mongoose = require('mongoose');
const Order = require('../models/order')

exports.get = async (data) => {
    const res = await Order.find({}, 'number status customer items')
        .populate('customer', 'name', 'email')
        .populate('items.product', 'title');
    return res;
}

exports.create = async(data) => {
    var order = new Order(data);
    await order.save();
}
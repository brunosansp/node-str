'use strict'

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        require: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['CREATED', 'DONE'],
        default: 'CREATED'
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
});

module.exports = mongoose.model('Order', orderSchema);
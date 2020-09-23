'use strict'

const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    // Não foi colocado id pois o Schema adiciona automaticamente como _id
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        defualt: 'user'
    }]
})

module.exports = mongoose.model('Customer', customerSchema);
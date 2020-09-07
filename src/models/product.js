'use strict'

const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const productSchema = new mongoose.Schema({

// const schema = new Schema({
    // Não foi colocado id pois o Schema adiciona automaticamente como _id
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: { // Ex: NM_Produto: Cadeira gamer => slug: cadeira-gamer
        type: String,
        required: [true, 'Necessario definir slug'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }]
})

module.exports = mongoose.model('Product', productSchema)
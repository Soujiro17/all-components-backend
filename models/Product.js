const { Schema, model } = require('mongoose')

const ProductScheme = new Schema({

    product: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    stock: {
        type: String,
        required: true
    },

    fecha: {
        type: String,
        required: true
    }

})

module.exports = model('Product', ProductScheme)
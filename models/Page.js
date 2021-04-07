const { Schema, model } = require('mongoose')

const PageScheme = new Schema({

    page_name: {
        type: String,
        required: true
    },

    page_link: {
        type: String,
        required: true
    },

}, {timestamps: true})

module.exports = model('Page', PageScheme)
const { Schema, model } = require('mongoose');

const customerScheme  = new Schema({
    username: {type: String, required: true}
})

module.exports = model('Customer', customerScheme);
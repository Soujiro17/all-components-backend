const { Schema, model } = require('mongoose');

const userScheme = new Schema({

    username: {type: String, required: true},
    passwordHash: {type: String, requird: true},
    email: {type: String, requird: true},

}, { timestamps: true });

module.exports = model('User', userScheme)
const express = require('express');
const Customer = require('../models/Customer.js');
const auth = require('../middleware/auth.js');
const router = express.Router();

router.post('/', auth, async (req, res) => {

    const { username } = req.body;

    const newCostumer = new Customer({ username });

    const savedCustomer = await newCostumer.save();

    res.json(savedCustomer);

})

router.get('/', auth, async (req, res) => {

    const customers = await Customer.find();
    res.json(customers);
})

module.exports = router
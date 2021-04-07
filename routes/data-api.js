const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js')

router.get('/', async (req, res) => {
    try{

        const products = await Product.find()

        res.status(200).json(products)

    }catch(err){
        res.status(400).json({status: 400, description: err})
    }
})

router.post('/', async (req, res) => {
    
    try{
        const { products, prices, links, stock, fecha } = req.body;

        const product = await new Product({
            product: products,
            price: prices,
            link: links,
            stock: stock,
            fecha: fecha
        });

        await product.save();
        
        res.status(201).json({status: 201, description: 'Data post success'});
    }catch(err){
        res.status(409).json({status: 409, description: err})
    }

})

router.delete('/', async (req, res) => {

    try{

        await Product.deleteMany({})
        res.status(202).json({status: 202, description: 'Data eliminated'})

    }catch(err){
        res.status(401).json({status: 401, description: err});
    }
})

module.exports = router
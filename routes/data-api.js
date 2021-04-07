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
        const data = req.body;

        for(let x = 0; x<data.products.length; x++){

            const product = await new Product({
                product: data.products[x],
                price: data.prices[x],
                link: data.links[x],
                stock: data.stock[x],
                fecha: data.fecha[x]
            });
    
            await product.save();
        }
        
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
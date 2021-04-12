const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js')

router.get('/', async (req, res) => {

    const products = await Product.find(); 
    res.status(200).json(products);

})

router.get('/:id', async (req, res) => {
    
    const id = req.params.id
    
    try{
        const product = await Product.findById(id)
        res.status(200).json(product)

    }catch(err){ res.status(400).json({status: 400, description: err}) }
})

router.put('/:id', async (req, res) => {
    
    const id = req.params.id;
    const data = req.body.data;

    try{

        const product = await Product.findByIdAndUpdate(id, data);
        await product.save();
        res.status(201).json({status: 201, description: 'Product updated success'});

    }catch(err) {res.status(409).json({status: 409, description: err})}

})

router.post('/', async (req, res) => {
    
    const data = req.body;

    if(!data.products) return res.status(409).json({status: 409, description: 'data value null'});

    for(let x = 0; x<data.products.length; x++){

        try{

            const product = await new Product({
                product: data.products[x],
                price: data.prices[x],
                link: data.links[x],
                stock: data.stock[x],
                fecha: data.fecha[x],
                img_link: data.img_links[x]
            });

            await product.save();

        }catch(err){ return res.status(409).json({status: 409, description: err}) };
    }
    
    return res.status(201).json({status: 201, description: 'Data post success'});


})

router.delete('/', async (req, res) => {

    try{

        await Product.deleteMany({})
        return res.status(202).json({status: 202, description: 'Data eliminated'})

    }catch(err){ return res.status(401).json({status: 401, description: err}) };
})

module.exports = router
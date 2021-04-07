const express = require('express');
const Page = require('../models/Page.js');
const router = express.Router();

router.get('/', async (req, res) => {
    try{

        const pages = await Page.find()

        res.status(200).json(pages)

    }catch(err){
        res.status(400).json({status: 400, description: err})
    }
})

router.get('/:id', async (req, res) => {
    try{

        const id = req.params.id

        const page = await Page.findById(id)

        res.status(200).json(page)

    }catch(err){
        res.status(400).json({status: 400, description: err})
    }
})

router.post('/', async (req, res) => {
    
    try{
        const data = req.body;

        const page = await new Page(data);
    
        await page.save();

        res.status(201).json({status: 201, description: 'Page post success'});
    }catch(err){
        res.status(409).json({status: 409, description: err})
    }

})

router.put('/:id', async (req, res) => {
    
    try{
        const id = req.params.id;
        const data = req.body

        const page = await Page.findByIdAndUpdate(id, data);
    
        await page.save();

        res.status(201).json({status: 201, description: 'Page updated success'});
    }catch(err){
        res.status(409).json({status: 409, description: err})
    }

})

router.delete('/:id', async (req, res) => {

    const id = req.body

    try{
        await Page.findByIdAndDelete(id)

        res.status(202).json({status: 202, description: 'Page eliminated'})

    }catch(err){
        res.status(401).json({status: 401, description: err});
    }
})

module.exports = router
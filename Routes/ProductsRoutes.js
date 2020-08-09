const express = require('express');
const router = express();

const Products = require('../models/Products')

router.get('/products', (req, res)=>{
    Products.find()
    .then ((resDB)=> res.status(200).json(resDB))
    .catch((err) => res.status(400).json(err))
})

router.get('/products/:id', (req, res)=>{
    Products.findById(req.params.id)
    .then ((resDB)=> res.status(200).json(resDB))
    .catch((err) => res.status(400).json(err))
})

router.post('/products', (req, res)=>{
    const { body } = req;
    const newProduct = new Products(body)
    newProduct.save()
    .then((respDB)=> res.status(201).json(respDB))
    .catch((err)=> res.status(400).json(err))
})
router.patch('/products/:id', (req, res)=>{
    const { body } = req;
    Products.findByIdAndUpdate(req.params.id, body, {new: true })
    .then ((resDB)=> res.status(201).json(resDB))
    .catch((err) => res.status(400).json(err))
})

router.delete('/products/:id', (req, res)=>{
    Products.findByIdAndDelete(req.params.id)
    .then((respDB)=> res.status(204).json(respDB))
    .catch((err)=> res.status(400).json(err));
});


module.exports = router;
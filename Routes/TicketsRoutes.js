const express = require('express');
const router = express();

const Tickets = require('../models/Tickets');
const Products = require('../models/Products');

router.get('/tickets', (req, res)=>{
    Tickets.find()
    .then ((resDB)=> res.status(200).json(resDB))
    .catch((err) => res.status(400).json(err))
})

router.get('/tickets/:id', (req, res)=>{
    Tickets.findById(req.params.id)
    .then ((resDB)=> res.status(200).json(resDB))
    .catch((err) => res.status(400).json(err))
})

router.post('/tickets', (req, res)=>{
    const { body } = req;
    const newTicket = new Tickets(body)
    newTicket.save()
    .then((respDB)=> res.status(201).json(respDB))
    .catch((err)=> res.status(400).json(err))
})
router.patch('/tickets/:id', (req, res)=>{
    const { body } = req;
    Tickets.findByIdAndUpdate(req.params.id, body, {new: true })
    .then ((resDB)=> res.status(201).json(resDB))
    .catch((err) => res.status(400).json(err))
})

router.patch('/tickets/:id/checkout', (req, res)=>{
    const { id } = req.params;
    Tickets.findById(req.params.id, req.body)
    .populate('products')
    .then((ticket)=>{
        let prices = ticket.products.map((products)=> products.price)
        let subtotal = prices.reduce((total, price)=> total+price)
        const taxes = subtotal * .16;
        const total = subtotal + taxes;
        Tickets.findByIdAndUpdate(id, {subtotal, taxes, total, new: true})
        .then ((ticketTotal)=> res.status(200).json(ticketTotal))
        .catch((err) => res.status(400).json(err))
    })
    
})

router.delete('/tickets/:id', (req, res)=>{
    Tickets.findByIdAndDelete(req.params.id)
    .then((respDB)=> res.status(204).json(respDB))
    .catch((err)=> res.status(400).json(err));
});


module.exports = router;
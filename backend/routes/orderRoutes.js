const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');

// Create Order
router.post('/', async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            totalPrice: req.body.price * req.body.quantity, // Calculate total price
        };
        const newOrder = new Order(orderData);
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Order by Product Name
router.get('/:product', async (req, res) => {
    try {
        const order = await Order.findOne({ product: req.params.product });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Order by Product Name
router.put('/:product', async (req, res) => {
    try {
        const updatedOrderData = {
            ...req.body,
            totalPrice: req.body.price * req.body.quantity, // Recalculate total price
        };
        const updatedOrder = await Order.findOneAndUpdate(
            { product: req.params.product },
            updatedOrderData,
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Order by Product Name
router.delete('/:product', async (req, res) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({ product: req.params.product });
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

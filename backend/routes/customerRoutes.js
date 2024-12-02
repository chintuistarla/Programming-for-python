const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Create Customer
router.post('/', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(201).json({ message: 'Customer added successfully', customer: newCustomer });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Customer by Email
router.get('/:email', async (req, res) => {
    try {
        const customer = await Customer.findOne({ email: req.params.email });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Customer by Email
router.put('/:email', async (req, res) => {
    try {
        const updatedCustomer = await Customer.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true }
        );
        if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.json({ message: 'Customer updated successfully', customer: updatedCustomer });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Customer by Email
router.delete('/:email', async (req, res) => {
    try {
        const deletedCustomer = await Customer.findOneAndDelete({ email: req.params.email });
        if (!deletedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.json({ message: 'Customer deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

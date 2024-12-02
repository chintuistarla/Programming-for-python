const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Create Supplier
router.post('/', async (req, res) => {
    try {
        const newSupplier = new Supplier(req.body);
        await newSupplier.save();
        res.status(201).json({ message: 'Supplier added successfully', supplier: newSupplier });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Supplier by Name
router.get('/:name', async (req, res) => {
    try {
        const supplier = await Supplier.findOne({ name: req.params.name });
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json(supplier);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Supplier by Name
router.put('/:name', async (req, res) => {
    try {
        const updatedSupplier = await Supplier.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true }
        );
        if (!updatedSupplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json({ message: 'Supplier updated successfully', supplier: updatedSupplier });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Supplier by Name
router.delete('/:name', async (req, res) => {
    try {
        const deletedSupplier = await Supplier.findOneAndDelete({ name: req.params.name });
        if (!deletedSupplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json({ message: 'Supplier deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

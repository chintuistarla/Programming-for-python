const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel');

// Add a product
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get product by name
router.get('/:name', async (req, res) => {
    try {
        const product = await Product.findOne({ name: req.params.name });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update product by name
router.put('/:name', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete product by name
router.delete('/:name', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ name: req.params.name });
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
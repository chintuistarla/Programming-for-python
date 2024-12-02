const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    productsSupplied: { type: [String], required: true }, // Array of product names supplied
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);

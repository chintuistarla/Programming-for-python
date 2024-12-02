const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }, // This will store price * quantity
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

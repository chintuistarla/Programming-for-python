const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number },
    gender: { type: String },
    occupation: { type: String },
    address: { type: String },
    phone: { type: String }
});

module.exports = mongoose.model("Customer", CustomerSchema);

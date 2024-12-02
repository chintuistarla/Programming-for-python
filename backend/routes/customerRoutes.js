const express = require("express");
const Customer = require("../models/Customer");
const router = express.Router();

// Create a new customer
router.post("/add", async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).send({ message: "Customer added successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Get customer by email
router.get("/get/:email", async (req, res) => {
    try {
        const customer = await Customer.findOne({ email: req.params.email });
        if (!customer) return res.status(404).send({ message: "Customer not found" });
        res.send(customer);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Update customer details
router.put("/update/:email", async (req, res) => {
    try {
        const updatedCustomer = await Customer.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCustomer) return res.status(404).send({ message: "Customer not found" });
        res.send({ message: "Customer updated successfully", updatedCustomer });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Delete customer by email
router.delete("/delete/:email", async (req, res) => {
    try {
        const deletedCustomer = await Customer.findOneAndDelete({ email: req.params.email });
        if (!deletedCustomer) return res.status(404).send({ message: "Customer not found" });
        res.send({ message: "Customer deleted successfully" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;

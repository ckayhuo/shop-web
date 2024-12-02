require("dotenv").config();
const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const jwt = require("jsonwebtoken");


// Get all products for a seller
router.get("/", async (req, res) => {
    const token = req.cookies.token;
    console.log("Get products")

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId
    const role = decoded.role

    if (!userId || role !== "seller") {
        res.status(400).json({ message: "Invalid seller" });
    }


    try {
        const db = await getDB();
        const stmt = await db.prepare("SELECT * FROM products WHERE sellerId = ?");
        const products = await stmt.all(userId);

        res.status(200).json(products);
        // console.log(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update a product
router.put("/:id", async (req, res) => {
    const token = req.cookies.token;
    console.log("Update product")

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId
    const role = decoded.role

    if (!userId || role !== "seller") {
        res.status(400).json({ message: "Invalid seller" });
    }


    try {
        const { name, imgUrl, quantity, price } = req.body;
        const { id } = req.params;

        // Check if user is the seller of the product
        const db = await getDB();

        const stmt = await db.prepare("SELECT * FROM products WHERE id = ? AND sellerId = ?");
        const product = await stmt.get(id, userId);

        if (!product || product.sellerId !== decoded.userId) {
            return res.status(403).json({ message: "You do not have permission to edit this product" });
        }

        // Update product details        
        await db.run(
            "UPDATE products SET name = ?, imgUrl = ?, quantity = ?, price = ? WHERE id = ? and sellerId = ?",
            [name, imgUrl, quantity, price, id, userId]
        );

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//Add a product
router.post("/", async (req, res) => {
    console.log("Add product")
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId
    const role = decoded.role

    if (!userId || role !== "seller") {
        res.status(400).json({ message: "Invalid seller" });
    }

    try {
        const { name, price, imgUrl, quantity } = req.body;

        // Check if all required fields are provided
        if (!name || !price || !imgUrl || !quantity) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Insert the new product into the database
        const db = await getDB();
        const result = await db.run(
            "INSERT INTO products (name, price, imgUrl, quantity, sellerId) VALUES (?, ?, ?, ?, ?)",
            [name, price, imgUrl, quantity, userId]
        );

        res.status(201).json({ message: "Product added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
        console.log("Fail! product")
    }
});


//Delete a product
router.delete("/:id", async (req, res) => {
    const token = req.cookies.token;
    console.log("Delete product")

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId
    const role = decoded.role

    if (!userId || role !== "seller") {
        res.status(400).json({ message: `Invalid seller ${userId}, ${role}}` });
    }


    try {
        const { id } = req.params;

        // Check if user is the seller of the product
        const db = await getDB();
        await db.run(
            "DELETE FROM products WHERE id = ? AND sellerId = ?",
            [id, userId]
        );
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})


module.exports = router;

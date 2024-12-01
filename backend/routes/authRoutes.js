require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDB } = require("../db");
const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const db = await getDB();
        const userExists = await db.get("SELECT * FROM users WHERE email = ? and role = ?", [email, role]);
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, hashedPassword, role]);

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Sign In
router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;
    console.log("loging in")
    try {
        const db = await getDB();
        const user = await db.get("SELECT * FROM users WHERE email = ? and role = ?", [email, role]);
        if (!user) {
            console.log("Invalid credential or user doesn't exist")
            return res.status(400).json({ message: "Invalid credential or user doesn't exist" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // save token to cookies
        res.cookie("token", token, { httpOnly: true });

        res.status(200).json({ message: "Login successful", role: user.role, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//Sign Out
router.post("/logout", (req, res) => {
    console.log("loging out")
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
});

//Check Session
router.get("/check-session", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ user: null });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(`email=${decoded.email}; role=${decoded.role}`)
        res.status(200).json({ user: { email: decoded.email, role: decoded.role } });
    } catch (error) {
        res.status(401).json({ user: null });
    }
});

module.exports = router;

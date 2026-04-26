import express from 'express';
import db from '../config/database.js';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/auth.js';

export const userRoute = express.Router();

userRoute.get("/", authMiddleware, async (req, res) => {
    const query = "SELECT * FROM user";
    const [rows] = await db.query(query);
    return res.status(200).json({ code: 200, data: rows });
});

userRoute.post("/signin", async (req, res) => {
    const { user_name, user_mail, user_password } = req.body;

    if (!user_name || !user_mail || !user_password) return res.status(400).json({ code: 400, error: "Bad request, missing required fields" });

    const query = "INSERT INTO user (user_name, user_mail, user_password) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [user_name, user_mail, user_password]);

    if (result.affectedRows === 0) return res.status(500).json({ code: 500, error: "Error inserting user" });
    
    return res.status(201).json({ code: 201, message: 'User created successfully' }); 
});

userRoute.post("/login", async (req, res) => {
    const { user_mail, user_password } = req.body;
    
    if (!user_mail || !user_password) return res.status(400).json({ code: 400, error: "Bad request, missing required fields" });

    const query = "SELECT * FROM user WHERE user_mail = ? AND user_password = ?";
    const [rows] = await db.query(query, [user_mail, user_password]);

    if (rows.length === 0) {
        return res.status(200).json({ code: 401, error: "Invalid email or password" });
    }

    const token = jwt.sign(
        { user_id: rows[0].user_id, user_mail: rows[0].user_mail },
        "debugKey",
        { expiresIn: "1h" }
    )

    return res.status(200).json({ code: 200, message: "Login successful", token });
});
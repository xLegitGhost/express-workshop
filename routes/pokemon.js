import express from "express"
import db from "../config/database.js";   

export const pokemonRoute = express.Router();

pokemonRoute.post("/", async (req, res) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if(!pok_name || !pok_height || !pok_weight || !pok_base_experience) {
        return res.status(400).json({code: 400, error: "Bad request, missing required fields"});
    }

    const query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience) VALUES (?, ?, ?, ?)";
    const rows = await db.query(query, [pok_name, pok_height, pok_weight, pok_base_experience]);

    if(!rows || rows.length === 0) {
        return res.status(500).json({code: 500, error: "Error inserting pokemon"});
    }

    return res.status(201).json({code: 201, message: 'Pokemon insertado correctamente'});
})

pokemonRoute.get('/', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM pokemon');
    return res.status(200).json({code: 200, data: rows});
});

pokemonRoute.get(/^\/pokemon\/([0-9]{1,3})$/, async (req, res) => {
    const id = Number(req.params[0]);
    if (!Number.isInteger(id) || id < 1 || id > 151) {
        return res.status(404).json({code: 404, error: 'Not found' });
    }
    const [rows] = await db.query('SELECT * FROM pokemon WHERE pok_id = ?', [id]);
    if (!rows || rows.length === 0) return res.status(404).json({code: 404, error: 'Not found' });
    return res.status(200).json({code: 200, data: rows[0]});
})

pokemonRoute.get('/:name', async (req, res) => {
    const name = req.params.name;

    const [rows] = await db.query('SELECT * FROM pokemon WHERE pok_name = ?', [name]);
    if (!rows || rows.length === 0) return res.status(404).json({code: 404, error: 'Not found' });

    return res.status(200).json({code: 200, data: rows[0]});

});
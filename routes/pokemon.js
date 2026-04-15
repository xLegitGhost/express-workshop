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

pokemonRoute.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    
    // Primero intenta eliminar por ID
    if (Number.isInteger(id) && id > 0) {
        const query = "DELETE FROM pokemon WHERE pok_id = ?";
        const [result] = await db.query(query, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({code: 200, message: 'Pokemon eliminado correctamente'});
        }
    }
    
    // Si no encontró por ID, intenta por nombre
    const query = "DELETE FROM pokemon WHERE pok_name = ?";
    const [result] = await db.query(query, [req.params.id]);

    if (result.affectedRows === 0) {
        return res.status(404).json({code: 404, error: 'No se encontró el pokemon'});
    }

    return res.status(200).json({code: 200, message: 'Pokemon eliminado correctamente'});
});

pokemonRoute.put(/^\/([0-9]+)$/, async (req, res) => {
    const id = Number(req.params[0]);
    if (!Number.isInteger(id) || id < 1) {
        return res.status(404).json({code: 404, error: 'No se encontró el pokemon' });
    }

    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if(!pok_name || !pok_height || !pok_weight || !pok_base_experience) {
        return res.status(400).json({code: 400, error: "Bad request, missing required fields"});
    }
    
    const query = "UPDATE pokemon SET pok_name = ?, pok_height = ?, pok_weight = ?, pok_base_experience = ? WHERE pok_id = ?";
    const [result] = await db.query(query, [pok_name, pok_height, pok_weight, pok_base_experience, id]);

    return res.status(200).json({code: 200, message: 'Pokemon actualizado correctamente'});
});

pokemonRoute.patch(/^\/([0-9]+)$/, async (req, res) => {
    const id = Number(req.params[0]);
    if(!req.body.pok_name) return res.status(400).json({code: 400, error: "Bad request, missing required field pok_name"});
    if (!Number.isInteger(id) || id < 1) {
        return res.status(404).json({code: 404, error: 'No se encontró el pokemon' });
    }

    const query = "UPDATE pokemon SET pok_name = ? WHERE pok_id = ?";
    const [result] = await db.query(query, [req.body.pok_name, id]);

    return res.status(200).json({code: 200, message: 'Pokemon actualizado correctamente'});
});

pokemonRoute.get('/', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM pokemon');
    return res.status(200).json({code: 200, data: rows});
});

pokemonRoute.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isInteger(id) && id > 0) {
        const [rows] = await db.query('SELECT * FROM pokemon WHERE pok_id = ?', [id]);
        if (rows && rows.length > 0) {
            return res.status(200).json({code: 200, data: rows[0]});
        }
    }
    
    const [rows] = await db.query('SELECT * FROM pokemon WHERE pok_name = ?', [req.params.id]);
    if (!rows || rows.length === 0) return res.status(404).json({code: 404, error: 'Not found' });

    return res.status(200).json({code: 200, data: rows[0]});
});
import express from "express"
import pool from "../config/database.js";   

export const pokemonRoute = express.Router();

pokemonRoute.post("/", (req, res) => {
    return res.status(200).send(req.body);
})

pokemonRoute.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM pokemon');
    return res.status(200).json({code: 200, data: rows});
});

pokemonRoute.get(/^\/pokemon\/([0-9]{1,3})$/, async (req, res) => {
    const id = req.params[0] - 1;
    if ( id >= 0 && id <= 151) {
        const [rows] = await pool.query('SELECT * FROM pokemon WHERE id = ?', [id + 1]);
        return res.status(200).json({code: 200, data: rows[0]});
    }else{
        return res.status(404).json({code: 404, error: 'Not found' });
    }
})

pokemonRoute.get('/:name', async (req, res) => {
  const name = req.params.name;

    const queryResult = await pool.query('SELECT * FROM pokemon WHERE name = ?', [name]);
    if(!queryResult[0]) return res.status(404).json({code: 404, error: 'Not found' });

    return res.status(200).json({code: 200, data: queryResult[0]});
  
}); 
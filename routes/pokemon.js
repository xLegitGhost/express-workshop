import express from "express"
import pool from "../config/database.js";   

export const pokemonRoute = express.Router();

pokemonRoute.post("/", (req, res) => {
    const test = "a";
    return res.status(200).send(req.body);
})

pokemonRoute.get('/', async (req, res) => {
    const queryResult = await pool.query('SELECT * FROM pokemon');
    return res.send(queryResult).status(200);
});

pokemonRoute.get(/^\/pokemon\/([0-9]{1,3})$/, async (req, res) => {
    const id = req.params[0] - 1;
    if ( id >= 0 && id <= 151) {
        const queryResult = await pool.query('SELECT * FROM pokemon WHERE id = ?', [id + 1]);
        return res.send(queryResult[0]).status(200);
    }else{
        return res.send('Not found').status(404);
    }
})

pokemonRoute.get('/:name', async (req, res) => {
  const name = req.params.name;

    const queryResult = await pool.query('SELECT * FROM pokemon WHERE name = ?', [name]);
    if(!queryResult[0]) return res.status(404).send('Not found');

    return res.send(queryResult[0]).status(200);
  
}); 
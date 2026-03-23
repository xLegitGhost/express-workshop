import express from "express"
import pokedex from '../pokedex.json' with { type: 'json' };
const pokedexJson = pokedex.pokemon; 

export const pokemonRoute = express.Router();

pokemonRoute.post("/", (req, res) => {
    const test = "a";
    return res.status(200).send(req.body);
})

pokemonRoute.get('/', (req, res) => {
  return res.send(pokedexJson).status(200);
});

pokemonRoute.get(/^\/pokemon\/([0-9]{1,3})$/, (req, res) => {
    const id = req.params[0] - 1;
    if ( id >= 0 && id <= 151) {
        return res.send(pokedexJson[id]).status(200);
    }else{
        return res.send('Not found').status(404);
    }
})

pokemonRoute.get('/:name', (req, res) => {
  const name = req.params.name;

    const pokemonData = pokedexJson.find(p => p.name.toLowerCase() === name.toLowerCase());
    if(!pokemonData) return res.status(404).send('Not found');

    return res.send(pokemonData).status(200);
  
}); 
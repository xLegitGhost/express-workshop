import express from 'express';
import pokedex from './pokedex.json' with { type: 'json' };

const app = express();
const { pokemon } = pokedex; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('Welcome to the Pokemon API').status(200);
});

app.get('/pokemon', (req, res) => {
    return res.send(pokemon).status(200);
});

app.get(/^\/pokemon\/([0-9]{1,3})$/, (req, res) => {
    const id = req.params[0] - 1;
    if ( id >= 0 && id <= 151) {
        return res.send(pokemon[id]).status(200);
    }else{
        return res.send('Not found').status(404);
    }
})

app.get('/pokemon/:name', (req, res) => {
  const name = req.params.name;

    const pokemonData = pokemon.find(p => p.name.toLowerCase() === name.toLowerCase());
    if(!pokemonData) return res.status(404).send('Not found');

    return res.send(pokemonData).status(200);
  
});   

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});






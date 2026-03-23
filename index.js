import express from 'express';
import morgan from "morgan";
import { pokemonRoute } from './routes/pokemon.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get('/', (req, res) => {
    return res.send('Welcome to the Pokemon API').status(200);
});  

app.use("/pokemon", pokemonRoute)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});






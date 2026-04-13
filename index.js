import express from 'express';
import morgan from "morgan";
import { pokemonRoute } from './routes/pokemon.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get('/', (req, res, next) => {
    return res.status(200).json({
        code: 200, 
        message: "Bienvenido al Pokedex"
    });
});

app.use("/pokemon", pokemonRoute)

app.use((req, res, next) => {
    return res.status(404).json({
        code: 404,
        message: "URL no encontrada"
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});






import express from 'express';
import morgan from "morgan";
import jwt from 'jsonwebtoken';

// Routes
import { pokemonRoute } from './routes/pokemon.js';
import { userRoute } from './routes/user.js';

// Middleware
import { notFoundMiddleware } from './middleware/notFound.js';
import { corsMiddleware } from './middleware/cors.js';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get('/', (req, res, next) => {
    return res.status(200).json({
        code: 200, 
        message: "Bienvenido al Pokedex"
    });
});

app.use("/user", userRoute);

app.use("/pokemon", pokemonRoute)


app.use(notFoundMiddleware);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});






import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hola mundo desde express');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
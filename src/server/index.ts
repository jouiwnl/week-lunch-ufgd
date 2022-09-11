import express from 'express';

const app = express();

app.use(express.json())

export default function openServer() {
    app.listen(3000, () => {
        console.log('Servidor rodando!')
    })
};
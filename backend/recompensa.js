const express = require('express');
const cors = require('cors');
const banco = require('./banc');
const app = express();
app.use(express.json());
const port = 3000;

// npm i cors
app.use(cors({
    origin:'*'
}));

// novo gasto
app.post('/insercao', (req, res) => {
    const {total} = req.body;
    console.log("O frontend requisitou uma rota de api")
    banco.query(
        `INSERT INTO users (total) VALUES ( ? )`,
        [ nome,total],
        (err, results) => {
            if (err) {
                console.error('Erro na inserção', err);
                return res.status(500).send('Erro na inserção');
            }
            return res.send(`Gastos de usuário:\n\n \ntotal: ${total}`);
        }
    );
});

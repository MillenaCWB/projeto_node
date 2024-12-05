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

// novo user
app.post('/inserir', (req, res) => {
    const { nome,email,senha} = req.body;
    console.log("O frontend requisitou uma rota de api")
    banco.query(
        `INSERT INTO users (nome,email,senha) VALUES ( ?, ?, ?)`,
        [ nome, email, senha],
        (err, results) => {
            if (err) {
                console.error('Erro na inserção', err);
                return res.status(500).send('Erro na inserção');
            }
            return res.send(`pessoa recebida!\n\n \nnome: ${nome} \nemail: ${email} \nsenha: ${senha}`);
        }
    );
});

// atualizar por email
app.put('/atualizar/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email,senha } = req.body;
    banco.query(
        `UPDATE users SET nome = ?, email = ?, senha = ? WHERE id = ?`,
        [nome, email,senha,id],
        (err, results) => {
            if (err) {
                console.error('Erro na atualização', err);
                return res.status(500).send('Erro na atualização');
            }
            res.send(`pessoa atualizada: ${nome}, ${email}, ${senha}`);
        }
    );
});

// deletar por ID
app.delete('/deletar/id/:id', (req, res) => {
    const { id } = req.params;
    banco.query(
        `DELETE FROM users WHERE id = ?`,
        [Number(id)],
        (err, results) => {
            if (err) {
                console.error('Ops, erro para deletar.', err);
                return res.status(500).send('Erro ao deletar');
            }
            res.send(`Usuário deletado com sucesso!`);
        }
    );
});

// deletar por email
app.delete('/deletar/email/:email', (req, res) => {
    const { ano_nascimento } = req.params;
    banco.query(
        `DELETE FROM user WHERE email = ?`,
        [modelo],
        (err, results) => {
            if (err) {
                console.error('Ops, erro para deletar por modelo.', err);
                return res.status(500).send('Erro ao deletar por modelo');
            }
            res.send(`usuario com o email: ${email} foi deletado com sucesso!`);
        }
    );
});

// selecionar todos os users
app.get('/users', (req, res) => {
    banco.query(
        `SELECT * FROM users`,
        (err, results) => {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar usuários' });
            }
            return res.json(results);
        }
    );
});

// selecionar por ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    banco.query(
        `SELECT * FROM users WHERE id = ?`,
        [Number(id)],
        (err, results) => {
            if (err) {
                console.error('Erro na consulta por id:', err);
                return res.status(500).json({ error: 'Erro ao consultar usuário por id' });
            }
            if (results.length === 0) {
                return res.status(404).send('usuário não encontrado.');
              }
              return res.json(results[0]); // Retorna o primeiro user encontrado
            }
    );
});

// selecionar por nome
app.get('/users/nome/:nome', (req, res) => {
    const { nome } = req.params;
    banco.query(
        `SELECT * FROM users WHERE nome = ?`,
        [Number(nome)],
        (err, results) => {
            if (err) {
                console.error('Erro na consulta por nome de usuário:', err);
                return res.status(500).json({ error: 'Erro ao consultar usuário' });
            }
            return res.json(results);
        }
    );
});


app.listen(port, () => {
    console.log(`Exemplo de app sendo "escutado" na porta ${port}`);
});

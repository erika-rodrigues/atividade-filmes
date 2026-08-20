const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o Banco de Dados
const connection = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'alunos_filmes03MC'
});

connection.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar:", erro);
    } else {
        console.log("Banco conectado!");
    }
});

// GET - MOSTRAR TODOS OS FILMES
app.get('/filmes', (req, res) => {
    connection.query(
        'SELECT * FROM filmes_ErikaRodrigues',
        (erro, resultado) => {
            if (erro) {
                console.log('Erro ao buscar filmes:', erro);
                return res.status(500).json({ erro: erro.message });
            }
            res.status(200).json(resultado);
        }
    );
});

// POST - ADICIONAR FILME
app.post('/filmes', (req, res) => {
    const { titulo, genero, duracao, classificacao } = req.body;

    connection.query(
        `INSERT INTO filmes_ErikaRodrigues (titulo, genero, duracao, classificacao) VALUES (?, ?, ?, ?)`,
        [titulo, genero, duracao, classificacao],
        (erro, resultado) => {
            if (erro) {
                console.log('Erro ao adicionar filme:', erro);
                return res.status(500).json({ erro: erro.message });
            }
            res.status(201).json({
                mensagem: 'Filme adicionado com sucesso!',
                id: resultado.insertId
            });
        }
    );
});

// PUT - EDITAR FILME
app.put('/filmes/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, genero, duracao, classificacao } = req.body;

    connection.query(
        `UPDATE filmes_ErikaRodrigues SET titulo = ?, genero = ?, duracao = ?, classificacao = ? WHERE id = ?`,
        [titulo, genero, duracao, classificacao, id],
        (erro, resultado) => {
            if (erro) {
                console.log('Erro ao editar filme:', erro);
                return res.status(500).json({ erro: erro.message });
            }
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Filme não encontrado.' });
            }
            res.status(200).json({ mensagem: 'Filme editado com sucesso!' });
        }
    );
});

// DELETE - APAGAR FILME
app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id;

    connection.query(
        'DELETE FROM filmes_ErikaRodrigues WHERE id = ?',
        [id],
        (erro, resultado) => {
            if (erro) {
                console.log('Erro ao apagar filme:', erro);
                return res.status(500).json({ erro: erro.message });
            }
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Filme não encontrado.' });
            }
            res.status(200).json({ mensagem: 'Filme apagado com sucesso!' });
        }
    );
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
const mysql = require('mysql2');

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

module.exports = connection; 
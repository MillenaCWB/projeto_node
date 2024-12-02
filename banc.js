// Importando biblioteca
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Root',
    database:'users'
})

//Cria conexão
connection.connect(err => {
    if(err) {
        console.error('Erro ao conectar ao banco de dados:', err)
        return
    }
    console.log('Conectado ao banco de dados')
})

module.exports = connection
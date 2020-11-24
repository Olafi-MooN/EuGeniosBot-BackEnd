// criando o servidor
// Importando dependências
const express = require('express');
const cors = require('cors');
const server = express();
require('dotenv').config();

server.use(cors());
server.use(express.json());
server.use(require('./router'));

// Ligando o servidor pela PORTA
const port = 3500 || process.env.PORT;
server.listen( port, ()=> console.log('O servidor foi iniciado! '+port))
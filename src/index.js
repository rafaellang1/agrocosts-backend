const express = require('express');

const routes = require('./routes');
const cors = require('./app/middlewares/cors');

const app = express();

// Middleware sao executados por ordem sequencial, executa o primeiro
// se nao ficar travado, segue para o segundo.

app.use(express.json());
// Habilitar o CORS para poder conectar a Fetch no frontend com a porta 3000 a porta 3001 do backend
app.use(cors); // CORS
app.use(routes);

app.listen(3001, () => {
  console.log('Server is running on port http://localhost:3001');
});

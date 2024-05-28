const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());
// Middleware sao executados por ordem sequencial, executa o primeiro
// se nao ficar travado, segue para o segundo.
app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});

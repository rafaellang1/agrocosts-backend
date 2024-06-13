// Habilitar o CORS para poder conectar a Fetch no frontend com a porta 3000 a porta 3001 do backend
// Cors permite que possamos solicitar acesso a outra porta no front, é uma politica de
// protecao do navegador chamada SOP - Same Origin Polices - Politica de Mesma Origem

module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Max-Age', '10');
  next();
};
